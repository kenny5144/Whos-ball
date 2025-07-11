import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WelcomeSliderTypes } from "../data/data";
type Props = {
  item: WelcomeSliderTypes;
  index: number;
};
const Slideritem = ({ item, index }: Props) => {
  return (
    <View className="w-full h-[100%]  bg-slate-500">
      <Text>{item.title}</Text>
      <Text>{item.Description}</Text>
    </View>
  );
};

export default Slideritem;

const styles = StyleSheet.create({});
