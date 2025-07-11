import { supabase } from "@/lib/superbase";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

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
          <TouchableOpacity
            onPress={() => signOut()}
            className="shadow p-3 rounded-full bg-white flex-row justify-center items-center w-16 "
          >
            <Ionicons name="notifications-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => signOut()}
            className="shadow p-3 rounded-full bg-white flex-row justify-center items-center w-16 "
          >
            {/* <Image
              source={require("../../assets/images/apple.svg")}
              className="h-3 w-"
            /> */}
            <Ionicons name="notifications-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => signOut()}
            className=" p-3 rounded-full bg-white flex-row justify-center items-center w-16 "
          >
            <Ionicons name="chatbubbles-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row mt-10 ">
          <Text className="text-lg">Discover </Text>
          <Text className="text-lg">Favorites</Text>
        </View>
        {/* <FlatList data={} renderItem={{{item,index}}} */}
        <Link href={"/welcome"}> welcome</Link>
        <TouchableOpacity
          onPress={() => signOut()}
          className="shadow p-3 rounded-full bg-white flex-row justify-center items-center "
        >
          {/* <Image
          source={require("../../assets/images/apple.svg")}
          className="h-6 w-6"
        /> */}

          <Text className=" text-center text-gray-7  font-bold">
            <Ionicons name="log-out-outline" size={24} color="black" />
            Log out
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
