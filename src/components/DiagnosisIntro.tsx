import { View, Text, StyleSheet, Image } from "react-native";
import RootContainer from "./RootContainer";
import { Fonts, Shadows } from "../constants/styles";
import CustomButton from "./CustomButton";

const DiagnosisIntro = (props) => {
  return (
    <>
      <View style={s.diagnosisIntro__view}>
        <Image
          style={s.image}
          source={require("../../assets/images/happy.jpeg")}
        />
        <Text style={s.header}>
          การดูแลสุขภาพจิต{"\n"}เป็นสิ่งสำคัญ {"\n"}ที่หลายคนมองข้าม
        </Text>
        <Text style={s.description}>
          การที่คุณทำแบบประเมิน GHQ-28 จะทำให้พวกเราเข้าใจคุณได้มากขึ้น
          กรุณาตอบตามความเป็นจริง
        </Text>
      </View>
      <CustomButton style={s.continueButton} onPress={() => props.onContinue()}>
        <Text style={{ color: "#fff", fontFamily: Fonts.regular }}>ไปต่อ</Text>
      </CustomButton>
    </>
  );
};

const s = StyleSheet.create({
  diagnosisIntro__view: {
    gap: 20,
  },
  header: {
    fontFamily: Fonts.regular,
    fontSize: 30,
    lineHeight: 45,
  },
  image: {
    width: "100%",
    height: "55%",
    borderRadius: 30,
    ...Shadows.default,
  },
  highlights: {
    fontSize: 30,
    color: "#5271ff",
    fontFamily: Fonts.regular,
  },
  description: {
    fontFamily: Fonts.regular,
  },
  continueButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#5271ff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});

export default DiagnosisIntro;
