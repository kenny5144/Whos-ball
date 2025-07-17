import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { postSliderTypes } from "../data/datapost";
import Comments from "./Comments";
type Props = {
  item: postSliderTypes;
  index: number;
};
const Postitem = ({ item, index }: Props) => {
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const openComments = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };
  return (
    <View className="pb-5">
      <Image
        source={item.image}
        style={{ width: 380, height: 600, borderRadius: 20 }}
        // className="w- "
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.0)"]}
        // style={styles.background}
        className="absolute h-[600px] w-[400px] rounded-3xl justify-between py-4 px-2"
      >
        <View className="bg-slate-500 w-1/2 rounded-full ml-2 flex flex-row">
          <Image
            source={item.image}
            style={{ width: 50, height: 50 }}
            className="rounded-full"
          />
          <Text className="items-center flex justify-center pl-2">
            {item.name}
          </Text>
        </View>
        <View className=" ">
          <Text className="text-white">{item.Description}</Text>
          <Text>{item.title}</Text>
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
              <Ionicons name="chatbubble-ellipses-outline" size={24} />
              <Text className="text-xl text-white">c</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <Comments />
      </BottomSheet>
    </View>
  );
};

export default Postitem;
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    height: 500,
    width: 300,
    padding: 20,
    borderRadius: 20,
  },
});
