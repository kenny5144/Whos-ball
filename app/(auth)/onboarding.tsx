import { supabase } from "@/lib/superbase";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
type RootStackParamList = {
  welcome: undefined;
  // other screens...
};
const Onboarding = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [onboardingForm, setOnboardingForm] = useState({
    userName: "",
    location: "",
  });

  const updateForm = ({ key, value }: any) => {
    setOnboardingForm((prev) => ({ ...prev, [key]: value }));
  };
  const router = useRouter();
  const [verificationImage, setVerificationImage] = useState<string | null>(
    null
  );

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Camera access is needed.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.7,
    });

    if (!result.canceled) {
      setVerificationImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!verificationImage) {
      Alert.alert("Image Required", "Please take a verification photo.");
      return;
    }

    const userId = (await supabase.auth.getUser()).data.user?.id;
    console.log(userId);

    if (!userId) {
      Alert.alert("User not found", "Please log in again.");
      return;
    }

    try {
      const imageResponse = await fetch(verificationImage);
      const imageBlob = await imageResponse.blob();

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result?.toString().split(",")[1];

        const FACEPP_API_KEY = "M6xKfMhn0E4J0EDHD7Ihorvb6TIJjJ6c";
        const FACEPP_API_SECRET = "kgHZVWNtaKJZL3L2EK6PFCK--luLq7x-";

        const formBody = new URLSearchParams({
          api_key: FACEPP_API_KEY,
          api_secret: FACEPP_API_SECRET,
          image_base64: base64data || "",
          return_attributes: "gender,age",
        });

        const faceResponse = await fetch(
          "https://api-us.faceplusplus.com/facepp/v3/detect",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formBody.toString(),
          }
        );

        const faceData = await faceResponse.json();
        console.log("Face++ Response:", faceData);

        if (!faceData.faces || faceData.faces.length === 0) {
          Alert.alert("No Face Detected", "Please retake the photo.");
          return;
        }

        const detectedGender = faceData.faces[0].attributes.gender.value;
        console.log(detectedGender);
        if (detectedGender !== "Male") {
          Alert.alert("Access Denied", "Only male users are allowed.");
          await supabase.auth.signOut();
          navigation.navigate("welcome");
          return;
        }
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            username: onboardingForm.userName,
            location: onboardingForm.location,
            gender: detectedGender,
            has_onboarded: true,
          })
          .eq("id", userId);

        if (updateError) {
          Alert.alert("Update failed", updateError.message);
        } else {
          // Alert.alert("Submitted", "Your verification has been submitted.");
          router.replace("/");
        }
      };

      reader.readAsDataURL(imageBlob);
    } catch (err) {
      console.error("Verification Error:", err);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      router.replace("/(auth)/welcome");
    }
  };

  return (
    <LinearGradient
      colors={["#CFFAFE", "#f8f8f8"]}
      locations={[0.1, 0.4]}
      className="pt-10 px-6 h-full flex justify-center"
    >
      <SafeAreaView>
        <Text className="text-xl items-center text-center pb-10">
          Verification
        </Text>

        <Text className="">Username *</Text>
        <TextInput
          placeholder="something anonymous e.g. bigBaller"
          value={onboardingForm.userName}
          onChangeText={(text) => updateForm({ key: "userName", value: text })}
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        />

        <Text className="">Location *</Text>
        <TextInput
          placeholder="Virginia"
          value={onboardingForm.location}
          onChangeText={(text) => updateForm({ key: "location", value: text })}
          className="border border-gray-500 rounded-lg px-4 py-3 mb-4 text-base"
        />

        <TouchableOpacity
          onPress={pickImage}
          className="py-3 rounded-lg mb-4 items-center overflow-hidden"
        >
          {verificationImage ? (
            <Image
              source={{ uri: verificationImage }}
              resizeMode="cover"
              style={{ width: "100%", height: 250, borderRadius: 8 }}
            />
          ) : (
            <View className="flex flex-col bg-gray-100 h-64 w-full rounded-lg items-center justify-center">
              <Ionicons name="camera-outline" size={40} />
              <Text className="text-gray-700">Take a picture</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={signOut}
          className="bg-amber-600 py-3 rounded-lg mb-4 items-center"
        >
          <Text className="text-white">signout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-amber-600 py-3 rounded-lg mb-4 items-center"
        >
          <Text className="text-white">Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
