import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
const Comments = () => {
  return (
    <ScrollView>
      <Text>Comments</Text>

      {/* Example Comments */}
      <Text>User1: This is awesome!</Text>
      <Text>User2: Great post 🔥</Text>
      <Text>User3: Love it!</Text>
      {/* Add more mock or real comments here */}
    </ScrollView>
  );
};

export default Comments;

const styles = StyleSheet.create({});
