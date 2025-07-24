import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import Comments from "./Comments";
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
type Props = {
  item: Post;
  index: number;
};
const Postitem = ({ item, index }: Props) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const openComments = () => {
    actionSheetRef.current?.show();
  };
  console.log(item.imageUri);

  return (
    <View
      style={{
        marginBottom: 40,
        margin: "auto",
      }}
    >
      {item.imageUri && (
        <Image
          source={{ uri: item.imageUri }}
          style={{
            width: 380,
            height: 600,
            borderRadius: 20,
            marginBottom: 10,
          }}
          contentFit="cover"
        />
      )}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.0)"]}
        style={styles.background}
        // className="absolute  h-[600px] w-[380px] rounded-3xl justify-between py-4 px-2"
      >
        {/* <View>
          
        </View> */}
        <View className="bg-slate-500 w-1/2 rounded-full p-3 items-center flex flex-row">
          <Image
            source={{
              uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
            }}
            style={{ width: 40, height: 40, borderRadius: 30 }}
          />
          <Text>{item.profiles?.username ?? "Unknown user"}</Text>
        </View>
        <View className=" bg-white h-24">
          <Text className="text-black">{item.title}</Text>
          <Text className="text-black">{item.content}</Text>
          <View className=" flex flex-row text-white ">
            <TouchableOpacity className="flex flex-row items-center justify-center">
              <Image
                source={require("@/assets/images/like.jpeg")}
                style={{ width: 24, height: 24 }}
              />
              <Text className="text-xl text-white">t</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center justify-center ml-3">
              <Image
                source={require("@/assets/images/dislike.jpeg")}
                style={{ width: 24, height: 24 }}
              />
              <Text className="text-xl text-white">d</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row items-center ml-3"
              onPress={openComments}
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={24}
                color={"#fafafaff"}
              />
              <Text className="text-xl text-white">c</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <ActionSheet
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}
        ref={actionSheetRef}
      >
        <Comments postId={item.id} />
      </ActionSheet>
    </View>
  );
};

export default Postitem;
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    height: 630,
    width: 380,
    borderRadius: 20,
    justifyContent: "space-between",
    display: "flex",
    marginBottom: 10,
  },
});
