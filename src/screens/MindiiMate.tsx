import RootContainer from "../components/RootContainer";
import CustomButton from "../components/CustomButton";
import { Fonts, Shadows } from "../constants/styles";
import { createNewThread, sendOpenAI } from "../utility/sendOpenAI";

import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import Constants from "expo-constants";
import { useEffect, useState, useRef } from "react";
import LottieView from "lottie-react-native";

const MindiiMate = () => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [threadID, setThreadID] = useState("");
  const keyboard = useAnimatedKeyboard();

  const inputAnimation = useAnimatedStyle(() => ({
    transform: [{ translateY: -(keyboard.height.value - 30) }],
  }));

  const [messages, setMessages] = useState([
    {
      userId: "mate",
      messageId: 1,
      id: Math.random(),
      message:
        "สวัสดีค่ะ! Mindii ยินดีที่ได้คุยกับคุณนะคะ มีอะไรให้ช่วยหรืออยากแชร์เรื่องราวอะไรบ้างไหม? 😊",
    },
  ]);

  // useEffect(() => {
  //   const threadID = createNewThread();
  //   setThreadID(threadID);
  // }, []);

  const handleSend = async () => {
    // scrollViewRef.current.scrollToEnd({ animated: true });
    const finalInputValue = inputValue;
    setInputValue("");
    setLoading(true);
    setMessages((prev) => [
      ...prev,
      {
        userId: "user",
        id: Math.random(),
        messageId: 1,
        message: finalInputValue,
      },
    ]);
    const reply = await sendOpenAI(
      finalInputValue,
      Constants.expoConfig.extra.TESTING_THREAD
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

  return (
    <RootContainer padding={false} style={{ gap: 0 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Image
          source={require("../../assets/images/mindiiMate.png")}
          style={s.chat__headerImage}
        />
        <ScrollView style={s.chat}>
          {messages.map((message) => {
            return (
              <View
                key={Math.random()}
                style={message.userId === "mate" ? s.chat__mate : s.chat__user}
              >
                {message.userId === "mate" && (
                  <Image
                    style={s.chat__profilePicture}
                    source={require("../../assets/images/mindiiMate.png")}
                  />
                )}
                <View style={s.chat__bubble}>
                  <Text style={s.chat__text}>{message.message}</Text>
                </View>
                {message.userId === "user" && (
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
      </KeyboardAvoidingView>
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
    height: 300,
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
    paddingBottom: 60,
    minHeight: 60,
    flexDirection: "row",
    padding: 20,
    gap: 10,
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
    flex: 1,
    padding: 20,
    gap: 20,
  },
  chat__bubble: {
    padding: 15,
    backgroundColor: "#fdfdfd",
    borderRadius: 20,
    maxWidth: "75%",
    marginBottom: 20,
    ...Shadows.light,
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
});

export default MindiiMate;
