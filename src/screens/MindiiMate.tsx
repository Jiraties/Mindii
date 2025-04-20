import RootContainer from "../components/RootContainer";
import CustomButton from "../components/CustomButton";
import { Fonts, Shadows } from "../constants/styles";
import { createNewThread, sendOpenAI } from "../utility/sendOpenAI";
import * as Speech from "expo-speech";

import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Modal,
} from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import Constants from "expo-constants";
import { useEffect, useState, useRef } from "react";
import LottieView from "lottie-react-native";
import { transform } from "@babel/core";
import { useDispatch } from "react-redux";
import { mindQuestActions } from "../context/mindQuestSlice";

const mindiiModesList = [
  {
    id: "FRND",
    name: "เฟรนด์ลี่",
    emoji: "😊",
    backgroundColor: "#f9d3ce",
  },
  {
    id: "STRT",
    name: "ตรงไปตรงมา",
    emoji: "😁",
    backgroundColor: "#ffe0b3",
  },
  {
    id: "DOCT",
    name: "คุณหมอ",
    emoji: "🧑‍⚕️",
    backgroundColor: "#dcdcff",
  },
  {
    id: "FLEX",
    name: "Flexible",
    emoji: "😎",
    backgroundColor: "#bdf0d0",
  },
  {
    id: "FUNY",
    name: "ตลก",
    emoji: "😂",
    backgroundColor: "#e8cafa",
  },
];

const MindiiMate = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [threadID, setThreadID] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState(mindiiModesList[0]);
  const keyboard = useAnimatedKeyboard();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([
    {
      userId: "mate",
      messageId: 1,
      id: Math.random(),
      message:
        "สวัสดีค่ะ Mindii ยินดีที่ได้คุยนะคะ! ตอนวันจันทร์เธอบอกว่าดีแต่อีกสองวันเธอบอกว่าเธอเสร้า ",
    },
  ]);

  const inputAnimation = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));

  useEffect(() => {
    setTimeout(() => {
      setModalVisible(true);
    }, 200);
  }, []);

  const handleSend = async () => {
    // scrollViewRef.current.scrollToEnd({ animated: true });
    dispatch(mindQuestActions.completeQuest("vent-mindii-mate"));
    console.log(mode.id);
    setInputValue("");
    setLoading(true);
    setMessages((prev) => [
      ...prev,
      {
        userId: "user",
        id: Math.random(),
        messageId: 1,
        message: inputValue,
      },
    ]);
    console.log(Constants.expoConfig.extra.ASSISTANT_ID1);
    const reply = await sendOpenAI(
      inputValue,
      Constants.expoConfig.extra[String("TESTING_THREAD_" + String(mode.id))],
      Constants.expoConfig.extra[String("ASSISTANT_ID_" + String(mode.id))]
    );
    setLoading(false);
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        userId: "mate",
        id: Math.random(),
        messageId: 1,
        message: reply,
      },
    ]);
  };

  const handleModeSelectPress = (mode) => {
    setMode(mode);
    setModalVisible(false);
  };

  return (
    <RootContainer padding={false} style={{ gap: 0 }}>
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={modalVisible}
      >
        <RootContainer style={s.selectMode} padding>
          <View style={{ gap: 5 }}>
            <Text style={s.selectMode__title}>
              ยินดีต้อนรับสู่ Mindii Mate! กรุณาเลือก{" "}
              <Text style={{ color: "#5271ff" }}>Persona </Text>
            </Text>
            {/* <Text style={s.selectMode__description}>
              เลือกโหมดเพื่อให้ Mindii Mate สนทนาแบบที่คุณต้องการ
            </Text> */}
          </View>
          <View style={s.selectMode__wrapper}>
            {mindiiModesList.map((mode) => (
              <CustomButton
                key={mode.id}
                onPress={() => handleModeSelectPress(mode)}
                style={s.selectMode__item}
              >
                <View
                  id={mode.id}
                  style={[
                    s.selectMode__itemImage,
                    { backgroundColor: mode.backgroundColor },
                  ]}
                >
                  <Text style={s.selectMode__emoji}>{mode.emoji}</Text>
                </View>
                <Text style={s.selectMode__itemText}>{mode.name}</Text>
              </CustomButton>
            ))}
          </View>
        </RootContainer>
      </Modal>
      {/* <KeyboardAvoidingView style={{ height: "auto" }}> */}
      <Image
        source={require("../../assets/images/chatBackground.jpg")}
        style={s.chat__headerImage}
      />
      <ScrollView style={s.chat}>
        {messages.map((message) => {
          const isUser = message.userId === "user";

          return (
            <View
              key={Math.random()}
              style={message.userId === "mate" ? s.chat__mate : s.chat__user}
            >
              {!isUser && (
                <Image
                  style={s.chat__profilePicture}
                  source={require("../../assets/images/mindiiMate.png")}
                />
              )}
              <View
                style={[
                  s.chat__bubble,
                  isUser && { backgroundColor: "#5271ff" },
                ]}
              >
                <Text style={[s.chat__text, isUser && { color: "#fff" }]}>
                  {message.message}
                </Text>
              </View>
              {isUser && (
                <Image
                  style={s.chat__profilePicture}
                  source={require("../../assets/images/userIcon.png")}
                />
              )}
            </View>
          );
        })}
        {loading && (
          <LottieView
            source={require("../../assets/animations/chatLoading.json")}
            style={{ width: 400, height: 400 }}
            autoPlay
          />
        )}
      </ScrollView>
      {/* <GiftedChat messages={messages} /> */}
      {/* </KeyboardAvoidingView> */}
      <View style={s.exampleInput__list}>
        <CustomButton
          onPress={() => setModalVisible(true)}
          style={[s.exampleInput, { backgroundColor: mode.backgroundColor }]}
        >
          <Text style={s.exampleInput__text}>
            {mode.emoji} คุณกำลังคุยกับ Mindii {mode.name}
          </Text>
        </CustomButton>
      </View>
      <Animated.View style={[s.inputWrapper, inputAnimation]}>
        <TextInput
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          style={s.input}
          placeholder="ถามอะไรก็ได้"
        />
        <CustomButton
          style={[
            loading ? { backgroundColor: "#8c8c8c" } : {},
            s.input__submit,
          ]}
          onPress={loading ? null : handleSend}
        >
          <Text style={s.input__submitText}>ส่ง</Text>
        </CustomButton>
      </Animated.View>
    </RootContainer>
  );
};

