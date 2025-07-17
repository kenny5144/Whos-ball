import { supabase } from "@/lib/superbase";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PostFeed from "../component/PostFeed";

export default function Index() {
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
      className="pt-10 px-6 h-full"
    >
      <SafeAreaView>
        <View className="flex flex-row justify-between">
          <Image
            source={require("@/assets/images/zoe.jpg")}
            style={{ height: 10, width: 10 }}
          />
          <View className="flex flex-row ">
            <TouchableOpacity
              onPress={() => signOut()}
              className="shadow p-3 rounded-full bg-white flex-row justify-center items-center w-16 mr-2 "
            >
              <Ionicons name="notifications-outline" size={30} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => signOut()}
              className=" p-3 rounded-full bg-white flex-row justify-center items-center w-16 "
            >
              <Ionicons name="chatbubbles-outline" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-row justify-between items-center">
          <Text>Recently posted </Text>
          <TouchableOpacity
            // onPress={() => signOut()}
            className=" p-3 rounded-full flex-row justify-center items-center w-16 "
          >
            <Ionicons name="filter-outline" size={30} color="black" />
            <Text>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity
          onPress={() => signOut()}
          className="shadow p-3 rounded-full bg-white flex-row justify-center items-center "
        >
         

          <Text className=" text-center text-gray-7  font-bold">
            <Ionicons name="log-out-outline" size={24} color="black" />
            Log out
          </Text>
        </TouchableOpacity> */}
        <PostFeed />
      </SafeAreaView>
    </LinearGradient>
  );
}
