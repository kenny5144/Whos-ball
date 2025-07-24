import { supabase } from "@/lib/superbase";
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
    age: "",
    location: "",
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
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled) {
        updateForm({
          key: "imageUri",
          value: result.assets[0].uri,
        });
        console.log(form.imageUri);
      } else {
        alert("You did not select any image.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const uploadImageToSupabase = async (uri: string) => {
    const response = await fetch(uri);
    const arrayBuffer = await response.arrayBuffer();
    const fileExt = uri.split(".").pop()?.toLowerCase() ?? "jpeg";
    const path = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from("posts")
      .upload(path, arrayBuffer, {
        contentType: "image/jpeg",
      });

    if (error) {
      console.error("Upload error:", error);
      throw error;
    }

    const { data: publicData } = supabase.storage
      .from("posts")
      .getPublicUrl(path);
    return publicData.publicUrl;
  };
  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      Alert.alert("Error", "Title and content are required.");
      return;
    }
    console.log(form);

    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) {
        Alert.alert("Error", "You must be logged in.");
        return;
      }

      let imageUrl = null;
      if (form.imageUri) {
        imageUrl = await uploadImageToSupabase(form.imageUri);
      }

      const { error: insertError } = await supabase.from("Post").insert({
        title: form.title,
        content: form.content,
        category: form.category,
        location: form.location,
        age: parseInt(form.age),
        imageUri: imageUrl,
        user_id: userId,
      });

      if (insertError) {
        console.error("Insert error:", insertError);
        Alert.alert("Error", "Could not save your post.");
      } else {
        Alert.alert("Success", "Post created!");
        setForm({
          title: "",
          content: "",
          age: "",
          location: "",
          category: "Dating Advice",
          imageUri: undefined,
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      Alert.alert("Error", "Something went wrong.");
    } finally {
    }
  };

  return (
    <ScrollView className="p-5 bg-white pt-16 ">
      <Text className="text-2xl font-semibold mb-4">Create Post</Text>
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-600 py-4 rounded-lg"
      >
        <Text className="text-white text-center font-bold text-base">Post</Text>
      </TouchableOpacity>
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
      <TextInput
        placeholder="age ( eg: 22) "
        value={form.age}
        onChangeText={(text) => updateForm({ key: "age", value: text })}
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
      />
      <TextInput
        placeholder="Location  "
        value={form.location}
        onChangeText={(text) => updateForm({ key: "location", value: text })}
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
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
    </ScrollView>
  );
};

export default create;

const styles = StyleSheet.create({});
