import { View, Text, StyleSheet } from "react-native";

const HeaderText = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontSize: 20, fontFamily: "SemiBold" }}>ใกล้</Text>
      <Text style={{ fontSize: 20, fontFamily: "SemiBold", color: "#3246FF" }}>
        หมอ
      </Text>
      {props.isDiagnosis && (
        <Text style={{ fontSize: 20, fontFamily: "SemiBold" }}>
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
