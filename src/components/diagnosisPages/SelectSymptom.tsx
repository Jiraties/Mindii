import { Text, TextInput, View, FlatList, StyleSheet } from "react-native";
import { useState } from "react";

import CustomButton from "../CustomButton";
import { diagnosisDataType, symptom } from "../../models/diagnosisTypes";
import { Fonts } from "../../constants/styles";

const unstableSymptoms = ["vomit", "cough", "irregular_heartbeat"];

const SelectSymptom: React.FC<{
  symptomList: symptom[];
  diagnosisData: diagnosisDataType;
  selectedSymptomHandler: (symptom: symptom) => void;
}> = (props) => {
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [originalSymptomList] = useState(
    // Filter previously selected symptoms
    props.symptomList.filter((symptom, index) => {
      const isPreviouslySelected =
        props.diagnosisData.symptomList.length !== 0 &&
        index < props.diagnosisData.symptomList.length &&
        props.diagnosisData.symptomList[index].id.includes(symptom.id);

      const isNoMatch =
        props.diagnosisData.screenIndex === 0 && symptom.id === "no_match";

      return !isPreviouslySelected && !isNoMatch;
    })
  );
  const [symptomList, setSymptionList] = useState(originalSymptomList);
  const isFirstDiagnosisScreen = props.diagnosisData.screenIndex === 0;

  const searchFieldHandler = (text) => {
    setSearchFieldValue(text); // Update the search field value
    const filteredSymptomList = originalSymptomList.filter((symptom) => {
      return symptom.name.includes(text); // Use the 'text' parameter directly here
    });

    setSymptionList(filteredSymptomList); // Update the displayed list
  };

  return (
    <>
      <Text style={s.headerText}>
        {isFirstDiagnosisScreen
          ? "มาประเมินโรคกัน"
          : "มีอาการเพิ่มเติมหรือไม่?"}
      </Text>
      <Text style={s.headerDescriptionText}>
        {isFirstDiagnosisScreen
          ? "เริ่มจากการเลือกอาการที่กระทบคุณมากที่สุด"
          : `คุณเลือกอาการ ${props.diagnosisData.symptomList.map(
              (symptom) => symptom.name
            )} ไปแล้ว `}
      </Text>
      <TextInput
        placeholder="ค้นหาอาการที่ต้องการ..."
        style={s.searchField}
        value={searchFieldValue}
        onChangeText={searchFieldHandler} // Call the handler with each change
      />
      {symptomList.length === 0 && (
        <View style={s.symptomListItem__notFound}>
          <Text style={s.symptomListItem__notFoundText}>
            ไม่พบอาการที่คุณค้นหา ⛓️‍💥
          </Text>
        </View>
      )}
      {/* <View style={s.symptomListItem}>
        <Text>ผมมีอาการแค่นี้</Text>
      </View> */}
      <FlatList
        data={symptomList}
        keyExtractor={(symptom) => symptom.id}
        style={s.symptomList}
        renderItem={({ item: symptom, index }) => {
          return (
            <View
              style={[
                s.symptomListItem,
                index === symptomList.length - 1 && { marginBottom: 100 },
              ]}
            >
              <View style={s.symptomListItem__textWrapper}>
                <Text style={s.symptomListItem__titleText}>
                  {`${symptom.emoji} ${symptom.name}`}{" "}
                  {unstableSymptoms.includes(symptom.id) && (
                    <View style={s.unstable}>
                      <Text style={s.unstable__text}>ไม่เสถียร</Text>
                    </View>
                  )}
                </Text>
                <Text style={s.symptomListItem__descriptionText}>
                  {symptom.description}
                </Text>
              </View>

              {unstableSymptoms.includes(symptom.id) ? (
                <View
                  style={[
                    s.symptomListItem__button,
                    { backgroundColor: "#f0f0f0" },
                  ]}
                >
                  <Text
                    style={[
                      s.symptomListItem__buttonText,
                      { color: "#787878" },
                    ]}
                  >
                    {"-"}
                  </Text>
                </View>
              ) : (
                <CustomButton
                  onPress={() => props.selectedSymptomHandler(symptom)}
                  style={s.symptomListItem__button}
                  pressedStyle={s.homeListItem__buttonPressed}
                >
                  <Text style={s.symptomListItem__buttonText}>{">"}</Text>
                </CustomButton>
              )}
            </View>
          );
        }}
      />
      {props.diagnosisData.screenIndex !== 0 && (
        <CustomButton
          style={s.noMatch}
          onPress={() =>
            props.selectedSymptomHandler({
              id: "no_match",
              name: "กล่าวอาการไปหมดแล้ว",
              emoji: "✅",
              description: "",
            })
          }
        >
          <Text style={s.noMatch__text}>กล่าวอาการไปหมดแล้ว</Text>
        </CustomButton>
      )}
    </>
  );
};

const s = StyleSheet.create({
  headerText: {
    fontSize: 40,
    fontFamily: Fonts.regular,
  },
  headerDescriptionText: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    marginBottom: 10,
  },
  symptomList: {
    borderRadius: 20,
  },
  symptomListItem: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    flexDirection: "row",
    overflow: "visible",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    gap: 10,
  },
  symptomListItem__notFound: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  symptomListItem__notFoundText: {
    textAlign: "center",
    fontFamily: Fonts.regular,
  },
  symptomListItem__textWrapper: {
    flex: 1,
    gap: 15,
  },
  symptomListItem__titleText: {
    fontSize: 20,
    fontFamily: Fonts.regular,
    flex: 1,
  },
  symptomListItem__descriptionText: {
    flex: 1,
    fontFamily: Fonts.regular,
  },
  symptomListItem__button: {
    flex: 0.2,
    backgroundColor: "#5271ff",
    borderRadius: 100,
    justifyContent: "center",
    height: 50,
  },
  symptomListItem__buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: 800,
  },
  searchField: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 100,
    marginBottom: 20,
    fontFamily: Fonts.regular,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  homeListItem__button: {
    position: "absolute",
    bottom: 40,
    right: 40,
    backgroundColor: "#5271ff",
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
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  symptomListHistory: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  noMatch: {
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
  noMatch__text: {
    color: "#fff",
    fontFamily: Fonts.regular,
  },
  unstable: {
    backgroundColor: "#959ffc",
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  unstable__text: {
    color: "#fff",
    fontSize: 12,
    fontFamily: Fonts.regular,
  },
});

export default SelectSymptom;
