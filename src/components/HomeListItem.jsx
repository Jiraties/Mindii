import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Modal,
  Image,
} from "react-native";

import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const HomeListItem = (props) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const navigation = useNavigation();

  const customButtonPressHandler = () => {
    setModalIsVisible(true);
    // navigation.navigate(props.redirectTo ? props.redirectTo : "home");
  };

  return (
    <View
      style={{
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        shadowOpacity: 0.2,
      }}
    >
      <Modal
        visible={modalIsVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={s.modal}>
          <Image
            source={require("../../assets/images/modal.png")}
            style={s.modalImage}
          />
          <View style={s.modalTextWrapper}>
            <Text style={s.headerText}>
              ก่อนจะประเมินควรทราบว่าแอปนี้ควรใช้ในการประเมินเบื้องต้นเท่านั้นอาจเกิดข้อผิดพลาดได้ควรได้รับคำแนะนำจากแพทย์
            </Text>
          </View>

          {/* <CustomButton
            style={[
              s.homeListItem__button,
              { width: "100%", marginBottom: 20 },
            ]}
            pressedStyle={s.homeListItem__buttonPressed}
            onPress={() => setModalIsVisible(false)}
          >
            <Text style={s.homeListItem__buttonText}>Back</Text>
          </CustomButton> */}
          <CustomButton
            style={[
              s.homeListItem__button,
              { width: "100%", height: 50, marginTop: 30 },
            ]}
            pressedStyle={s.homeListItem__buttonPressed}
            onPress={() => {
              navigation.navigate(props.redirectTo ? props.redirectTo : "home");
              setModalIsVisible(false);
              return "a";
            }}
          >
            <Text style={s.homeListItem__buttonText}>รับทราบ</Text>
          </CustomButton>
        </View>
      </Modal>
      <View style={s.homeListItem}>
        <ImageBackground
          style={s.homeListItem__image}
          source={
            props.image ? require("../../assets/images/diagnosis.png") : ""
          }
          resizeMode="cover"
        >
          <Text style={s.homeListItem__text}>{props.text}</Text>
          <CustomButton
            style={s.homeListItem__button}
            pressedStyle={s.homeListItem__buttonPressed}
            onPress={customButtonPressHandler}
          >
            <Text style={s.homeListItem__buttonText}>{props.button}</Text>
          </CustomButton>
        </ImageBackground>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  homeListItem: {
    width: "100%",
    backgroundColor: "#b8eaff",
    borderRadius: 20,
    marginBottom: 20,
    height: 175,
    overflow: "hidden",
  },
  homeListItem__text: {
    fontSize: 20,
    flex: 1,
    fontFamily: "SemiBold",
    fontWeight: "old",
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
    fontFamily: "SemiBold",
  },
  homeListItem__buttonPressed: {
    backgroundColor: "#2533b3",
    elevation: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  homeListItem__image: {
    borderRadius: 20,
    marginBottom: 20,
    height: 175,
    padding: 20,
    // opacity: 0.5,
  },
  modal: {
    backgroundColor: "#efefef",
    borderRadius: 20,
    // marginTop: 200,
    // height: "100%",
    borderTopRightRadius: 30,
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
  modalImage: {
    width: 300,
    height: 300,
  },
  headerText: {
    textAlign: "left",
    fontSize: 20,
    fontFamily: "SemiBold",
    fontWeight: 800,
    overflow: "visible",
    flex: 1,
  },
  headerTextHighlight: {
    textAlign: "left",
    fontSize: 20,
    color: "#FB6E90",
    fontFamily: "SemiBold",
    overflow: "visible",
  },
});

export default HomeListItem;
