import { StyleSheet, Text, View } from "react-native";

import CustomButton from "../CustomButton";

const SelectOptions = (props) => {
  return (
    <>
      <Text style={s.headerText}>{props.headerText}</Text>
      {/* <Text style={s.headerDescriptionText}>{props.headerDescriptionText}</Text> */}

      <View style={s.optionList}>
        {props.optionsList.map((option) => (
          <CustomButton
            style={s.optionItem}
            onPress={() => props.onOptionPress(option, props.headerText)}
            key={option.value}
          >
            <Text>{option.name}</Text>
          </CustomButton>
        ))}
      </View>
    </>
  );
};

const s = StyleSheet.create({
  headerText: {
    fontSize: 40,
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
});

export default SelectOptions;
