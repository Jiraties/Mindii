import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import CustomButton from "../CustomButton";
import { diagnosisOption, optionsSettings } from "../../models/diagnosisTypes";
import { Fonts } from "../../constants/styles";
import { SymbolView } from "expo-symbols";

const SelectOptions: React.FC<{
  optionsList: diagnosisOption[];
  onOptionPress: (option: diagnosisOption, header: string) => void;
  optionsSettings: optionsSettings;
}> = (props) => {
  const header = props.optionsSettings.header;
  const subheader = props.optionsSettings.subheader;

  const [checklistState, setChecklistState] = useState(props.optionsList);

  return (
    <>
      <Text
        style={[
          s.headerText,
          header.length > 35 ? { fontSize: 35 } : { fontSize: 40 },
        ]}
      >
        {header}
      </Text>
      <Text style={s.headerDescriptionText}>{subheader}</Text>

      <View style={s.optionList}>
        {props.optionsList.map((option, index) => {
          return (
            <CustomButton
              style={s.optionItem}
              onPress={() => props.onOptionPress(option, header)}
              pressedStyle={{ backgroundColor: "#eee" }}
              key={option.value}
            >
              <Text style={{ fontFamily: Fonts.regular, fontSize: 15 }}>
                {option.name}
              </Text>
            </CustomButton>
          );
        })}
      </View>
    </>
  );
};

const s = StyleSheet.create({
  headerText: {
    fontFamily: Fonts.regular,
  },
  headerDescriptionText: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    marginBottom: 10,
  },
  optionList: {
    borderRadius: 20,
  },
  optionItem: {
    padding: 20,
    backgroundColor: "#fdfdfd",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    marginBottom: 20,
  },
  checkListItem: {
    padding: 20,
    backgroundColor: "#fdfdfd",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    marginBottom: 20,
  },
  checkListItem__textStyle: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: "#000",
    textDecorationLine: "none",
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

export default SelectOptions;
