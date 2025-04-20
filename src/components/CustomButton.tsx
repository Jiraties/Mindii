import { Pressable, View } from "react-native";

const CustomButton = (props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed ? [props.style, props.pressedStyle] : props.style,
        props.disabled && { opacity: 0.5 },
      ]}
      onPress={props.onPress}
    >
      {props.children}
    </Pressable>
  );
};

export default CustomButton;
