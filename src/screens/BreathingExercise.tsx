import RootContainer from "../components/RootContainer";
import CustomButton from "../components/CustomButton";
import { StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";
import { useEffect, useState, useRef } from "react";
import { Fonts, Shadows } from "../constants/styles";
import { SymbolView } from "expo-symbols";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import BreathingCircle from "../components/BreathingCircle";
import { useDispatch } from "react-redux";
import { mindQuestActions } from "../context/mindQuestSlice";

const BreathingExercise = (props) => {
  const [intro, setIntro] = useState(true);
  const [music, setMusic] = useState<Audio.Sound>();
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const dispatch = useDispatch();

  const progress = useSharedValue(0);
  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/Meditation.mp3")
    );
    setMusic(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    playSound();

    progress.value = withTiming(5, { duration: 8000 }); // Animate from 0 to 4 over 8s
  }, []);

  useEffect(() => {
    return music
      ? () => {
          music.unloadAsync();
        }
      : undefined;
  }, [music]);

  const fadeInStyle = (start) =>
    useAnimatedStyle(() => {
      const opacity = interpolate(
        progress.value,
        [start, start + 0.5],
        [0, 1],
        Extrapolate.CLAMP
      );
      return { opacity };
    });

  const intro1Style = fadeInStyle(0);
  const intro2Style = fadeInStyle(1);
  const intro3Style = fadeInStyle(2);
  const intro4Style = fadeInStyle(3);
  const intro5Style = fadeInStyle(4);

  const doneIntro = () => {
    dispatch(mindQuestActions.completeQuest("breathing-exercise"));
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    setIntro(false);
  };

  const Intro = () => (
    <Animated.View style={s.intro}>
      <Animated.Text style={[s.intro__text, intro1Style, { marginTop: 50 }]}>
        ยินดีต้อนรับสู่{" "}
        <Text style={s.highlight}>Guided Breathing Exercise</Text>
      </Animated.Text>

      <Animated.Text style={[s.intro__text, intro2Style]}>
        แบบฝึกนี้จะช่วยให้คุณรู้สึกสงบ ลดความเครียด และมีสมาธิมากขึ้น
        โดยใช้เวลาประมาณ <Text style={s.highlight}>1–2 นาที</Text>
      </Animated.Text>

      <Animated.Text style={[s.intro__text, intro3Style]}>
        เพียงแค่หายใจตามจังหวะของวงกลม
      </Animated.Text>

      <Animated.View style={[s.intro__warning, intro4Style]}>
        <View style={s.intro__warningHeader}>
          <SymbolView name="exclamationmark.triangle" tintColor="#F3D510" />
          <Text style={s.intro__warningHeaderText}>ข้อแนะนำก่อนเริ่ม</Text>
        </View>
        <Text style={s.intro__warningText}>
          หากคุณมีปัญหาเกี่ยวกับระบบทางเดินหายใจ หัวใจ
          หรือรู้สึกเวียนศีรษะขณะฝึก กรุณาหยุดทันทีและปรึกษาแพทย์
        </Text>
      </Animated.View>
      <Animated.View style={intro5Style}>
        <CustomButton
          style={s.intro__button}
          pressedStyle={{
            backgroundColor: "#2533b3",
            elevation: 1,
          }}
          onPress={doneIntro}
        >
          <Text style={s.intro__buttonText}>เริ่ม Session</Text>
        </CustomButton>
      </Animated.View>
    </Animated.View>
  );

  return (
    <RootContainer>
      {intro ? (
        <Intro />
      ) : (
        <>
          <Text style={s.title}>Session 1</Text>
          <Text style={s.description}>
            การหายใจแบบ 4-7-8{" "}
            <Text style={{ color: "#ff7e75" }}>{formatTime(seconds)}</Text>
          </Text>
          <BreathingCircle />
        </>
      )}
    </RootContainer>
  );
};

const s = StyleSheet.create({
  title: {
    fontFamily: Fonts.regular,
    fontSize: 40,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: 25,
    marginBottom: 30,
    lineHeight: 45,
    overflow: "visible",
    width: "90%",
  },
  intro: {
    backgroundColor: "#fdfdfd",
    borderRadius: 30,
    padding: 20,
    gap: 20,
    flex: 1,
    marginBottom: 50,
    ...Shadows.default,
  },
  intro__text: {
    fontFamily: Fonts.regular,
    fontSize: 25,
    lineHeight: 37,
  },
  intro__warning: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    gap: 20,
    marginBottom: "auto",

    ...Shadows.light,
  },
  intro__warningText: {
    color: "#000",
    fontFamily: Fonts.regular,
  },
  intro__warningHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  intro__warningHeaderText: {
    color: "#000",
    fontFamily: Fonts.regular,
  },
  intro__button: {
    padding: 20,
    backgroundColor: "#5271ff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  intro__buttonText: {
    fontFamily: Fonts.regular,
    color: "#fff",
  },
  highlight: {
    color: "#5271ff",
  },
});

export default BreathingExercise;
