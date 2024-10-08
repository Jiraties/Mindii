import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import CustomButton from "../CustomButton";

const SelectOptions = (props) => {
  const header = props.optionsSettings.header;
  const subheader = props.optionsSettings.subheader;
  const isChecklist = props.optionsSettings.checklist;

  if (isChecklist) {
    props.optionsList.forEach((option) => {
      option.isChecked = false;
    });
  }

  const [checklistState, setChecklistState] = useState(props.optionsList);

  return (
    <>
      {isChecklist && (
        <CustomButton
          style={s.continueButton}
          onPress={() => props.onChecklistCompletion(checklistState, header)}
        >
          <Text style={{ color: "#fff", fontFamily: "SemiBold" }}>ไปต่อ</Text>
        </CustomButton>
      )}
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
          if (isChecklist) {
            return (
              <BouncyCheckbox
                style={s.checkListItem}
                textStyle={s.checkListItem__textStyle}
                fillColor="#3246FF"
                unFillColor="#eee"
                text={option.name}
                isChecked={checklistState[index].isChecked}
                onPress={(checked: boolean) => {
                  setChecklistState(
                    checklistState.map((item) =>
                      item.value === option.value
                        ? { ...item, isChecked: checked }
                        : item
                    )
                  );
                }}
                key={index}
              />
            );
          } else {
            return (
              <CustomButton
                style={s.optionItem}
                onPress={() => props.onOptionPress(option, header)}
                key={option.value}
              >
                <Text style={{ fontFamily: "SemiBold", fontSize: 15 }}>
                  {option.name}
                </Text>
              </CustomButton>
            );
          }
        })}
      </View>
    </>
  );
};

const s = StyleSheet.create({
  headerText: {
    fontFamily: "SemiBold",
  },
  headerDescriptionText: {
    fontSize: 15,
    fontFamily: "SemiBold",
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
    fontFamily: "SemiBold",
    color: "#000",
    textDecorationLine: "none",
  },
  continueButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#3246FF",
    padding: 20,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});

export default SelectOptions;
