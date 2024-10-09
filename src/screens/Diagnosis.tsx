import { useState, useCallback } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "../components/CustomButton";
import RootContainer from "../components/RootContainer";
import SelectSymptom from "../components/diagnosisPages/SelectSymptom";
import SelectOptions from "../components/diagnosisPages/SelectOptions";
import { diagnosisDataActions } from "../context/diagnosisDataSlice";

import {
  diagnosisDataType,
  screenType,
  symptom,
} from "../models/diagnosisTypes";
import { LearnMoreLinks } from "react-native/Libraries/NewAppScreen";

// const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

// const diagnosisData: diagnosisDataType = {
//   screenIndex: 0,
//   screenType: ["selectSymptom"],
//   options: [],
//   optionsSettings: { checklist: false, header: "", subheader: "" },
//   symptomList: [],
//   selectedOptionList: [],
// };

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

const Diagnosis = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const diagnosisData = useSelector((state) => state.diagnosisData);
  const [symptomList, setSymptomList] = useState<symptom[]>([
    {
      id: "heavy_diarrhea",
      name: "ท้องเสียหนัก",
      emoji: "💩",
      description:
        "การถ่ายอุจจาระเหลว หรือถ่ายเป็นน้ำ 4-5 ครั้งขึ้นไปภายใน 24ชม",
    },
    {
      id: "fever",
      name: "ไข้",
      emoji: "🤒",
      description:
        "ภาวะที่อุณหภูมิของร่างกายสูงกว่าปกติ บ่งบอกถึงการติดเชื้อหรืออาการอื่นๆ",
    },
  ]);
  const screenIndex: number = diagnosisData.screenIndex;
  const screenType: screenType = diagnosisData.screenType[screenIndex];

  const logDiagnosisData = () => {
    console.log(
      `
      --------------------------
      screenIndex: ${diagnosisData.screenIndex},
      screenType: ${diagnosisData.screenType},
      options: ${JSON.stringify(diagnosisData.options)},
      optionsSettings: ${JSON.stringify(diagnosisData.optionsSettings)},
      symptomList: ${JSON.stringify(diagnosisData.symptomList)},
      selectedOptionList: ${JSON.stringify(diagnosisData.selectedOptionList)}
      --------------------------
      `
    );
  };

  logDiagnosisData();

  const nextScreen = useCallback(
    (nextScreenType) => {
      dispatch(diagnosisDataActions.nextScreen(nextScreenType));
      props.navigation.push("diagnosis");
    },
    [dispatch, props.navigation]
  );

  //   props.navigation.push("diagnosis");
  // };

  // const addSymptom = (symptom, nextScreenType) => {
  //   diagnosisData.symptomList.push(symptom);
  // dispatch(diagnosisDataActions.nextScreen(nextScreenType));
  // };

  // const addSymptomLength = (length, nextScreenType) => {
  //   diagnosisData["symptomList"][screenIndex - 1]["length"] = length;
  //   nextScreen(nextScreenType);
  // };

  const navigationPush = (screen: string) => {
    props.navigation.navigate(screen);
  };

  const rewindSymptom = () => {
    if (screenIndex === 0) {
      Alert.alert(
        "คุณแน่ใจแล้วใช่ไหมว่าจะเลิกการประเมินครั้งนี้",
        "ถ้าคุณยกเลิกการประเมินครั้งนี้ ข้อมูลที่คุณกรอกไปจะถูกลบทิ้ง",
        [
          {
            text: "ยกเลิก",
            onPress: () => {
              navigation.goBack();
              dispatch(diagnosisDataActions.resetDiagnosis());
            },
          },
          {
            text: "ประเมินต่อ",
            style: "cancel",
          },
        ]
      );

      return;
    }

    const lastScreenType = diagnosisData["screenType"].at(-1);
    dispatch(diagnosisDataActions.rewindSymptom(lastScreenType));
    navigation.goBack();
  };

  const createCustomOptions = ({
    header,
    subheader,
    options,
    nextDiagnosisPage,
    checklist = false,
  }) => {
    options.forEach((option) => {
      option.question = header;
    });

    dispatch(
      diagnosisDataActions.setCustomOptions({
        header,
        subheader,
        options,
        checklist,
      })
    );

    if (nextDiagnosisPage) {
      nextScreen("customOptions");
    }
  };

  const handleSelectSymtomPress = (symptom) => {
    const id = symptom.id;

    switch (id) {
      case "heavy_diarrhea":
        dispatch(diagnosisDataActions.addSymptom(symptom));
        createCustomOptions({
          header: "คุณน้ำหนักลดลงอย่างรวดเร็วหรือเปล่า?",
          subheader: "",
          options: [
            { name: "ใช่", value: "yes" },
            { name: "ไม่", value: "no" },
          ],
          nextDiagnosisPage: true,
        });
    }
  };

  const handleSymptomLengthPress = (symptomLength) => {
    // addSymptomLength(symptomLength.value, "selectSymptom");
  };

  const handleCustomOptionPress = (option) => {
    console.log("Handling!");
    dispatch(diagnosisDataActions.selectOption(option));

    if (diagnosisData.selectedOptionList.length !== 0) {
      const latestSelectedOption = diagnosisData.selectedOptionList.at(-1);
      const latestSelectedSymptom = diagnosisData.symptomList.at(-1);

      switch (latestSelectedSymptom.id) {
        case "heavy_diarrhea":
          if (
            latestSelectedOption.question ===
            "คุณน้ำหนักลดลงอย่างรวดเร็วหรือเปล่า?"
          ) {
            if (latestSelectedOption.value === "yes")
              createCustomOptions({
                header: "จากอาการดังกล่าว มีอาการไหนตรงกับคุณไหม",
                subheader: "เลือกได้หลายอาการ",
                checklist: true,
                options: [
                  { name: "เหนื่อยง่าย", value: "เหนื่อยง่าย" },
                  { name: "มือสั่น", value: "มือสั่น" },
                  { name: "คอพอก", value: "คอพอก" },
                  { name: "ตาโพน", value: "ตาโพน" },
                  {
                    name: "หัวใจเต้นเร็วกว่าปกติ",
                    value: "หัวใจเต้นเร็วกว่าปกติ",
                  },
                ],
                nextDiagnosisPage: true,
              });
            if (latestSelectedOption.value === "no") {
              dispatch(diagnosisDataActions.addSymptom("selectSymptom"));
              nextScreen("selectSymptom");
            }
          }
          if (
            latestSelectedOption.question ===
            "จากอาการดังกล่าว มีอาการไหนตรงกับคุณไหม"
          ) {
            if (latestSelectedOption.value === ">= 2") {
              props.navigation.navigate("conclusions");
            }
            if (latestSelectedOption.value === "< 2") {
              createCustomOptions({
                header: "คุณกระหายน้ำและปัสสาวะบ่อยขึ้นหรือไม่",
                subheader: "",
                options: [
                  { name: "ใช่", value: "yes" },
                  { name: "ไม่", value: "no" },
                ],
                nextDiagnosisPage: true,
              });
            }
          }
      }
      if (
        latestSelectedOption.question ===
        "จากอาการดังกล่าว มีอาการไหนตรงกับคุณไหม"
      ) {
        if (latestSelectedOption.value === "no")
          createCustomOptions({
            header: "คุณกระหายน้ำและปัสสาวะบ่อยขึ้นหรือไม่",
            subheader: "",
            options: [
              { name: "ใช่", value: "yes" },
              { name: "ไม่", value: "no" },
            ],
            nextDiagnosisPage: true,
          });
      }
    }
  };

  const handleChecklistCompletion = (completeCheckList, headerText) => {
    let numberOfOptionsChecked = 0;
    completeCheckList.forEach((option) => {
      option.isChecked && numberOfOptionsChecked++;
    });

    console.log(numberOfOptionsChecked);
    if (numberOfOptionsChecked >= 2) {
      handleCustomOptionPress({
        name: "2 ขึ้นไป",
        value: ">= 2",
        question: headerText,
      });
    } else {
      handleCustomOptionPress({
        name: "น้อยกว่า 2",
        value: "< 2",
        question: headerText,
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
            optionsList={diagnosisData.options}
            optionsSettings={diagnosisData.optionsSettings}
            onOptionPress={handleCustomOptionPress}
            onChecklistCompletion={handleChecklistCompletion}
          />
        );
      default:
    }
  };

  return (
    <RootContainer>
      {displayScreenType(screenType)}
      <CustomButton style={s.backButton} onPress={rewindSymptom}>
        <Text style={{ fontFamily: "SemiBold" }}>กลับ</Text>
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
