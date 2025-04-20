import { StyleSheet, Image, View, Text, ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

import RootContainer from "../components/RootContainer";
import CustomButton from "../components/CustomButton";
import { Fonts, Shadows } from "../constants/styles";
import { SymbolView } from "expo-symbols";
import { useNavigation } from "@react-navigation/native";

const storyInfo = [
  {
    background: require("../../assets/images/story/bangkok.jpg"),
    character: require("../../assets/images/story/ton.png"),
    bubbleText: "สวัสดี เราชื่อต้น",
    explaination:
      "ต้น เด็กนักเรียนธรรมดา อายุ 16 ปีอาศัยอยู่กรุงเทพตั้งแต่เกิดและมีนิสัยชอบช่วยเหลือผู้อื่น",
  },
  {
    background: require("../../assets/images/story/bangkok.jpg"),
    character: require("../../assets/images/story/tonSurprised.png"),
    characterBack: require("../../assets/images/story/magic.png"),
    bubbleText: "ฮ๊ะ นี่มันอะไรกัน",
    explaination:
      "แต่แล้ววันหนึ่ง...ต้นได้ถูกอัญเชิญไปโลกสุขภาพจิต ณ หมู่บ้านแห่งหนึ่งโดยมินดี้ ",
  },
  {
    background: require("../../assets/images/story/isekai.png"),
    character: require("../../assets/images/story/tonSurprised.png"),
    character2: require("../../assets/images/story/mindiiMagic.png"),
    bubbleText: "เรามาที่นี่ได้ไงเนีย",
    bubbleText2:
      "ว่าไงต้น เราชื่อมินดี้นายถูกเราอัญเชิญมาโลกนี้เพื่อสู้กับจอมมาร Drogon",
    characters: 2,
    explaination:
      "โลกแห่งสุขภาพจิตนี้ ผู้คนมีชีวิตรอดโดยการรักษาพลังสุขภาพจิตของตัวเอง",
  },
  {
    background: require("../../assets/images/story/drogonAttack.png"),
    bubbleText: "",
    explaination:
      "แต่แล้ว ณ หมู่บ้านแห่งหนึ่ง... จอมมารตนหนึ่งกำลังแย่งชิงพลัง สุขภาพจิตจากผู้หญิงคนหนึ่งไป... ด้วยความกล้าต้นเลยวิ่งเข้าไปช่วย",
  },
];

const continuedStory = [
  {
    background: require("../../assets/images/story/killed.png"),
    bubbleText: "",
    explaination:
      "ที่แท้จริงผู้หญิงที่ต้นชวยคือเจ้าหญิงแห่งอาณาจักร์สุขภาพจิตแต่ถึงอย่างนั้นเรื่องก็ยังไม่ได้จบแค่นี้...",
  },
];

const Story = (props) => {
  const [storyIndex, setStoryIndex] = useState(0);
  const navigation = useNavigation();
  const bubbleY = useSharedValue(0);

  useEffect(() => {
    bubbleY.value = withRepeat(
      withTiming(-10, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const bubbleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bubbleY.value }],
  }));

  const handleNext = () => {
    if (storyIndex < storyInfo.length - 1) {
      setStoryIndex((prev) => prev + 1);
    } else {
      props.storyIsDone(true);
    }
  };

  const handleBack = () => {
    if (storyIndex - 1 >= 0) {
      setStoryIndex((prev) => prev - 1);
    }
  };

  const currentStory = storyInfo[storyIndex];
  const multipleCharacters = currentStory.characters;

  return (
    <RootContainer padding={false} style={{ gap: 0 }}>
      <View style={s.scene}>
        <ImageBackground style={s.background} source={currentStory.background}>
          {currentStory.characterBack && (
            <Image
              source={currentStory.characterBack}
              style={s.character__back}
            />
          )}

          {currentStory.character && (
            <Image
              source={currentStory.character}
              style={[s.character, multipleCharacters && s.character__left]}
            />
          )}

          {multipleCharacters && currentStory.character2 && (
            <Image
              source={currentStory.character2}
              style={[s.character, s.character__right]}
            />
          )}

          {currentStory.bubbleText && (
            <Animated.View
              style={[
                s.chat__bubble,
                bubbleStyle,
                multipleCharacters && s.chat__bubbleLeft,
              ]}
            >
              <Text style={s.chat__bubbleText}>{currentStory.bubbleText}</Text>
            </Animated.View>
          )}

          {multipleCharacters && currentStory.bubbleText2 && (
            <Animated.View
              style={[s.chat__bubble, s.chat__bubbleRight, bubbleStyle]}
            >
              <Text style={s.chat__bubbleText}>{currentStory.bubbleText2}</Text>
            </Animated.View>
          )}
        </ImageBackground>
      </View>

      <View style={s.explaination}>
        <Text style={s.explaination__text}>{currentStory.explaination}</Text>
      </View>

      <View style={s.button__wrapper}>
        {storyIndex !== 0 && (
          <CustomButton style={[s.button, s.button__back]} onPress={handleBack}>
            <SymbolView name="arrow.left" tintColor="#000" />
          </CustomButton>
        )}
        <CustomButton
          style={s.button}
          pressedStyle={s.button__pressed}
          onPress={handleNext}
        >
          <Text style={s.button__text}>
            {storyIndex + 1}/{storyInfo.length} ต่อไป
          </Text>
        </CustomButton>
      </View>
    </RootContainer>
  );
};

const s = StyleSheet.create({
  chat__bubble: {
    position: "absolute",
    top: 100,
    right: 50,
    padding: 15,
    backgroundColor: "#fdfdfd",
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    maxWidth: "40%",
    ...Shadows.default,
  },
  chat__bubbleRight: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 0,
    right: 30,
    top: "20%",
  },
  chat__bubbleLeft: {
    left: 30,
    top: "20%",
  },
  chat__bubbleText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
  scene: {
    flex: 2.5,
  },
  background: {
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  explaination: {
    height: 300,
    padding: 20,
    flex: 1,
  },
  explaination__text: {
    fontFamily: Fonts.regular,
    fontSize: 25,
  },
  character: {
    height: 350,
    width: 300,
    objectFit: "contain",
  },
  character__back: {
    height: 300,
    width: 300,
    position: "absolute",
    bottom: 0,
  },
  character__left: {
    height: 300,
    width: 250,
    position: "absolute",
    bottom: 0,
    left: -20,
  },
  character__right: {
    height: 250,
    width: 250,
    position: "absolute",
    bottom: 0,
    right: -20,
  },
  button__wrapper: {
    margin: 20,
    gap: 20,
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#5271ff",
    padding: 20,
    borderRadius: 30,
    height: 70,
    alignItems: "center",
    flex: 3,
    justifyContent: "center",
    ...Shadows.light,
    // margin: 20,
    // marginBottom: 40,
  },
  button__pressed: {
    backgroundColor: "#2533b3",
  },
  button__back: {
    flex: 1,
    backgroundColor: "#fdfdfd",
  },
  button__text: {
    fontFamily: Fonts.regular,
    color: "#fff",
  },
});

export default Story;
