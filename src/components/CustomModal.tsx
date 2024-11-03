import React from "react";
import { View, Text, Modal, StyleSheet, Linking } from "react-native";
import LottieView from "lottie-react-native";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import { Shadows, Fonts } from "../constants/styles";

const CustomModal: React.FC<{
  modalIsVisible: boolean;
  setModalIsVisible: (visible: boolean) => void;
  redirectTo: string;
}> = ({ modalIsVisible, setModalIsVisible, redirectTo }) => {
  const navigation = useNavigation<any>();

  return (
    <Modal
      visible={modalIsVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={s.modal}>
        <LottieView
          source={require("../../assets/animations/diagnosisAnimation.json")}
          style={s.animation}
          autoPlay
        />
        <View style={s.modalTextWrapper}>
          <View>
            <Text style={s.headerText}>
              แอปพลิเคชันใกล้หมอนั้นทำมาเพื่อให้คำแนะนำด้านสุขภาพเบื้องต้นเท่านั้น
            </Text>
            <Text style={[s.headerText, { fontSize: 15, marginBottom: 30 }]}>
              ไม่ควรใช้เป็นใช่เครื่องมือวินิจฉัยอย่างเป็นทางการ
              ควรปรึกษาผู้เชี่ยวชาญด้านสุขภาพ และจะไม่รับผิดชอบต่อการตัดสินใจใดๆ
              ที่เกิดจากคำแนะนำของแอป
            </Text>
          </View>
          <CustomButton
            style={s.termsAndConditions__button}
            onPress={() =>
              Linking.openURL(
                "https://docs.google.com/document/d/1F2cQv9utSkQ8fEZvSraeTjy1bewv5agTMVC84yN9YTs/edit?usp=sharing"
              )
            }
          >
            <Text style={s.termsAndConditions__text}>
              ดูข้อกำหนดและเงื่อนไขเต็ม
            </Text>
          </CustomButton>
        </View>
        <CustomButton
          style={[
            s.homeListItem__button,
            { width: "100%", height: 50, marginTop: 30 },
          ]}
          pressedStyle={s.homeListItem__buttonPressed}
          onPress={() => {
            navigation.navigate(redirectTo);
            setModalIsVisible(false);
          }}
        >
          <Text style={s.homeListItem__buttonText}>รับทราบ</Text>
        </CustomButton>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  animation: {
    height: 250,
    width: 250,
  },
  modal: {
    backgroundColor: "#efefef",
    borderRadius: 20,
    flex: 1,
    padding: 20,
    gap: 30,
    alignItems: "center",
    paddingTop: "20%",
    paddingBottom: "10%",
  },
  modalTextWrapper: {
    flex: 1,
  },
  headerText: {
    textAlign: "left",
    fontSize: 30,
    fontFamily: Fonts.regular,
    marginBottom: 10,
  },
  termsAndConditions__button: {},
  termsAndConditions__text: {
    fontFamily: Fonts.regular,
    color: "#3246FF",
    fontSize: 15,
  },
  homeListItem__button: {
    backgroundColor: "#3246FF",
    width: "40%",
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },
  homeListItem__buttonText: {
    color: "#fff",
    fontFamily: Fonts.regular,
  },
  homeListItem__buttonPressed: {
    backgroundColor: "#2533b3",
    elevation: 1,
    ...Shadows.default,
  },
});

export default CustomModal;
