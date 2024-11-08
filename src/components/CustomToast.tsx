import { View, Text } from "react-native";
import { SymbolView } from "expo-symbols";
import { Fonts } from "../constants/styles";

import type { SFSymbol } from "sf-symbols-typescript";

const CustomToast = (props) => {
  let symbolName: SFSymbol = "questionmark.folder";
  let symbolColor = "";

  switch (props.type) {
    case "logout":
      symbolName = "person.crop.circle.badge.xmark";
      symbolColor = "#FF0000";
      break;
    case "warning":
      symbolName = "exclamationmark.triangle";
      symbolColor = "#FFD700";
      break;
    case "login":
      symbolName = "person.crop.circle.badge.checkmark";
      symbolColor = "#32CD32";
      break;
    case "success2":
      symbolName = "checkmark.circle";
      symbolColor = "#32CD32";
      break;
  }

  return (
    <View
      style={{
        backgroundColor: "#fdfdfd",
        padding: 20,
        borderRadius: 20,
        width: "auto",
        flexDirection: "row",
        gap: 15,
        maxWidth: "70%",
      }}
    >
      <SymbolView name={symbolName} tintColor={symbolColor} />
      <Text style={{ fontFamily: Fonts.regular, maxWidth: "80%" }}>
        {props.text1}
      </Text>
    </View>
  );
};

export default CustomToast;
