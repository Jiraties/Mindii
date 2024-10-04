import { Pressable, View } from "react-native";

const CustomButton = (props) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [props.style, props.pressedStyle] : props.style
      }
      onPress={props.onPress}
    >
      {props.children}
    </Pressable>
  );
};

export default CustomButton;
