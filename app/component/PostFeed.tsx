import { FlatList, StyleSheet, View } from "react-native";
import Postitem from "./Postitem";
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
type PostFeedProps = {
  Data: Post[];
};
const PostFeed = ({ Data }: PostFeedProps) => {
  return (
    <View>
      <FlatList
        data={Data}
        renderItem={({ item, index }) => <Postitem item={item} index={index} />}
        scrollEnabled={true}
      />
    </View>
  );
};

export default PostFeed;

const styles = StyleSheet.create({});
