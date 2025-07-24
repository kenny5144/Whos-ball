import { icon } from "@/constants/icon";
import { PlatformPressable } from "@react-navigation/elements";
import type { MouseEvent as ReactMouseEvent } from "react";
import React, { useEffect } from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type TabBarButtonProps = {
  onPress: (e: PressEvent) => void;
  onLongPress: (e: GestureResponderEvent) => void;
  isFocused: boolean;
  routeName: keyof typeof icon;
  color: string;
  label: string;
};

type PressEvent = GestureResponderEvent | ReactMouseEvent<HTMLAnchorElement>;

const TabBarButton: React.FC<TabBarButtonProps> = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
  }, [isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return { opacity };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  const IconComponent = icon[routeName];

  return (
    <PlatformPressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
    >
      <Animated.View style={animatedIconStyle}>
        {IconComponent({
          color: isFocused ? "#f8f6fd" : "#c69f9f",
          fontSize: 24,
        })}
      </Animated.View>
      <Animated.Text
        style={[
          { color: isFocused ? "#673ab7" : "#c69f9f", fontSize: 12 },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </PlatformPressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
