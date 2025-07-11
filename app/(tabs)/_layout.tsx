import { Tabs } from "expo-router";

export default function Tabslayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen name="background" options={{ title: "Background" }} />
      <Tabs.Screen
        name="create"
        options={{ title: "Create", headerShown: false }}
      />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
