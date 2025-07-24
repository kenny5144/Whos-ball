// constants/icon.ts
import { Feather } from "@expo/vector-icons";

export type IconKey = "index" | "create" | "profile";

export const icon: Record<IconKey, (props: any) => React.ReactElement> = {
  index: (props) => <Feather name="home" size={24} {...props} />,
  create: (props) => <Feather name="plus" size={24} {...props} />,
  profile: (props) => <Feather name="user" size={24} {...props} />,
};
