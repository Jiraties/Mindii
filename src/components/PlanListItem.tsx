import CustomButton from "./CustomButton";

import { View, Text, StyleSheet } from "react-native";
import { SFSymbol, SymbolView } from "expo-symbols";
import { Fonts, Shadows } from "../constants/styles";
import { useNavigation } from "@react-navigation/native";

const PlanListItem: React.FC<{
  title: string;
  description: string;
  redirectTo: string;
  icon: SFSymbol;
}> = (props) => {
  const navigation = useNavigation();

  return (
    <View style={s.planListItem}>
      <Text style={s.planListItem__headerText}>{props.title}</Text>
      <Text style={s.planListItem__descriptionText}>{props.description}</Text>
      <SymbolView
        style={s.planListItem__icon}
        name={props.icon}
        tintColor="#eee"
        size={100}
      ></SymbolView>
      <CustomButton
        style={s.homeListItem__button}
        pressedStyle={s.homeListItem__buttonPressed}
        onPress={() => {
          //@ts-ignore
          navigation.navigate(props.redirectTo);
        }}
      >
        <SymbolView name="arrow.right" tintColor="#fff"></SymbolView>
      </CustomButton>
    </View>
  );
};

const s = StyleSheet.create({
  planListItem: {
    padding: 20,
    gap: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  planListItem__headerText: {
    fontSize: 20,
    fontFamily: Fonts.regular,
  },
  planListItem__descriptionText: {
    fontFamily: Fonts.regular,
    zIndex: 2,
    width: "90%",
  },
  planListItem__icon: {
    position: "absolute",
    bottom: 0,
    right: 50,
    zIndex: 1,
  },
  homeListItem__button: {
    backgroundColor: "#5271ff",
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    zIndex: 2,
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

export default PlanListItem;
