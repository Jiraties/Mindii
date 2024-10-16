import { useState } from "react";
import { View, Text, StyleSheet, Alert, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import CustomButton from "../components/CustomButton";
import RootContainer from "../components/RootContainer";
import SelectSymptom from "../components/diagnosisPages/SelectSymptom";
import SelectOptions from "../components/diagnosisPages/SelectOptions";
import Conclusions from "./Conclusions";
import { conclusionActions } from "../context/conclusionSlice";
import LottieView from "lottie-react-native";

import {
  diagnosisDataType,
  diagnosisOption,
  screenType,
  symptom,
  symptomLength,
} from "../models/diagnosisTypes";
import { StackNavigation } from "../../App";

let diagnosisData: diagnosisDataType = {
  screenIndex: 0,
  screenType: ["selectSymptom"],
  options: [],
  optionsSettings: { checklist: false, header: "", subheader: "" },
  symptomList: [],
  selectedOptionList: [],
};

const symptomLengthList: symptomLength[] = [
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
    optionsSettings: ${JSON.stringify(diagnosisData.optionsSettings)},
    symptomList: ${JSON.stringify(diagnosisData.symptomList)},
    selectedOptionList: ${JSON.stringify(diagnosisData.selectedOptionList)}
    --------------------------
    `
  );
};

const Diagnosis: React.FC = (props) => {
  const navigation = useNavigation<StackNavigation>();
  const symptomList = [
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
    {
      id: "no_match",
      name: "กล่าวอาการไปหมดแล้ว",
      emoji: "✅",
      description: "ฉันได้กล่าวอาการไปหมดแล้ว",
    },
  ];
  const [conclusionsVisible, setConclusionsVisible] = useState<boolean>(false);
  const [conclusion, setConclusion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const screenIndex: number = diagnosisData.screenIndex;
  const screenType: screenType = diagnosisData.screenType[screenIndex];
  const dispatch = useDispatch();

  logDiagnosisData();

  const nextScreen = (nextScreenType: screenType) => {
    diagnosisData.screenType.push(nextScreenType);
    diagnosisData.screenIndex++;

    navigation.push("diagnosis");
  };

  const addSymptom = (symptom: symptom, nextScreenType: screenType) => {
    diagnosisData.symptomList.push(symptom);
    nextScreen(nextScreenType);
  };

  // const addSymptomLength = (length: symptomLength, nextScreenType: screenType) => {
  //   diagnosisData["symptomList"][screenIndex - 1]["length"] = length;
  //   nextScreen(nextScreenType);
  // };

  const resetDiagnosisData = () => {
    diagnosisData = {
      screenIndex: 0,
      screenType: ["selectSymptom"],
      options: [],
      optionsSettings: { checklist: false, header: "", subheader: "" },
      symptomList: [],
      selectedOptionList: [],
    };
  };

  const jumpToConclusions = (conclusionId: string) => {
    dispatch(
      conclusionActions.setDisplayConclusion({
        diseaseId: conclusionId,
        diagnosisData: diagnosisData,
      })
    );

    resetDiagnosisData();
    setLoading(true);
    setTimeout(() => {
      resetDiagnosisData();

      navigation.navigate("conclusions");
      setLoading(false);
    }, 2000);
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
              resetDiagnosisData();
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

    // Determine which screen type and remove previous information added
    switch (lastScreenType) {
      case "selectSymptom":
        diagnosisData.symptomList.splice(-1);
      case "symptomLength":
        delete diagnosisData.symptomList[diagnosisData.symptomList.length - 1];
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
    checklist = false,
  }) => {
    diagnosisData.options = options;
    options.at(-1).question = header;
    diagnosisData.optionsSettings = {
      checklist,
      header,
      subheader,
    };

    if (nextDiagnosisPage) nextScreen("customOptions");
  };

  const yesNoOptions = [
    { name: "ใช่", value: "yes" },
    { name: "ไม่", value: "no" },
  ];

  const handleSelectSymtomPress = (symptom) => {
    const id = symptom.id;
    const symptomList = diagnosisData.symptomList;

    switch (id) {
      case "heavy_diarrhea":
        addSymptom(symptom, "customOptions");
        createCustomOptions({
          header: "คุณน้ำหนักลดลงอย่างรวดเร็วหรือเปล่า?",
          subheader: "",
          options: yesNoOptions,
          nextDiagnosisPage: false,
        });

      case "fever":
        if (
          symptomList[0]["id"] === "heavy_diarrhea" &&
          symptom.id === "fever"
        ) {
          addSymptom(symptom, "customOptions");
          createCustomOptions({
            header: "ในช่วงหลายเดือนที่ผ่านมา คุณเคยเข้าป่าที่มียุงเยอะหรือไม่",
            subheader: "",
            options: yesNoOptions,
            nextDiagnosisPage: false,
          });
        }
    }
  };

  // const handleSymptomLengthPress = (symptomLength) => {
  //   addSymptomLength(symptomLength.value, "selectSymptom");
  // };

  const handleCustomOptionPress = (
    option: diagnosisOption,
    headerText: string
  ) => {
    option.question = headerText;
    diagnosisData.selectedOptionList.push(option);

    const latestSelectedSymptom = diagnosisData.symptomList.at(-1);
    const latest = diagnosisData.selectedOptionList.at(-1);

    if (!latestSelectedSymptom || !latest) {
      console.error("No symptoms or options available");
      return;
    }

    switch (latestSelectedSymptom.id) {
      case "heavy_diarrhea":
        if (latest.question === "คุณน้ำหนักลดลงอย่างรวดเร็วหรือเปล่า?") {
          if (latest.value === "yes")
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
          if (latest.value === "no") {
            nextScreen("selectSymptom");
          }
        }
        if (latest.question === "จากอาการดังกล่าว มีอาการไหนตรงกับคุณไหม") {
          if (latest.value === ">= 2") {
            jumpToConclusions("thyroid");
            // console.log("ต่อมไทรอยด์ ทำงานเกิน/ คอพอกเป็นพิษ หาหมอทันที");
            // navigation.navigate("conclusions");
          }
          if (latest.value === "< 2") {
            createCustomOptions({
              header: "คุณกระหายน้ำและปัสสาวะบ่อยขึ้นหรือไม่",
              subheader: "",
              options: yesNoOptions,
              nextDiagnosisPage: true,
            });
          }
        }
      case "fever":
        if (
          latest.question ===
          "ในช่วงหลายเดือนที่ผ่านมา คุณเคยเข้าป่าที่มียุงเยอะหรือไม่"
        ) {
          if (latest.value === "yes") jumpToConclusions("malaria");
        }
    }
    if (latest.question === "จากอาการดังกล่าว มีอาการไหนตรงกับคุณไหม") {
      if (latest.value === "no")
        createCustomOptions({
          header: "คุณกระหายน้ำและปัสสาวะบ่อยขึ้นหรือไม่",
          subheader: "",
          options: yesNoOptions,
          nextDiagnosisPage: true,
        });
    }
    if (latest.question === "คุณกระหายน้ำและปัสสาวะบ่อยขึ้นหรือไม่") {
      if (latest.value === "yes") {
        createCustomOptions({
          header:
            "ข่วงหลังคุณถ่ายเหลว,มีกลิ่นเหม็นมากหรือมีเลือดในอุจาระหรือไม่",
          subheader: "",
          options: yesNoOptions,
          nextDiagnosisPage: true,
        });
      }
    }
    if (
      latest.question ===
      "ข่วงหลังคุณถ่ายเหลว,มีกลิ่นเหม็นมากหรือมีเลือดในอุจาระหรือไม่"
    ) {
      if (latest.value === "yes") {
        jumpToConclusions("giardia");
      }
    }
  };

  const handleChecklistCompletion = (completeCheckList, headerText: string) => {
    let numberOfOptionsChecked = 0;
    completeCheckList.forEach((option) => {
      option.isChecked && numberOfOptionsChecked++;
    });

    if (numberOfOptionsChecked >= 2) {
      handleCustomOptionPress(
        { name: "2 ขึ้นไป", value: ">= 2", question: headerText },
        headerText
      );
    } else {
      handleCustomOptionPress(
        { name: "น้อยกว่า 2", value: "< 2", question: headerText },
        headerText
      );
    }
  };

  const displayScreenType = (type) => {
    if (loading)
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <LottieView
            source={require("../../assets/animations/findingAnimation.json")}
            style={{ width: 400, height: 400 }}
            autoPlay
          />
        </View>
      );

    switch (type) {
      case "selectSymptom":
        return (
          <SelectSymptom
            symptomList={symptomList}
            selectedSymptomHandler={handleSelectSymtomPress}
            diagnosisData={diagnosisData}
          />
        );
      // case "symptomLength":
      //   return (
      //     <SelectOptions
      //       headerText={`คุ��มีอา��าร${
      //         symptomList.find(
      //           (symptom) =>
      //             symptom["id"] === diagnosisData.symptomList.slice(-1)[0]["id"]
      //         ).name
      //       }มานานแค่ไหนแล้ว?`}
      //       optionsList={symptomLengthList}
      //       onOptionPress={handleSymptomLengthPress}
      //     />
      //   );
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
      <Modal
        visible={conclusionsVisible}
        presentationStyle="pageSheet"
        animationType="slide"
      >
        <Conclusions conclusionId={conclusion} />
      </Modal>
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
