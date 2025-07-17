import { supabase } from "@/lib/superbase";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import Filter from "../component/Filter";
import PostFeed from "../component/PostFeed";
type Post = {
  id: number;
  title: string;
  content: string;
  category: string;
  imageUri: string | undefined;
  user_id: string;
  profiles: {
    username: string;
  };
};
export default function Index() {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Post")
      .select(`*, profiles(username)`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
      return;
    }

    // const postsWithImages = await Promise.all(
    //   (data ?? []).map(async (post) => {
    //     const imageUri = post.imageUri
    //       ? await downloadImage(post.imageUri, supabase)
    //       : null;

    //     return {
    //       ...post,
    //       imageUri,
    //     };
    //   })
    // );

    setPosts(data as Post[]);
    setLoading(false);
  };
  console.log("post for the log :", posts);

  useEffect(() => {
    fetchPosts();
  }, []);
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      router.replace("/(auth)/welcome");
    }
  };
  console.log(posts);
  const filteraction = () => {
    actionSheetRef.current?.show();
  };
  return (
    <LinearGradient
      colors={["#CFFAFE", "#f8f8f8"]}
      locations={[0.1, 0.4]}
      className="pt-10 px-6 h-full"
    >
      <SafeAreaView className="p-10">
        <View className="flex flex-row justify-between">
          <Image
            source={require("@/assets/images/zoe.jpg")}
            style={{ height: 10, width: 10 }}
          />
          <View className="flex flex-row ">
            <TouchableOpacity
              onPress={() => signOut()}
              className="shadow p-3 rounded-full bg-white flex-row justify-center items-center w-16 mr-2 "
            >
              <Ionicons name="notifications-outline" size={30} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => signOut()}
              className=" p-3 rounded-full bg-white flex-row justify-center items-center w-16 "
            >
              <Ionicons name="chatbubbles-outline" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row justify-between items-center p-3">
          <Text>Recently posted </Text>
          <TouchableOpacity
            onPress={filteraction}
            className=" p-3 rounded-full flex-row justify-center items-center w-16 "
          >
            <Ionicons name="filter-outline" size={30} color="black" />
            <Text>Filter</Text>
          </TouchableOpacity>
        </View>
        <ActionSheet
          gestureEnabled={true}
          defaultOverlayOpacity={0.3}
          ref={actionSheetRef}
        >
          <Filter />
        </ActionSheet>

        {/* <TouchableOpacity
          onPress={() => signOut()}
          className="shadow p-3 rounded-full bg-white flex-row justify-center items-center "
        >
         

          <Text className=" text-center text-gray-7  font-bold">
            <Ionicons name="log-out-outline" size={24} color="black" />
            Log out
          </Text>
        </TouchableOpacity> */}
        <PostFeed Data={posts} />
      </SafeAreaView>
    </LinearGradient>
  );
}
