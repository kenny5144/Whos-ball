import React from "react";
import { StyleSheet, View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { WelcomeSliderTypes } from "../data/data";
type Props = {
  items: WelcomeSliderTypes[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
};
const Pagination = ({ items, paginationIndex, scrollX }: Props) => {
  return (
    <View className="h-10 flex-row justify-center items-center">
      {items.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: paginationIndex === index ? "#222" : "#aaa" },
          ]}
        />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  dot: {
    height: 8,
    width: 8,
    backgroundColor: "#aaa",
    borderRadius: 8,
    marginHorizontal: 2,
  },
});
