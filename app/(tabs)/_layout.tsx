import { Tabs } from "expo-router";
import { Tab } from "../component/Tab";

export default function Tabslayout() {
  return (
    <Tabs tabBar={(props) => <Tab {...props} />}>
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="create"
        options={{ title: "Create", headerShown: false }}
      />
      <Tabs.Screen name="background" options={{ title: "Background" }} />
    </Tabs>
  );
}
