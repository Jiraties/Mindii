import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { Fonts } from "../constants/styles";

const CYCLE_DURATION = 19000; // 4 + 7 + 8 = 19s

const BreathingCircle = () => {
  const scale = useSharedValue(1);
  const [currentPhase, setCurrentPhase] = useState("เตรียมตัว"); // Start with "Ready"
  const [countdownDone, setCountdownDone] = useState(false);
  const textOpacity = useSharedValue(0);
  const textScale = useSharedValue(1);

  const showText = (text: string) => {
    setCurrentPhase(text);
    textOpacity.value = 0;
    textScale.value = 0.9;
    textOpacity.value = withTiming(1, { duration: 300 });
    textScale.value = withTiming(1.05, { duration: 300 });
  };

  const hideText = (cb?: () => void) => {
    textOpacity.value = withTiming(0, { duration: 300 });
  };

  useEffect(() => {
    // Countdown first
    const countdown = [
      "หาที่นั่งสงบๆ",
      "ผ่อนคลายร่างกาย",
      "พร้อมแล้ว เริ่มเลย",
    ];

    showText(countdown[0]);
    let i = 1;

    const countdownInterval = setInterval(() => {
      if (i < countdown.length) {
        showText(countdown[i]);
        i++;
      } else {
        clearInterval(countdownInterval);
        setCountdownDone(true);
        animateBreathing();
      }
    }, 2000);
  }, []);

  const animateBreathing = () => {
    // 1. Inhale (4s)
    runOnJS(showText)("สูดลมหายใจเข้า ลืกๆ ผ่านจมูก");
    scale.value = withTiming(
      1.5,
      { duration: 4000, easing: Easing.inOut(Easing.ease) },
      () => {
        // 2. Hold (7s)
        runOnJS(showText)("ค้างไว้");
        scale.value = withTiming(
          1.52,
          { duration: 7000, easing: Easing.linear },
          () => {
            // 3. Exhale (8s)
            runOnJS(showText)("ผ่อนลมหายใจออก ช้าๆ ทางปาก");
            scale.value = withTiming(
              1,
              { duration: 8000, easing: Easing.inOut(Easing.ease) },
              () => {
                runOnJS(animateBreathing)(); // Repeat
              }
            );
          }
        );
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ scale: textScale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, animatedStyle]} />

      <Animated.Text style={[styles.label, textStyle]}>
        {currentPhase}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.7,
    // backgroundColor: "#f0f4ff",
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 200,
    backgroundColor: "#5271ff",
    position: "absolute",
  },
  label: {
    fontSize: 32,
    fontWeight: "600",
    color: "#fff",
    fontFamily: Fonts.regular,
    width: 300,
    textAlign: "center",
    overflow: "visible",
  },
});

export default BreathingCircle;
