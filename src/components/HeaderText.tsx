import { View, Text, StyleSheet } from "react-native";
import { Fonts } from "../constants/styles";

const HeaderText = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text
        style={{ fontSize: 20, fontFamily: Fonts.regular, color: "#5271ff" }}
      >
        Mindii
      </Text>
      {props.text && (
        <Text style={{ fontSize: 20, fontFamily: Fonts.regular }}>
          {" "}
          · {props.text}
        </Text>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  topHeaderText: {},
});

export default HeaderText;
