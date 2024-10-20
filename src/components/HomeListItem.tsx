import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Modal,
  Image,
  Linking,
} from "react-native";

import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";
import { Shadows } from "../constants/styles";

const HomeListItem: React.FC<{
  text: string;
  button: string;
  image?: boolean;
  redirectTo: string;
  warningModal?: boolean;
}> = (props) => {
  const navigation = useNavigation<any>();
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const customButtonPressHandler = () => {
    if (props.warningModal) {
      setModalIsVisible(true);
    } else {
      navigation.navigate(props.redirectTo);
    }
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
      <CustomModal
        modalIsVisible={modalIsVisible}
        setModalIsVisible={setModalIsVisible}
        redirectTo={props.redirectTo}
      />

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
    backgroundColor: "#fdfdfd",
    borderRadius: 20,
    marginBottom: 20,
    height: 175,
    overflow: "hidden",
  },
  homeListItem__text: {
    fontSize: 20,
    flex: 1,
    fontFamily: "SemiBold",
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
  animation: {
    height: 250,
    width: 250,
  },
  homeListItem__buttonText: {
    color: "#fff",
    fontFamily: "SemiBold",
  },
  homeListItem__buttonPressed: {
    backgroundColor: "#2533b3",
    elevation: 1,
    ...Shadows.default,
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
    fontSize: 30,
    fontFamily: "SemiBold",
    marginBottom: 10,
  },
  headerTextHighlight: {
    textAlign: "left",
    fontSize: 20,
    color: "#FB6E90",
    fontFamily: "SemiBold",
    overflow: "visible",
  },
  termsAndConditions__button: {},
  termsAndConditions__text: {
    fontFamily: "SemiBold",
    color: "#3246FF",
    fontSize: 15,
  },
});

export default HomeListItem;
