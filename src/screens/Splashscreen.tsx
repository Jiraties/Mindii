import { View, StyleSheet, Text, Image, ScrollView } from "react-native";

import RootContainer from "../components/RootContainer";
import CustomButton from "../components/CustomButton";
import { Colors } from "../constants/styles";

const Splashscreen = (props) => {
  return (
    <ScrollView>
      <RootContainer style={s.splashscreenRootContainer} image={true}>
        <View style={s.previewWrapper}>
          <View style={s.preview}>
            <Image
              style={s.preview}
              source={require("../../assets/images/splashscreen1.png")}
            />
          </View>
          <View style={s.preview}>
            <Image
              style={s.preview}
              source={require("../../assets/images/splashscreen3.png")}
            />
          </View>
          <View style={s.preview}>
            <Image
              style={s.preview}
              source={require("../../assets/images/splashscreen2.png")}
            />
          </View>
        </View>
        <View style={s.titleTextWrapper}>
          <View style={s.titleTextSubwrapper}>
            <Text style={s.titleText}>รู้ทันโรค</Text>
            <Text style={[s.titleText, { color: Colors.blue }]}>ง่ายๆ </Text>
            {/* <Text style={s.titleText}>Easy </Text>
          <Text style={[s.titleText, { color: Colors.blue }]}>Diagnosis </Text> */}
          </View>
          <Text style={s.titleText}>แค่ปลายนิ้ว</Text>
        </View>
        <Text style={s.subtitleText}>
          แอปพลิเคชันใกล้หมอจะช่วยให้คุณประเมินโรคต่าง ที่อาจกระทบคุณได้
          พร้อมกับให้คำแนะนำเกี่ยวกับโรค และอาการแบบไม่มีค่าใช้จ่ายใดๆทั้งสิ้น
        </Text>
        {/* <Text style={s.subtitleText}>
        SymptoSense will help you assess various diseases that may affect you,
        along with providing advice about illnesses and symptoms free of charge.
      </Text> */}
        <CustomButton
          style={s.signupButton}
          onPress={() => props.navigation.navigate("signup")}
        >
          <Text style={s.signupButton__text}>สร้างบัญชีใหล้หมอ</Text>
        </CustomButton>
        <CustomButton
          style={s.loginButton}
          onPress={() => props.navigation.navigate("login")}
        >
          <Text style={s.loginButton__text}>มีบัญชีอยู่แล้วหรือเปล่า?</Text>
          <Text
            style={[
              s.loginButton__text,
              { color: Colors.blue, textDecorationLine: "underline" },
            ]}
          >
            ล็อกอิน
          </Text>
        </CustomButton>
      </RootContainer>
    </ScrollView>
  );
};

const defaultShadow = {
  shadowColor: "black",
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 10,
  shadowOpacity: 0.3,
};

const s = StyleSheet.create({
  previewWrapper: {
    flexDirection: "row",
    marginLeft: -75,
    gap: 20,
    marginBottom: 40,
  },
  preview: {
    height: 275,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 20,
    ...defaultShadow,
  },
  titleTextWrapper: {
    alignItems: "center",
    marginBottom: 10,
  },
  titleTextSubwrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  titleText: {
    fontFamily: "SemiBold",
    fontSize: 40,
  },
  subtitleText: {
    fontFamily: "SemiBold",
    textAlign: "center",
    marginBottom: 40,
  },
  splashscreenRootContainer: {
    padding: 20,
    backgroundColor: Colors.background,
  },
  signupButton: {
    backgroundColor: Colors.blue,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15,
    ...defaultShadow,
  },
  signupButton__text: {
    fontFamily: "SemiBold",
    color: "#fff",
  },
  loginButton: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
  loginButton__text: {
    fontFamily: "SemiBold",
  },
});

export default Splashscreen;
