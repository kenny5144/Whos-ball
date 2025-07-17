import { supabase } from "@/lib/superbase";
import React, { memo, useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CommentsItems from "./CommentsItems";
// import { View } from "react-native-reanimated/lib/typescript/Animated";
type Comment = {
  id: string;
  comment: string;
  post_id: string;
  parent_id: string | null;
  user_id: string;
  created_at: string;
  profiles: {
    username: string;
  };
  replies?: Comment[];
};
const Comments = ({ postId }: any) => {
  const inputRef = useRef<TextInput | null>(null);
  console.log(postId);
  const [replyComment, setReplyComment] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  useEffect(() => {
    fetchComments();
  }, []);
  async function fetchComments() {
    setLoading(true);
    const { data, error } = await supabase
      .from("comments")
      .select(`* , profiles( username )`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
      return;
    }

    setComments(buildCommentTree(data ?? []));
    console.log(comments);

    setLoading(false);
  }
  console.log(comments);
  // the build comment tree is basically spliting the main comment sfrom the replies and try to show it bellow

  function buildCommentTree(flatComments: Comment[]): Comment[] {
    const commentMap: { [id: string]: Comment & { replies: Comment[] } } = {};

    flatComments.forEach((comment) => {
      commentMap[comment.id] = { ...comment, replies: [] };
    });

    const rootComments: Comment[] = [];

    flatComments.forEach((comment) => {
      if (comment.parent_id) {
        const parent = commentMap[comment.parent_id];
        if (parent) {
          parent.replies.push(commentMap[comment.id]);
        }
      } else {
        rootComments.push(commentMap[comment.id]);
      }
    });

    return rootComments;
  }
  console.log(comments);

  const sendComments = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) {
        Alert.alert("Error", "You must be logged in.");
        return;
      }
      const { error } = await supabase.from("comments").insert({
        comment: commentInput,
        post_id: postId,
        user_id: userId,
        parent_id: replyComment,
      });
      if (!error) {
        setCommentInput("");

        setReplyComment(null);
        Alert.alert("comment sent sucessfully ");
      }
    } catch {}
  };
  console.log(commentInput);

  const handleOnReply = (commentId: string) => {
    console.log(commentId);
    setReplyComment(commentId);
    inputRef.current?.focus();
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="mt-6"
    >
      <View className="h-96">
        <FlatList
          data={comments}
          renderItem={({ item, index }) => (
            <CommentsItems
              item={item}
              index={index}
              setReplyComment={setReplyComment}
              replyComment={replyComment}
              depth={0}
              onCommentDelete={fetchComments}
              handleOnReply={handleOnReply}
            />
          )}
          scrollEnabled={true}
        />
        <View className="absolute bottom-0 pb-5 pt-5 w-full flex-row items-center bg-white  border-gray-200 px-3 py-2">
          <TextInput
            ref={inputRef}
            value={commentInput}
            onChangeText={(text) => setCommentInput(text)}
            placeholder={
              replyComment ? "replying to a comment" : "Write a comment..."
            }
            multiline
            placeholderTextColor="#9ca3af"
            className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-gray-900"
          />
          <TouchableOpacity
            onPress={sendComments}
            className="ml-2 bg-blue-500 px-4 py-2 rounded-full"
          >
            <Text className="text-white font-semibold">Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default memo(Comments);

const styles = StyleSheet.create({});
