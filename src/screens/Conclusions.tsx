import LottieView from "lottie-react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { Skeleton } from "moti/skeleton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import RootContainer from "../components/RootContainer";
import CustomButton from "../components/CustomButton";
import { RootState } from "../context/store";
import { conclusion } from "../models/conclusionTypes";
import { StackNavigation } from "../../App";
import { Shadows, Fonts } from "../constants/styles";
import { SymbolView } from "expo-symbols";
import { ProgressTransitionManager } from "react-native-reanimated/lib/typescript/layoutReanimation";

const Conclusions: React.FC<{ conclusionId: string }> = (props) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const navigation = useNavigation<StackNavigation>();
  const navigationRouteHistory = useNavigationState((state) => state.routes);

  const diagnosisData = useSelector(
    (state: RootState) => state.conclusion.displayConclusion.diagnosisData
  );
  const scoring = diagnosisData.scoring;

  const previousScreenName =
    navigationRouteHistory[navigationRouteHistory.length - 2].name;

  console.log(diagnosisData);

  const totalScore =
    scoring.anxietyAndInsomnia +
    scoring.severeDepression +
    scoring.socialDysfunction +
    scoring.somatic;

  let recommendedFeature = {
    name: "",
    description: "",
    points: 100,
  };

  const highestKey = Object.keys(scoring).reduce((a, b) =>
    scoring[a] > scoring[b] ? a : b
  );

  switch (highestKey) {
    case "anxietyAndInsomnia":
      recommendedFeature = {
        name: "Mindii Mate",
        description: "คู่หู AI ที่คุยเป็นเพื่อนช่วย Support คุณ",
        points: 100,
      };
      break;
    case "severeDepression":
      recommendedFeature = {
        name: "Bedtime Journal",
        description: "การเขียน journal ก่อนนอนเพื่อลดความเครียด",
        points: 100,
      };
      break;
    case "socialDysfunction":
      recommendedFeature = {
        name: "Wellness Hub",
        description: "แหล่งรวมวิดีโอและเนื้อหาเพื่อช่วยคุณฟื้นฟูใจ",
        points: 100,
      };
      break;
    case "somatic":
      recommendedFeature = {
        name: "Guided Breathing",
        description: "ฝึกหายใจเพื่อลดอาการทางกาย เช่น อ่อนเพลียหรือปวดหัว",
        points: 100,
      };
      break;
  }

  let programs = [
    {
      name: "Mindii Mate",
      description: "คู่หู AI ที่คุยเป็นเพื่อนช่วย Support คุณ",
      points: 80,
    },
    {
      name: "Wellness Hub",
      description: "แหล่งรวมวิดีโอและเนื้อหาเพื่อช่วยคุณฟื้นฟูใจ",
      points: 80,
    },
    {
      name: "Guided Breathing",
      description: "ฝึกหายใจเพื่อลดอาการทางกาย เช่น อ่อนเพลียหรือปวดหัว",
      points: 80,
    },
    {
      name: "Bedtime Journal",
      description: "การเขียน journal ก่อนนอนเพื่อลดความเครียด",
      points: 80,
    },
  ];

  let text = {
    header: "",
    description: "",
  };

  if (totalScore <= 12) {
    text.header = "สุขภาพจิตของคุณอยู่ในเกณฑ์ที่ดี 🎉";
    text.description = "";
  } else if (totalScore <= 24) {
    text.header = "พบว่าคุณอาจมีความเครียดหรือความกังวลในระดับหนึ่ง 💙";
    text.description =
      "ลองให้เวลากับตัวเองในการพักผ่อน ออกกำลังกาย หรือทำกิจกรรมที่ช่วยให้รู้สึกผ่อนคลาย หากรู้สึกว่าความเครียดเริ่มส่งผลต่อชีวิตประจำวัน การพูดคุยกับคนที่คุณไว้ใจหรือผู้เชี่ยวชาญอาจเป็นทางเลือกที่ดีค่ะ 😊";
  } else if (totalScore <= 36) {
    text.header = "คุณอาจกำลังเผชิญกับความเครียดหรือความกดดันมากกว่าปกติ 💛";
    text.description = "";
  } else if (totalScore <= 48) {
    text.header =
      "คุณอาจกำลังเผชิญกับความเครียดหรือความกังวลที่ส่งผลต่อสุขภาพใจ ❤️";
    text.description = "";
  }

  return (
    <RootContainer>
      <ScrollView style={{ overflow: "visible" }}>
        <View style={s.conclusionsRootContainer}>
          <View>
            <Text style={s.headerText}>จากแบบประเมิน</Text>
            <Text style={s.headerTextHighlight}>{text.header}</Text>
          </View>

          <View style={s.animation__wrapper}>
            <LottieView
              source={require("../../assets/animations/complete.json")}
              style={{ alignItems: "center", width: 160, height: 160 }}
              autoPlay
              loop={false}
            />
          </View>
          <Text style={s.descriptionText}>{text.description}</Text>

          <Text style={s.programRecommendations__text}>
            Feature ที่เราแนะนำสำหรับคุณ
          </Text>
          <View style={[s.programRecommendations]}>
            <View style={s.programRecommendations__item}>
              <View style={{ flex: 3 }}>
                <Text
                  style={[
                    s.programRecommendations__itemHeader,
                    { color: "#5271ff" },
                  ]}
                >
                  {recommendedFeature.name}
                </Text>
                <Text style={[s.programRecommendations__itemDesc]}>
                  {recommendedFeature.description}
                </Text>
              </View>

              <View style={s.programRecommendations__score}></View>
            </View>
          </View>

          <Text style={s.programRecommendations__text}>Feature อื่นๆ</Text>
          <View style={s.programRecommendations}>
            {programs.map((program, index) => (
              <View
                key={index}
                style={[
                  s.programRecommendations__item,
                  {
                    borderBottomWidth: index !== programs.length - 1 ? 1 : 0,
                    borderBottomColor: "#eee",
                  },
                ]}
              >
                <View style={{ flex: 3 }}>
                  <Text style={s.programRecommendations__itemHeader}>
                    {program.name}
                  </Text>
                  <Text style={s.programRecommendations__itemDesc}>
                    {program.description}
                  </Text>
                </View>

                <View style={s.programRecommendations__score}>
                  {program.name === recommendedFeature.name && (
                    <SymbolView
                      name="star.fill"
                      tintColor="#5271ff"
                      size={30}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <CustomButton
        style={s.returnButton}
        onPress={() => {
          if (previousScreenName === "diagnosis") navigation.popToTop();
          else navigation.goBack();
        }}
      >
        <Text style={s.returnButton__text}>กลับ</Text>
      </CustomButton>
    </RootContainer>
  );
};

const s = StyleSheet.create({
  animation__wrapper: {
    borderRadius: 30,
    height: 150,
    backgroundColor: "#5271ff",
    alignItems: "center",
    ...Shadows.light,
  },
  conclusionsRootContainer: {
    flexDirection: "column",
    gap: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: Fonts.regular,
  },
  headerTextHighlight: {
    fontSize: 30,
    // color: "blue",
    fontFamily: Fonts.regular,
  },
  conclusionsTag: {
    backgroundColor: "#f54254",
    padding: 10,
    borderRadius: 10,
    marginRight: "auto",
  },
  conclusionsTag__text: {
    color: "#fcdcdf",
    fontFamily: Fonts.regular,
  },
  image: {
    height: 250,
    borderRadius: 30,
    ...Shadows.default,
  },
  descriptionText: {
    fontFamily: Fonts.regular,
  },
  remedies: {
    backgroundColor: "#fdfdfd",
    borderRadius: 20,
    gap: 10,
    ...Shadows.default,
  },
  remedies__text: {
    fontFamily: Fonts.regular,
  },
  remedies__icon: {
    height: 20,
    width: 20,
  },
  returnButton: {
    backgroundColor: "#fdfdfd",
    position: "absolute",
    bottom: 30,
    left: 30,
    padding: 20,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  returnButton__text: {
    color: "#000",
    fontFamily: Fonts.regular,
  },
  link: {
    width: "100%",
    backgroundColor: "#5271ff",
    padding: 20,
    borderRadius: 20,
    ...Shadows.default,
    alignItems: "center",
    marginBottom: 50,
  },
  link__text: {
    color: "#fff",
    fontFamily: Fonts.regular,
  },
  programRecommendations: {
    backgroundColor: "#fdfdfd",
    borderRadius: 30,
    width: "100%",

    ...Shadows.default,
  },
  programRecommendations__item: {
    padding: 20,
    flexDirection: "row",
    gap: 10,
  },
  programRecommendations__itemHeader: {
    fontFamily: Fonts.regular,
    fontSize: 20,
  },
  programRecommendations__itemDesc: {
    fontFamily: Fonts.regular,
  },
  programRecommendations__text: {
    fontFamily: Fonts.regular,
    fontSize: 20,
  },
  programRecommendations__score: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
});

export default Conclusions;
