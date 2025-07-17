import { FlatList, StyleSheet, View } from "react-native";
import { postSliderTypes } from "../data/datapost";
import Postitem from "./Postitem";
const PostFeed = () => {
  return (
    <View>
      <FlatList
        data={postSliderTypes}
        renderItem={({ item, index }) => <Postitem item={item} index={index} />}
      />
    </View>
  );
};

export default PostFeed;

const styles = StyleSheet.create({});
