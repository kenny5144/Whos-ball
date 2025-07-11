import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const onboarding = () => {
  const [onboardingForm, setOnboardingForm] = useState({
    userName: "",
    from: "",
  });
  const updateForm = ({ key, value }: any) => {
    setOnboardingForm((prev) => ({ ...prev, [key]: value }));
  };
  const [verficationImage, setVerificationImage] = useState();

  const handleSubmit = () => {
    console.log("submitted");
  };
  return (
    <LinearGradient
      colors={["#CFFAFE", "#f8f8f8"]}
      locations={[0.1, 0.4]}
      className="pt-10 px-6 h-full flex justify-center"
    >
      <SafeAreaView className="">
        <Text className="text-xl items-center text-center pb-10">
          Verification{" "}
        </Text>

        <Text className="">Username *</Text>
        <TextInput
          placeholder="something anoynymus e.g bigBaller"
          value={onboardingForm.userName}
          onChangeText={(text) => updateForm({ key: "userName", value: text })}
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base"
        />
        <Text className="">Location *</Text>
        <TextInput
          placeholder="Virgina"
          value={onboardingForm.from}
          onChangeText={(text) => updateForm({ key: "from", value: text })}
          className="border border-gray-500 rounded-lg px-4 py-3 mb-4 text-base"
        />
        <TouchableOpacity
          // onPress={pickImage}
          className=" py-3 rounded-lg mb-4 items-center overflow-hidden"
        >
          {verficationImage ? (
            <Image
              // source={{ uri: form.imageUri }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
            />
          ) : (
            <View className="flex flex-col bg-gray-100 h-64 w-full rounded-lg items-center m-auto justify-center ">
              <Ionicons name="camera-outline" size={40} />
              <Text className="text-gray-700"> Take a picture</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-amber-600 py-3 rounded-lg mb-4 items-center overflow-hidden"
        >
          <Text className="text-white">Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default onboarding;

const styles = StyleSheet.create({});
