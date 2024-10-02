import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../components/CustomButton";
import RootContainer from "../components/RootContainer";
import SelectSymptom from "../components/diagnosisPages/SelectSymptom";

// const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const diagnosisData = {
  screenIndex: 0,
  screenType: ["selectSymptom"],
  symptomList: [],
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
const symptomList = [
  {
    id: "fever",
    name: "🤒 ไข้",
    description:
      "ภาวะที่อุณหภูมิของร่างกายสูงกว่าปกติ บ่งบอกถึงการติดเชื้อหรืออาการอื่นๆ",
  },
  {
    id: "runny_nose",
    name: "🤧 น้ำมูกไหล",
    description: "เกิดจากการอักเสบของเยื่อบุจมูก มักเกิดจากการแพ้หรือหวัด",
  },
  {
    id: "cough",
    name: "😷 ไอ",
    description: "การตอบสนองของร่างกายต่อสิ่งแปลกปลอมในทางเดินหายใจ",
  },
  {
    id: "headache",
    name: "🤕 ปวดหัว",
    description:
      "รู้สึกปวดบริเวณศีรษะ อาจเกิดจากความเครียด ไมเกรน หรือภาวะอื่นๆ",
  },
  {
    id: "chills",
    name: "🤒 หนาวสั่น",
    description: "อาการที่รู้สึกหนาวและสั่น ร่วมกับมีไข้สูง",
  },
  {
    id: "nausea",
    name: "🤢 คลื่นไส้",
    description: "ความรู้สึกไม่สบายในกระเพาะอาหาร ที่อาจนำไปสู่อาเจียน",
  },
  {
    id: "stomach_pain",
    name: "🤕 ปวดท้อง",
    description: "อาการปวดหรือไม่สบายในช่องท้อง อาจเกิดจากปัญหาทางเดินอาหาร",
  },
  {
    id: "fatigue",
    name: "😴 อ่อนเพลีย",
    description:
      "รู้สึกเหนื่อยล้า ไม่มีพลังงาน อาจเกิดจากการนอนน้อยหรือความเครียด",
  },
  {
    id: "sore_throat",
    name: "🤒 เจ็บคอ",
    description: "รู้สึกเจ็บหรือแสบคอ มักเป็นอาการของการติดเชื้อในลำคอ",
  },
  {
    id: "ear_congestion",
    name: "👂 หูอื้อ",
    description:
      "ความรู้สึกเหมือนมีสิ่งอุดกั้นในหู อาจเกิดจากการติดเชื้อหรือเปลี่ยนความดันอากาศ",
  },
  // {
  //   id: "a",
  //   name: "🍆 โดนถู!!!",
  //   description:
  //     "ความรู้สึกเหมือนมีสิ่งอุดกั้นในหู อาจเกิดจากการติดเชื้อหรือเปลี่ยนความดันอากาศ",
  // },
];

const Diagnosis = (props) => {
  const navigation = useNavigation();
  const screenIndex = diagnosisData.screenIndex;
  const screenType = diagnosisData.screenType[screenIndex];
  const previousScreenType = diagnosisData.screenType[screenIndex - 1];

  console.log(`--------------------`);
  console.log(diagnosisData);

  const addSymptom = (symptom, nextScreenType) => {
    diagnosisData.symptomList.push(symptom);
    diagnosisData.screenType.push(nextScreenType);
    diagnosisData.screenIndex++;
  };

  const addSymptomLength = (length, nextScreenType) => {
    diagnosisData["symptomList"][screenIndex - 1]["length"] = length; // FIX ERROR
    diagnosisData.screenType.push(nextScreenType);
    diagnosisData.screenIndex++;
  };

  const rewindSymptom = () => {
    const lastScreenIsSymptomLength =
      diagnosisData["screenType"][screenIndex - 1] === "symptomLength";

    if (lastScreenIsSymptomLength) {
      delete diagnosisData.symptomList[diagnosisData.symptomList.length - 1]
        .length;

      diagnosisData.screenType.splice(-1);
      diagnosisData.screenIndex--;
      console.log(diagnosisData);
      navigation.goBack();
      return;
    }
    if (diagnosisData.screenIndex > 0 && !lastScreenIsSymptomLength) {
      diagnosisData.symptomList.splice(-1);
      diagnosisData.screenType.splice(-1);
      diagnosisData.screenIndex--;
    }

    console.log(diagnosisData);
    navigation.goBack();
  };

  const selectedSymptomHandler = (symptom) => {
    if (symptom.id === "fever") {
      addSymptom(symptom, "symptomLength");
    } else {
      addSymptom(symptom, "selectSymptom");
    }

    navigation.push("diagnosis");
  };

  const selectedSymptomLengthHandler = (symptomLengthValue) => {
    addSymptomLength(symptomLengthValue, "selectSymptom");
    navigation.push("diagnosis");
  };

  return (
    <RootContainer>
      {screenType === "selectSymptom" && (
        <SelectSymptom
          symptomList={symptomList}
          selectedSymptomHandler={selectedSymptomHandler}
          diagnosisData={diagnosisData}
        />
      )}
      {screenType === "symptomLength" && (
        <>
          <Text style={s.headerText}>
            คุณมีอาการ
            {symptomList.find(
              (symptom) =>
                symptom["id"] ===
                (previousScreenType === "symptomLength"
                  ? diagnosisData.symptomList[screenIndex - 1][
                      "name"
                    ].substring(3)
                  : diagnosisData.symptomList[screenIndex - 1][
                      "name"
                    ].substring(3))
            )}
            มานานแค่ไหนแล้ว?
          </Text>

          <View style={s.optionList}>
            {symptomLengthList.map((symptomLength) => (
              <CustomButton
                style={s.optionItem}
                onPress={() =>
                  selectedSymptomLengthHandler(symptomLength.value)
                }
                key={symptomLength.value}
              >
                <Text>{symptomLength.name}</Text>
              </CustomButton>
            ))}
          </View>
        </>
      )}
      {/* <BlurView style={s.bottomBar} intensity={100}>
        <Text>Progress</Text>
      </BlurView> */}
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
  // bottomBar: {
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   width: screenWidth,
  //   padding: 30,
  // },
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

export default Diagnosis;
