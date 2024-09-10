import { View, Text } from "react-native";

const HeaderText = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontSize: 20, fontFamily: "SemiBold" }}>ใกล้</Text>
      <Text style={{ fontSize: 20, fontFamily: "SemiBold", color: "#3246FF" }}>
        หมอ
      </Text>
    </View>
  );
};

export default HeaderText;
