import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Animated,
  Appearance,
  Image,
  Button,
  ImageBackground,
} from "react-native";
import { useRef, useEffect } from "react";
import { Skeleton } from "moti/skeleton";
import { SymbolView } from "expo-symbols";

import HomeListItem from "../components/HomeListItem";
import RootContainer from "../components/RootContainer";
import CustomButton from "../components/CustomButton";
import { Fonts, Shadows } from "../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

import { RootState } from "../context/store";
import { useNavigation } from "@react-navigation/native";
import PlanListItem from "../components/PlanListItem";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Home = (props) => {
  const navigation = useNavigation<any>();
  const username: any = useSelector<RootState>(
    (state) => state.authentication.userInformation.name
  );
  let mentalHealthQuoteText;

  useEffect(() => {
    const quotes: string[] = [
      "สุขภาพจิตดี เริ่มต้นที่การดูแลตัวเอง",
      "อย่าเก็บทุกอย่างไว้คนเดียว แบ่งปันความรู้สึกบ้างก็ได้นะ",
      "ทุกคนมีวันที่ไม่โอเคได้ อย่าลืมให้โอกาสตัวเองพักบ้าง",
      "ความเข้มแข็งไม่ได้แปลว่าต้องไม่ร้องไห้",
      "การขอความช่วยเหลือ ไม่ได้แปลว่าเราอ่อนแอ",
      "ใจดีกับตัวเองให้เท่ากับที่คุณใจดีกับคนอื่น",
      "แม้วันนี้จะยาก แต่พรุ่งนี้ก็อาจจะดีกว่า",
    ];

    mentalHealthQuoteText = quotes[Math.floor(Math.random() * 6)];
  }, []);

  return (
    <RootContainer>
      <ScrollView style={s.homeList} alwaysBounceVertical={false}>
        <View style={s.headerView}>
          <Text style={s.headerText}>สวัสดี,</Text>
          {username === "" ? (
            <Skeleton width={200} colorMode="light" />
          ) : (
            <Text style={s.headerTextHighlight}>{username}</Text>
          )}
        </View>

        {/* <ImageBackground
          resizeMode="cover"
          style={[{ borderRadius: 30, overflow: "hidden" }, s.homeListItem]}
          source={require("../../assets/images/mindiiMate.png")}
        >
          <View
            style={{
              shadowColor: "black",
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 20,
              shadowOpacity: 0.2,
            }}
          >
            <View style={[s.homeListItem, s.mate__wrapper]}>
              <Text style={s.mate__title}>Mindee Mate ✨</Text>
              <Text style={s.mate__description}>
                คู่หู AI ที่คุยเป็นเพื่อนช่วย Support คุณ
              </Text>
              <CustomButton
                style={s.mate__button}
                pressedStyle={{ backgroundColor: "#efefef" }}
                onPress={() => navigation.navigate("mate")}
              >
                <Text style={s.mate__buttonText}>ลองคุยกับ Mindii Mate</Text>
                <SymbolView
                  style={s.mate__buttonIcon}
                  name="arrow.right"
                  tintColor="#5271ff"
                ></SymbolView>
              </CustomButton>
              </View>
              </View>
              </ImageBackground> */}

        <HomeListItem
          text="ประเมินสุขภาพจิต"
          button="เริ่มเลย!"
          image
          redirectTo="diagnosis"
          warningModal
        />

        <View
          style={{
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 20,
            shadowOpacity: 0.2,
          }}
        >
          <View style={[s.homeListItem, s.wellnessDashboardWrapper]}>
            <View style={s.wellnessDashboardHeader}>
              <Text style={s.wellnessDashboardHeader__text}>แผนสัปดาห์แรก</Text>
            </View>
            <PlanListItem
              title="Guided Breathing Exercise"
              description="ฝึกหายใจอย่างมีสติพร้อมคำแนะนำ เพื่อช่วยให้คุณรู้สึกผ่อนคลายและสงบขึ้น"
              icon="wind"
              redirectTo="breathingExercise"
            />

            <PlanListItem
              title="Bedtime Journal"
              description="ทำความเข้าใจ กับปัจจัยที่ทำให้คุณไม่สบายใจ"
              icon="powersleep"
              redirectTo="journal"
            />

            <PlanListItem
              title="Wellness Hub"
              description="ยินดีต้อนรับสู่แหล่งคอนเท้นต์ด้าน Mindfulness"
              icon="figure.mind.and.body"
              redirectTo="wellnessHub"
            />
          </View>
        </View>

        <View
          style={{
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 20,
            shadowOpacity: 0.2,
          }}
        >
          <View style={[s.homeListItem, s.quoteWrapper]}>
            <Text style={s.quoteText}>
              "
              {
                [
                  "สุขภาพจิตดี เริ่มต้นที่การดูแลตัวเอง",
                  "อย่าเก็บทุกอย่างไว้คนเดียว แบ่งปันความรู้สึกบ้างก็ได้",
                  "ทุกคนมีวันที่ไม่โอเคได้ อย่าลืมให้โอกาสตัวเองพักบ้าง",
                  "ความเข้มแข็งไม่ได้แปลว่าต้องไม่ร้องไห้",
                  "การขอความช่วยเหลือ ไม่ได้แปลว่าเราอ่อนแอ",
                  "ใจดีกับตัวเองให้เท่ากับที่คุณใจดีกับคนอื่น",
                  "แม้วันนี้จะยาก แต่พรุ่งนี้ก็อาจจะดีกว่า",
                ][Math.floor(Math.random() * 6)]
              }
              "
            </Text>
          </View>
        </View>

        {/* <HomeListItem
          text="ดูประวัติการประเมินโรคของคุณ "
          button="ไป"
          image={false}
          redirectTo="history"
        /> */}
      </ScrollView>
      <StatusBar style="auto" />
    </RootContainer>
  );
};

