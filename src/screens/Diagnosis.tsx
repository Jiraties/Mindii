import { useState } from "react";
import { View, Text, StyleSheet, Alert, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import CustomButton from "../components/CustomButton";
import RootContainer from "../components/RootContainer";
import SelectSymptom from "../components/diagnosisPages/SelectSymptom";
import SelectOptions from "../components/diagnosisPages/SelectOptions";
import Conclusions from "./Conclusions";
import LottieView from "lottie-react-native";
import DiagnosisIntro from "../components/DiagnosisIntro";
import { ErrorBoundary } from "react-error-boundary";
import { conclusionActions } from "../context/conclusionSlice";
import { Fonts } from "../constants/styles";
import { StackNavigation } from "../../App";
import { RootState } from "../context/store";
import {
  diagnosisDataType,
  diagnosisOption,
  screenType,
  symptom,
  symptomLength,
} from "../models/diagnosisTypes";

let diagnosisData: diagnosisDataType = {
  screenIndex: 0,
  screenType: ["diagnosisIntro"],
  options: [],
  optionsSettings: { checklist: false, header: "", subheader: "" },
  latestQuestion: "",
  scoring: {
    somatic: 0,
    anxietyAndInsomnia: 0,
    socialDysfunction: 0,
    severeDepression: 0,
  },
};

const logDiagnosisData = () => {
  console.log(diagnosisData);
  // console.log(
  //   `
  //   --------------------------
  //   screenIndex: ${diagnosisData.screenIndex},
  //   screenType: ${diagnosisData.screenType},
  //   options: ${JSON.stringify(diagnosisData.options)},
  //   optionsSettings: ${JSON.stringify(diagnosisData.optionsSettings)},
  //   symptomList: ${JSON.stringify(diagnosisData.symptomList)},
  //   selectedOptionList: ${JSON.stringify(diagnosisData.selectedOptionList)}
  //   points:
  //   --------------------------
  //   `
  // );
};

const ghq28Questions = [
  {
    question: "ช่วงนี้รู้สึกปวดหัว ปวดตัว หรือไม่ค่อยสบายบ่อยไหม? 🤕",
    category: "somatic",
  },
  {
    question: "รู้สึกเหนื่อยง่าย เหมือนพลังหมดไวกว่าเดิมมั้ย? 😩",
    category: "somatic",
  },
  {
    question: "ช่วงนี้รู้สึกไม่ค่อยสบายตัว แบบไม่รู้ว่าเป็นไรมั้ย? 🤒",
    category: "somatic",
  },
  {
    question: "รู้สึกว่าร่างกายแปลก ๆ แต่หมอตรวจไม่เจอว่าเป็นไรเลยมั้ย 🧪",
    category: "somatic",
  },
  {
    question: "เครียดง่าย ตื่นเต้นบ่อย หรือกังวลแบบไม่มีเหตุผลมั้ย? 😰",
    category: "anxietyAndInsomnia",
  },
  {
    question: "นอนไม่ค่อยหลับ ตื่นกลางดึก ฝันร้ายอะไรพวกนี้บ่อย? 😴",
    category: "anxietyAndInsomnia",
  },
  {
    question: "อยู่ไม่สุข รู้สึกกระสับกระส่ายแบบไม่รู้จะทำอะไรดี? 😵‍💫",
    category: "anxietyAndInsomnia",
  },
  {
    question: "รู้สึกกลัวหรือระแวงแบบไม่มีเหตุผลบ้างมั้ย? 😨",
    category: "anxietyAndInsomnia",
  },
  {
    question: "ตัดสินใจเรื่องง่าย ๆ ในชีวิตประจำวันได้สบายๆไม่ได้ไหม? 🤔",
    category: "socialDysfunction",
  },
  {
    question: "รู้สึกทำงานหรือเรียนได้มีประสิทธิภาพเหมือนเดิมมั้ย? 📚",
    category: "socialDysfunction",
  },
  {
    question: "ทำสิ่งที่เคยทำได้เหมือนเดิม หรือรู้สึกช้าลงหน่อยไหม? 💪",
    category: "socialDysfunction",
  },
  {
    question: "ยังรู้สึก enjoy กับกิจวัตรประจำวันอยู่? 😊",
    category: "socialDysfunction",
  },
  {
    question: "รู้สึกเศร้า ๆ หรือไม่มีความสุขติด ๆ กันบ้างมั้ย? 😔",
    category: "severeDepression",
  },
  {
    question:
      "เคยรู้สึกว่าทุกอย่างมันไม่มีความหมาย หรือไม่เห็นคุณค่าตัวเองมั้ย? 💭",
    category: "severeDepression",
  },
  {
    question: "เคยมีความคิดว่าไม่อยากอยู่ต่อ หรือชีวิตมันไม่มีความหมายมั้ย? 🖤",
    category: "severeDepression",
  },
  {
    question: "รู้สึกหมดหวังกับอนาคตของตัวเองบ้างรึเปล่า? 🌧️",
    category: "severeDepression",
  },
];

const Diagnosis = (props) => {
  const navigation = useNavigation<StackNavigation>();
  const symptomList = [];
  const [conclusionsVisible, setConclusionsVisible] = useState<boolean>(false);
  const [conclusion, setConclusion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const screenIndex: number = diagnosisData.screenIndex;
  const screenType: screenType = diagnosisData.screenType[screenIndex];
  const userUid = useSelector<RootState>((state) => state.authentication.uid);
  const userInfo = useSelector<RootState, { birthday: string }>(
    (state) => state.authentication.userInformation as { birthday: string }
  );
  const dispatch = useDispatch<any>();

  logDiagnosisData();

  const nextScreen = (nextScreenType: screenType) => {
    diagnosisData.screenType.push(nextScreenType);
    diagnosisData.screenIndex++;

    props.navigation.push("diagnosis");
  };

  const resetDiagnosisData = () => {
    diagnosisData = {
      screenIndex: 0,
      screenType: ["diagnosisIntro"],
      options: [],
      optionsSettings: { checklist: false, header: "", subheader: "" },
      latestQuestion: "",
      scoring: {
        somatic: 0,
        anxietyAndInsomnia: 0,
        socialDysfunction: 0,
        severeDepression: 0,
      },
    };
  };

  const jumpToConclusions = () => {
    dispatch(
      conclusionActions.setDisplayConclusion({
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

  const onContinue = () => {
    nextScreen("customOptions");
    createMentalHealthQuestion(
      "ช่วงนี้รู้สึกปวดหัว ปวดตัว หรือไม่ค่อยสบายบ่อยไหม? 🤕",
      false
    );
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
    diagnosisData.latestQuestion = header;

    if (nextDiagnosisPage) nextScreen("customOptions");
  };

  const createMentalHealthQuestion = (question, nextDiagnosisPage = true) => {
    createCustomOptions({
      header: question,
      subheader: "",
      nextDiagnosisPage: nextDiagnosisPage,
      checklist: false,
      options: [
        { name: "🙅‍♂️ ไม่เลย", value: 0 },
        { name: "💁‍♂️ เหมือนเดิม", value: 1 },
        { name: "🙂‍↕️ มากกว่าปกติเล็กน้อย", value: 2 },
        { name: "🙋‍♂️ มากกว่าปกติมาก", value: 3 },
      ],
    });
  };

  const handleCustomOptionPress = (
    option: diagnosisOption,
    headerText: string
  ) => {
    option.question = headerText;

    const latest = { question: diagnosisData.latestQuestion };

    if (screenIndex !== 16) {
      diagnosisData.scoring[ghq28Questions[screenIndex]["category"]] +=
        option.value;
      createMentalHealthQuestion(ghq28Questions[screenIndex]["question"]);
    } else {
      jumpToConclusions();
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
      case "diagnosisIntro":
        return <DiagnosisIntro onContinue={onContinue} />;
      case "customOptions":
        return (
          <SelectOptions
            optionsList={diagnosisData.options}
            optionsSettings={diagnosisData.optionsSettings}
            onOptionPress={handleCustomOptionPress}
          />
        );
      default:
    }
  };

  return (
    <ErrorBoundary fallback={<Text>404</Text>}>
      <RootContainer>
        <Modal
          visible={conclusionsVisible}
          presentationStyle="pageSheet"
          animationType="slide"
        >
          <Conclusions conclusionId={conclusion} />
        </Modal>
        {displayScreenType(screenType)}

        <CustomButton
          style={s.backButton}
          onPress={() => {
            Alert.alert(
              "คุณแน่ใจแล้วใช่ไหมว่าจะเลิกการประเมินครั้งนี้",
              "ถ้าคุณยกเลิกการประเมินครั้งนี้ ข้อมูลที่คุณกรอกไปจะถูกลบทิ้ง",
              [
                {
                  text: "ยกเลิก",
                  onPress: () => {
                    navigation.popToTop();
                    resetDiagnosisData();
                  },
                },
                {
                  text: "ประเมินต่อ",
                  style: "cancel",
                },
              ]
            );
          }}
        >
          <Text style={{ fontFamily: Fonts.regular }}>ออก</Text>
        </CustomButton>

        <View
          style={[s.progressBar, { width: `${(screenIndex / 16) * 100}%` }]}
        />
      </RootContainer>
    </ErrorBoundary>
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
  loadingText: {
    fontFamily: Fonts.regular,
  },
  progressBar: {
    height: 5,
    backgroundColor: "#5271ff",
    position: "absolute",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    top: 0,
    left: 0,
  },
});

export default Diagnosis;
