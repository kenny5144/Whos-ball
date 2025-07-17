import { ImageSourcePropType } from "react-native";

export type postSliderTypes = {
  name: string;
  title: string;
  Description: string;
  image: ImageSourcePropType;
};
export const postSliderTypes = [
  {
    name: "kehinde ojo ",
    title: "Welcome to WhosBall",
    image: require("@/assets/images/zoe.jpg"),
    Description:
      "  No catfish. No lies. Verify who she really is — before you catch feelings.",
  },
  {
    name: "kehinde ojo ",
    title: "Welcome to WhosBall",
    image: require("@/assets/images/sal.jpg"),
    Description:
      "  No catfish. No lies. Verify who she really is — before you catch feelings.",
  },
  {
    name: "kehinde ojo ",
    title: "Welcome to WhosBall",
    image: require("@/assets/images/zoe2.jpg"),
    Description:
      "  No catfish. No lies. Verify who she really is — before you catch feelings.",
  },
];
