import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../components/CustomButton";
import RootContainer from "../components/RootContainer";
import SelectSymptom from "../components/diagnosisPages/SelectSymptom";
import SelectOptions from "../components/diagnosisPages/SelectOptions";

// const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const diagnosisData = {
  screenIndex: 0,
  screenType: ["selectSymptom"],
  options: [],
  symptomList: [],
  selectedOptionList: [],
};

const symptomLengthList = [
  {
    value: "2-3",
    name: "2-3 วัน",
  },
  {
    value: "7",
    name: "1 สัปดาห์",
  },
];

const logDiagnosisData = () => {
  console.log(
    `
    --------------------------
    screenIndex: ${diagnosisData.screenIndex},
    screenType: ${diagnosisData.screenType},
    options: ${JSON.stringify(diagnosisData.options)},
    optionsHeader: ${diagnosisData.optionsHeader},
    symptomList: ${JSON.stringify(diagnosisData.symptomList)},
    selectedOptionList: ${JSON.stringify(diagnosisData.selectedOptionList)}
    --------------------------
    `
  );
};

const Diagnosis = (props) => {
  const navigation = useNavigation();
  const screenIndex = diagnosisData.screenIndex;
  const screenType = diagnosisData.screenType[screenIndex];
  const [symptomList, setSymptomList] = useState([
    {
      id: "heavy_diarrhea",
      name: "ท้องเสียหนัก",
      emoji: "💩",
      description:
        "การถ่ายอุจจาระเหลว หรือถ่ายเป็นน้ำ 4-5 ครั้งขึ้นไปภายใน 24ชม",
    },
  ]);

  logDiagnosisData();

  const nextScreen = (nextScreenType) => {
    diagnosisData.screenType.push(nextScreenType);
    diagnosisData.screenIndex++;

    navigation.push("diagnosis");
  };

  const addSymptom = (symptom, nextScreenType) => {
    diagnosisData.symptomList.push(symptom);
    nextScreen(nextScreenType);
  };

  const addSymptomLength = (length, nextScreenType) => {
    diagnosisData["symptomList"][screenIndex - 1]["length"] = length;
    nextScreen(nextScreenType);
  };

  const rewindSymptom = () => {
    if (screenIndex === 0) {
      navigation.goBack();
      diagnosisData = {
        screenIndex: 0,
        screenType: ["selectSymptom"],
        options: [],
        optionsHeader: "",
        symptomList: [],
        selectedOptionList: [],
      };
      return;
    }

    const lastScreenType = diagnosisData["screenType"].at(-1);

    // Determine which screen type and remove previous information added
    switch (lastScreenType) {
      case "selectSymptom":
        diagnosisData.symptomList.splice(-1);
      case "symptomLength":
        delete diagnosisData.symptomList[diagnosisData.symptomList.length - 1]
          .length;
      case "customOptions":
        diagnosisData.selectedOptionList.pop();
      // NOT SPLICING SCREENTYPE
    }
    logDiagnosisData();

    diagnosisData.screenType.splice(-1);
    diagnosisData.screenIndex--;
    navigation.goBack();
  };

  const createCustomOptions = ({
    header,
    subheader,
    options,
    nextDiagnosisPage,
  }) => {
    diagnosisData.options = options;
    options.at(-1).question = header;

    if (nextDiagnosisPage) nextScreen("customOptions");
  };

  const handleSelectSymtomPress = (symptom) => {
    const id = symptom.id;

    if (id === "heavy_diarrhea") {
      addSymptom(symptom, "customOptions");
      createCustomOptions({
        header: "คุณน้ำหนักลดลงอย่างรวดเร็วหรือเปล่า?",
        options: [{ name: "ใช่", value: "yes" }],
      });
    } else {
      addSymptom(symptom, "symptomLength");
    }
  };

  const handleSymptomLengthPress = (symptomLength) => {
    addSymptomLength(symptomLength.value, "selectSymptom");
  };

  const handleCustomOptionPress = (option, headerText) => {
    option.question = headerText;
    diagnosisData.selectedOptionList.push(option);

    if (
      diagnosisData.symptomList.some(
        (symptom) => (symptom.id = "heavy_diarreah")
      ) &&
      diagnosisData.selectedOptionList.some(
        (selectedOption) =>
          selectedOption.question === "คุณน้ำหนักลดลงอย่างรวดเร็วหรือเปล่า?" &&
          selectedOption.value === "yes"
      )
    ) {
      createCustomOptions({
        header: "มีอาการเหนื่อยง่าย มือสั่น คอพอก ตาโปน หัวใจเต้นเร็วกว่าปกติ",
        options: [{ name: "ใช่", value: "yes" }],
        nextDiagnosisPage: true,
      });
    }
  };

  const displayScreenType = (type) => {
    switch (type) {
      case "selectSymptom":
        return (
          <SelectSymptom
            symptomList={symptomList}
            selectedSymptomHandler={handleSelectSymtomPress}
            diagnosisData={diagnosisData}
          />
        );
      case "symptomLength":
        return (
          <SelectOptions
            headerText={`คุ��มีอา��าร${
              symptomList.find(
                (symptom) =>
                  symptom["id"] === diagnosisData.symptomList.slice(-1)[0]["id"]
              ).name
            }มานานแค่ไหนแล้ว?`}
            optionsList={symptomLengthList}
            onOptionPress={handleSymptomLengthPress}
          />
        );
      case "customOptions":
        return (
          <SelectOptions
            headerText={diagnosisData.options.at(-1).question}
            optionsList={diagnosisData.options}
            onOptionPress={handleCustomOptionPress}
          />
        );
      default:
    }
  };

  return (
    <RootContainer>
      {displayScreenType(screenType)}
      <CustomButton style={s.backButton} onPress={rewindSymptom}>
        <Text>กลับ</Text>
      </CustomButton>
    </RootContainer>
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

  backButton: {
    position: "absolute",
    bottom: 30,
    left: 30,
    backgroundColor: "#fdfdfd",
    padding: 20,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});

export default Diagnosis;