const s = StyleSheet.create({
  homeListItem: {
    width: "100%",
    backgroundColor: "#fdfdfd",
    borderRadius: 30,
    marginBottom: 20,
    overflow: "hidden",
  },
  rootContainer: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    padding: 20,
    paddingTop: 20,
  },
  headerText: {
    marginTop: 70,
    fontSize: 40,
    fontFamily: Fonts.regular,
  },
  headerTextHighlight: {
    fontSize: 40,
    color: "#5271ff",
    fontFamily: Fonts.regular,
    lineHeight: 55,
  },
  homeList: {
    marginTop: 20,
    overflow: "visible",
  },
  homeList__ipad: {
    marginTop: 30,
    overflow: "visible",
    flexDirection: "row",
    height: 175,
    gap: 20,
  },
  headerView: {
    marginBottom: 30,
    overflow: "visible",
  },
  quoteText: {
    fontFamily: Fonts.regular,
    margin: 20,
    color: "#5271ff",
  },
  quoteWrapper: {
    backgroundColor: "#C5CFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  wellnessDashboardWrapper: {},
  wellnessDashboardHeader: {
    backgroundColor: "#C5CFFF",
    padding: 20,
  },
  wellnessDashboardHeader__text: {
    fontSize: 18,
    fontFamily: Fonts.regular,
  },

  homeListItem__button: {
    backgroundColor: "#5271ff",
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    zIndex: 2,
  },
  homeListItem__buttonText: {
    color: "#fff",
    fontFamily: Fonts.regular,
  },
  homeListItem__buttonPressed: {
    backgroundColor: "#2533b3",
    elevation: 1,
    ...Shadows.default,
  },
  mate__wrapper: {
    padding: 20,
    backgroundColor: "rgb(255, 255, 255, 0.9)",
    overflow: "hidden",
    borderRadius: 30,
    justifyContent: "center",
    // backgroundColor: "#C5CFFF",
    // gap: 5,
  },
  mate__title: {
    color: "#fff",
    fontSize: 20,
    fontFamily: Fonts.regular,
  },
  mate__description: {
    color: "#fff",
    fontFamily: Fonts.regular,
    marginBottom: 50,
    lineHeight: 20,
    width: "40%",
  },
  mate__button: {
    width: "100%",
    backgroundColor: "#fdfdfd",
    padding: 17,
    borderRadius: 30,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    // shadowOpacity: 0.05,
  },
  mate__buttonText: {
    fontFamily: Fonts.regular,
  },
  mate__buttonIcon: {
    position: "absolute",
    right: 17,
    top: 17,
  },
});

export default Home;