const s = StyleSheet.create({
  chat__headerImage: {
    height: 1000,
    width: 500,
    position: "absolute",
    objectFit: "cover",
  },
  input: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    fontFamily: Fonts.regular,
    flex: 7,
    ...Shadows.light,
  },
  inputWrapper: {
    paddingBottom: 10, // Reduce this value or adjust it as needed
    // minHeight: 60,
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    // flex: 0.5,
  },
  input__submit: {
    borderRadius: 30,
    padding: 20,
    flex: 1,
    backgroundColor: "#5271ff",
    alignItems: "center",
    ...Shadows.light,
  },
  input__submitText: {
    fontFamily: Fonts.regular,
    color: "#fff",
  },
  chat: {
    marginTop: 70,
    height: "auto",
    padding: 20,
    gap: 20,
  },
  chat__bubble: {
    padding: 15,
    backgroundColor: "#fdfdfd",
    borderRadius: 20,
    maxWidth: "75%",
    marginBottom: 20,
    ...Shadows.default,
  },
  chat__text: {
    fontFamily: Fonts.regular,
  },
  chat__profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  chat__mate: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  chat__user: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  exampleInput__list: {
    marginHorizontal: 20,
    // marginBottom: -30,
    flexDirection: "row",
    gap: 10,
  },
  exampleInput: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 1000,
    ...Shadows.light,
  },
  exampleInput__text: {
    fontFamily: Fonts.regular,
    color: "#454545",
  },
  selectMode: {
    marginBottom: 100,
    flex: 1,
    gap: 20,
    justifyContent: "center",
  },
  selectMode__title: {
    textAlign: "center",
    fontFamily: Fonts.regular,
    fontSize: 30,
  },
  selectMode__description: {
    textAlign: "center",
    fontFamily: Fonts.regular,
  },
  selectMode__wrapper: {
    flexDirection: "row",
    width: "auto",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: 20,
    rowGap: 20,
  },
  selectMode__item: {
    // flexDirection: "column",
    alignItems: "center",
    gap: 10,
    ...Shadows.light,
  },
  selectMode__itemImage: {
    height: 100,
    width: 100,
    backgroundColor: "#fff",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  selectMode__itemText: {
    fontFamily: Fonts.regular,
  },
  selectMode__emoji: {
    fontSize: 40,
  },
});

export default MindiiMate;
