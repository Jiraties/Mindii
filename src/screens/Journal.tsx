import RootContainer from "../components/RootContainer";
import CustomButton from "../components/CustomButton";
import LottieView from "lottie-react-native";

import { Fonts, Shadows } from "../constants/styles";
import { useEffect, useState, useRef } from "react";
import { SymbolView } from "expo-symbols";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { mindQuestActions } from "../context/mindQuestSlice";

const shuffle = (array) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

const Journal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);
  const inputRef = useRef(null);
  const keyboard = useAnimatedKeyboard();
  const dispatch = useDispatch();

  const cancelButtonAnimation = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300); // Delay ensures modal is rendered before focus
    }
  }, [modalVisible]);

  let bedtimeJournalQuestions = [
    "วันนี้คุณรู้สึกอย่างไรบ้าง?",
    "มีเรื่องอะไรในใจที่อยากระบายไหม?",
    "วันนี้มีเรื่องอะไรที่ทำให้คุณยิ้มหรือมีความสุข?",
    "มีอะไรที่คุณกังวลอยู่ตอนนี้หรือเปล่า?",
    "อะไรคือสิ่งที่คุณได้เรียนรู้จากวันนี้?",
    "มีสิ่งใดที่คุณอยากปล่อยวางก่อนนอน?",
    "วันนี้มีช่วงเวลาไหนที่คุณรู้สึกภูมิใจในตัวเอง?",
    "คุณอยากขอบคุณใครหรือสิ่งใดในวันนี้ไหม?",
    "พรุ่งนี้คุณอยากเริ่มต้นวันอย่างไร?",
    "ถ้าคืนนี้คุณฝันดี อยากให้ฝันถึงเรื่องอะไร?",
  ];

  return (
    <RootContainer style={s.journal__root}>
      <Modal
        animationType="slide"
        style={[s.modal]}
        visible={modalVisible}
        presentationStyle="pageSheet"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <RootContainer
              style={[
                { gap: 20 },
                darkTheme
                  ? { backgroundColor: "#242424" }
                  : { backgroundColor: "#efefef" },
              ]}
            >
              <Text
                style={[
                  s.modal__title,
                  darkTheme ? { color: "#fff" } : { color: "#000" },
                ]}
              >
                {modalText}
              </Text>
              <TextInput
                style={[
                  s.modal__textInput,
                  darkTheme
                    ? { backgroundColor: "#1f1f1f", color: "#fff" }
                    : { backgroundColor: "#fff", color: "#000" },
                ]}
                // placeholder="พิมพ์ได้เลย"
                multiline={true}
                ref={inputRef}
              />
            </RootContainer>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <Animated.View style={cancelButtonAnimation}>
          <CustomButton
            style={s.modal__endButton}
            onPress={() => {
              setModalVisible(false);
              dispatch(mindQuestActions.completeQuest("bedtime-journal"));
            }}
          >
            <SymbolView name="arrow.right" tintColor="#fff" />
          </CustomButton>
          <CustomButton
            style={[
              s.modal__theme,
              darkTheme
                ? { backgroundColor: "#1f1f1f" }
                : { backgroundColor: "#fff" },
            ]}
            onPress={() => setDarkTheme(!darkTheme)}
          >
            <SymbolView name="moon" tintColor={darkTheme ? "#fff" : "#000"} />
          </CustomButton>
        </Animated.View>
      </Modal>
      <Text style={s.title}>Bedtime Journal</Text>
      <Text style={s.description}>
        มีปัญหานอนไม่หลับ เพราะไม่โล่งใจหรือคิดมากหรือไม่?
        เขียนเรื่องราวสิ่งต่างๆ ที่เกิดขึ้นวันนี้ หรือแผนสิ่งที่อยากทำในอนาคต
        เพื่อเคลียรสมองให้โล่งกอนนอน 😴
      </Text>
      <ScrollView style={s.journal__grid}>
        <View style={s.animation__wrapper}>
          <LottieView
            source={require("../../assets/animations/sleep.json")}
            style={{ alignItems: "center", width: 200, height: 200 }}
            autoPlay
          />
        </View>
        {bedtimeJournalQuestions.map((question, index) => {
          if (index % 2 !== 0) return null;

          return (
            <View style={s.journal__row} key={index}>
              <CustomButton
                style={s.journal__item}
                onPress={() => {
                  setModalVisible(true);
                  setModalText(bedtimeJournalQuestions[index]);
                }}
              >
                <Text style={s.journal__itemText}>
                  {bedtimeJournalQuestions[index]}
                </Text>
              </CustomButton>

              {bedtimeJournalQuestions[index + 1] ? (
                <CustomButton
                  style={s.journal__item}
                  onPress={() => {
                    setModalVisible(true);
                    setModalText(bedtimeJournalQuestions[index + 1]);
                  }}
                >
                  <Text style={s.journal__itemText}>
                    {bedtimeJournalQuestions[index + 1]}
                  </Text>
                </CustomButton>
              ) : (
                <View style={s.journal__item} />
              )}
            </View>
          );
        })}
      </ScrollView>
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
    fontSize: 15,
    width: "90%",
  },
  animation__wrapper: {
    marginVertical: 20,
    borderRadius: 30,
    backgroundColor: "#5271ff",

    alignItems: "center",
    ...Shadows.light,
  },
  journal__root: {
    gap: 10,
  },
  journal__grid: {
    overflow: "scroll",
  },
  journal__row: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 15,
  },
  journal__item: {
    borderRadius: 30,
    backgroundColor: "#fdfdfd",
    height: 125,
    padding: 20,
    flex: 1,
    ...Shadows.light,
  },
  journal__itemText: {
    fontFamily: Fonts.regular,
  },
  modal__title: {
    fontFamily: Fonts.regular,
    // width: "80%",
    fontSize: 30,
    overflow: "visible",
    paddingTop: 20,
    // lineHeight: 50,
  },
  modal__textInput: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 30,
    fontSize: 15,
    minHeight: 200,
    fontFamily: Fonts.regular,
    ...Shadows.light,
  },
  modal: {
    height: 100,
  },
  modal__endButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    height: 60,
    width: 100,
    borderRadius: 30,
    backgroundColor: "#5271ff",
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.default,
  },
  modal__theme: {
    position: "absolute",
    left: 20,
    bottom: 20,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.default,
  },
});

export default Journal;
