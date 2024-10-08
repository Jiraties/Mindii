import { View, Text, StyleSheet, Image } from "react-native";
import RootContainer from "../components/RootContainer";

const Conclusions = (props) => {
  return (
    <RootContainer>
      <Text style={s.headerText}>คุณมีความเสี่ยงเป็น</Text>
      <Text style={s.headerTextHighlight}>
        ต่อมไทรอยด์ ทำงานเกิน คอพอกเป็นพิษ หาหมอทันที
      </Text>
      <Image
        style={{ width: "auto", height: "auto" }}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
    </RootContainer>
  );
};

const s = StyleSheet.create({
  headerText: {
    fontSize: 40,
    fontFamily: "SemiBold",
  },
  headerTextHighlight: {
    fontSize: 40,
    color: "blue",
    fontFamily: "SemiBold",
    lineHeight: 55,
  },
});

export default Conclusions;
