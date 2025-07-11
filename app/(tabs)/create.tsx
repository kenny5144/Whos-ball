import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryDropdown from "../component/CategoryDropdown";
const create = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "Dating Advice",
    imageUri: undefined,
  });
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const updateForm = ({ key, value }: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const pickImage = async () => {
    try {
      if (Platform.OS !== "web") {
        if (status?.status !== "granted") {
          const permissionResponse = await requestPermission();
          console.log({ permissionResponse });
          if (permissionResponse.status !== "granted") {
            Alert.alert(
              "Permission wasnt granted go to settings to grant permission"
            );
            [
              {
                text: "Open Settings",
                onPress: () => {
                  Platform.OS === "ios"
                    ? Linking.openURL("app-settings")
                    : Linking.openSettings();
                },
              },
              {
                text: "Cancel",
              },
            ];
          }
          return;
        }
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 5],
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        updateForm({ key: "imageUri", value: result.assets[0].uri });
      } else {
        alert("You did not select any image.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = () => {
    if (!form.title || !form.content) {
      alert("Title and content are required.");
      return;
    }

    const post = {
      ...form,
      timestamp: new Date().toISOString(),
    };

    console.log("Post created:", post);
    // TODO: Send to backend
  };

  return (
    <ScrollView className="p-5 bg-white pt-16 ">
      <Text className="text-2xl font-semibold mb-4">Create Post</Text>

      <TextInput
        placeholder="Post title"
        value={form.title}
        onChangeText={(text) => updateForm({ key: "title", value: text })}
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
      />

      <TextInput
        placeholder="What's your situation or question?"
        value={form.content}
        onChangeText={(text) => updateForm({ key: "content", value: text })}
        multiline
        className="border border-gray-300 rounded-lg px-4 py-3 h-28 mb-4 text-base"
      />

      <CategoryDropdown
        selected={form.category}
        onSelect={({ val }: any) => updateForm({ key: "category", value: val })}
      />

      {form.imageUri && (
        <Image
          source={{ uri: form.imageUri }}
          className="w-full h-52 rounded-lg mb-4"
        />
      )}

      <TouchableOpacity
        onPress={pickImage}
        className=" py-3 rounded-lg mb-4 items-center overflow-hidden"
      >
        {form.imageUri ? (
          <Image
            source={{ uri: form.imageUri }}
            resizeMode="cover"
            className="w-full h-full rounded-lg"
          />
        ) : (
          <View className="flex flex-col bg-gray-100 h-64 w-full rounded-lg items-center m-auto justify-center ">
            <Ionicons name="image-outline" size={40} />
            <Text className="text-gray-700"> select Image </Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-600 py-4 rounded-lg"
      >
        <Text className="text-white text-center font-bold text-base">Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default create;

const styles = StyleSheet.create({});
