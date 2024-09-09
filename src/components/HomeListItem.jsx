import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";

const HomeListItem = (props) => {
  const navigation = useNavigation();

  const customButtonPressHandler = () => {
    navigation.navigate("diagnosis");
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
      <View style={s.homeListItem}>
        <ImageBackground
          style={s.homeListItem__image}
          source={require("../../assets/images/diagnosis.png")}
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
    backgroundColor: "#fff",

    borderRadius: 20,
    marginBottom: 20,
    height: 175,
    overflow: "hidden",
  },
  homeListItem__text: {
    fontSize: 20,
    flex: 1,
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
});

export default HomeListItem;
