import { supabase } from "@/lib/superbase";
import * as AppleAuthentication from "expo-apple-authentication";
import { LinearGradient } from "expo-linear-gradient";
import {
  GestureResponderEvent,
  Image,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { WelcomeSliderTypes } from "../data/data";

import { useRef, useState } from "react";
import { Text } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Pagination from "../component/Pagination";
import Slideritem from "../component/Slideritem";

const Welcome = () => {
  const signIn = async () => {
    console.log("this is for google");
  };
  const signInApple = async (e: GestureResponderEvent) => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // Sign in via Supabase Auth.
      if (credential.identityToken) {
        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: credential.identityToken,
        });
        console.log(JSON.stringify({ error, user }, null, 2));
        if (!error) {
          // User is signed in.
        }
      } else {
        throw new Error("No identityToken.");
      }
    } catch (err: any) {
      if (err.code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };
  const [paginationIndex, setPaginationindex] = useState(0);
  const scrollX = useSharedValue(0);
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ) {
      setPaginationindex(viewableItems[0].index);
    }
  };

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig,
      onViewableItemsChanged,
    },
  ]);
  return (
    <LinearGradient
      colors={["#CFFAFE", "#f8f8f8"]}
      locations={[0.1, 0.4]}
      className="flex-1 justify-center items-center pt-10 px-6 h-1/2"
    >
      <SafeAreaView>
        <View>
          <Animated.FlatList
            data={WelcomeSliderTypes}
            renderItem={({ item, index }) => (
              <Slideritem item={item} index={index} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
          />
          <Pagination
            items={WelcomeSliderTypes}
            scrollX={scrollX}
            paginationIndex={paginationIndex}
          />
        </View>
        <Text className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Welcome to WhosBall
        </Text>
        <Text className="text-lg text-gray-600 mb-10 text-center">
          No catfish. No lies. Verify who she really is — before you catch
          feelings.
        </Text>

        <TouchableOpacity
          onPress={signIn}
          className="shadow p-3 rounded-full mb-10 bg-white flex-row justify-center items-center space-x-3"
        >
          <Image
            source={require("../../assets/images/google.png")}
            className="h-6 w-6"
          />
          <Text className="text-center text-gray-700 text-lg font-bold">
            Sign in with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={(e) => signInApple(e)}
          className="shadow p-3 rounded-full bg-white flex-row justify-center items-center space-x-3"
        >
          <Image
            source={require("../../assets/images/apple.svg")}
            className="h-6 w-6"
          />
          <Text className="text-center text-gray-700 text-lg font-bold">
            Sign in with Apple
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Welcome;
