import { View, Text, StyleSheet } from "react-native";
import { Fonts } from "../constants/styles";

const HeaderText = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontSize: 20, fontFamily: Fonts.regular }}>ใกล้</Text>
      <Text
        style={{ fontSize: 20, fontFamily: Fonts.regular, color: "#3246FF" }}
      >
        หมอ
      </Text>
      {props.isDiagnosis && (
        <Text style={{ fontSize: 20, fontFamily: Fonts.regular }}>
          {" "}
          · ประเมินโรค
        </Text>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  topHeaderText: {},
});

export default HeaderText;
