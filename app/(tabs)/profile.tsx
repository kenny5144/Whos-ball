import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const dummyPosts = Array.from({ length: 12 }).map((_, i) => ({
  id: i.toString(),
  image: `https://source.unsplash.com/random/300x300?sig=${i}`,
}));

const screenWidth = Dimensions.get("window").width;

export default function InstagramProfile() {
  const [activeTab, setActiveTab] = useState<"Posts" | "Tagged">("Posts");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="flex-row items-center p-4">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=8" }}
            className="w-24 h-24 rounded-full mr-6"
          />
          <View className="flex-row flex-1 justify-around">
            <View className="items-center">
              <Text className="text-lg font-bold">48</Text>
              <Text className="text-gray-500 text-sm">Posts</Text>
            </View>
          </View>
        </View>

        <View className="px-4 mb-2">
          <Text className="font-bold text-base">John Doe</Text>
        </View>

        {/* Tabs */}
        <View className="flex-row justify-around border-t border-b border-gray-300 mt-2">
          <TouchableOpacity
            className={`flex-1 py-3 items-center ${
              activeTab === "Posts" ? "border-b-2 border-black" : ""
            }`}
            onPress={() => setActiveTab("Posts")}
          >
            <Text
              className={`text-sm ${
                activeTab === "Posts" ? "font-bold text-black" : "text-gray-500"
              }`}
            >
              Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 items-center ${
              activeTab === "Tagged" ? "border-b-2 border-black" : ""
            }`}
            onPress={() => setActiveTab("Tagged")}
          >
            <Text
              className={`text-sm ${
                activeTab === "Tagged"
                  ? "font-bold text-black"
                  : "text-gray-500"
              }`}
            >
              favorites
            </Text>
          </TouchableOpacity>
        </View>

        {/* Posts Grid */}
        {activeTab === "Posts" ? (
          <FlatList
            data={dummyPosts}
            keyExtractor={(item) => item.id}
            numColumns={3}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.image }}
                style={{ width: screenWidth / 3, height: screenWidth / 3 }}
              />
            )}
          />
        ) : (
          <View className="items-center py-10">
            <Text className="text-gray-500">No tagged posts yet.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
