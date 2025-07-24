import { supabase } from "@/lib/superbase";
import { Entypo } from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";
import { formatDistanceToNowStrict } from "date-fns";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";

type CommentType = {
  id: string;
  comment: string;
  post_id: string;
  parent_id: string | null;
  user_id: string;
  created_at: string;
  profiles: {
    username: string;
  };
  replies?: CommentType[];
};

interface CommentItemProps {
  item: CommentType;
  replyComment: string | null;
  index?: number;
  onCommentDelete: () => void;
  depth: number;
  setReplyComment: (id: string | null) => void;
  handleOnReply: (id: string) => void;
}

const CommentsItems = ({
  item,
  index,
  replyComment,
  setReplyComment,
  onCommentDelete,
  depth,
  handleOnReply,
}: CommentItemProps) => {
  const [showReplies, setShowReplies] = useState(false);
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  useEffect(() => {
    user();
  }, []);
  const user = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
  };
  const removeComment = async () => {
    try {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", item.id);

      if (error) {
        console.error("Error deleting comment:", error);
        return;
      }

      onCommentDelete();
    } catch (err) {
      console.error("Unexpected error deleting comment:", err);
    }
  };
  const confirmDelete = () => {
    Alert.alert(
      "Delete Comment",
      "Are you sure you want to delete this comment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => removeComment(),
        },
      ]
    );
  };

  return (
    <View className={`pl-${depth * 4} mb-4`}>
      {/* User Info + Avatar */}
      <View className="flex-row gap-3 items-start">
        <Image
          source={{
            uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
          }}
          className="w-10 h-10 rounded-full mt-1"
        />

        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-800">
            {item.profiles.username}
          </Text>
          <Text className="text-xs text-gray-500 mb-1">
            {formatDistanceToNowStrict(new Date(item.created_at))} ago
          </Text>
          <Text className="text-sm text-gray-700 mb-1">{item.comment}</Text>

          {replyComment === item.id ? (
            <Pressable
              onPress={() => handleOnReply("")}
              className="self-start mt-1"
            >
              <Text className="text-xs text-red-500 font-medium">Cancel</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => handleOnReply(item.id)}
              className="self-start mt-1"
            >
              <Text className="text-xs text-blue-500 font-medium">Reply</Text>
            </Pressable>
          )}

          {item.replies &&
            item.replies.length > 0 &&
            depth < 5 &&
            !showReplies && (
              <Pressable
                onPress={() => setShowReplies(true)}
                className="mt-2 px-2 py-1 rounded bg-gray-100 w-fit self-start"
              >
                <Text className="text-xs font-medium text-gray-600">
                  View replies ({item.replies.length})
                </Text>
              </Pressable>
            )}

          {/* Nested Replies */}
          {showReplies && item.replies && (
            <FlatList
              data={item.replies}
              keyExtractor={(reply) => reply.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <CommentsItems
                  item={item}
                  depth={depth + 1}
                  onCommentDelete={onCommentDelete}
                  handleOnReply={handleOnReply}
                  replyComment={replyComment}
                  setReplyComment={setReplyComment}
                />
              )}
            />
          )}
        </View>
        {session?.user.id === item.user_id && (
          <Entypo
            onPress={confirmDelete}
            name="trash"
            size={17}
            color="#eb0a0a"
            className="pr-4"
          />
        )}
      </View>
    </View>
  );
};

export default CommentsItems;
