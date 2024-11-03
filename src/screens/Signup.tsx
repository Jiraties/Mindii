import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Keyboard,
} from "react-native";
import {
  FIREBASE,
  FIREBASE_AUTH,
  FIREBASE_FIRESTORE,
} from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import CustomButton from "../components/CustomButton";
import RootContainer from "../components/RootContainer";
import Toast from "react-native-toast-message";
import { Fonts } from "../constants/styles";

const validatePassword = (password) => {
  const minLength = 6;
  const maxLength = 4096;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumeric = /[0-9]/.test(password);
  // const hasNonAlphanumeric = /[^a-zA-Z0-9]/.test(password);
  const isValidLength =
    password.length >= minLength && password.length <= maxLength;

  return (
    hasLowercase &&
    hasUppercase &&
    hasNumeric &&
    // hasNonAlphanumeric &&
    isValidLength
  );
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateInputs = (email, password, reEnterPassword, birthday, name) => {
  if (!email || !password || !reEnterPassword || !birthday || !name) {
    return "กรุณากรอกข้อมูลให้ครบทุกช่อง";
  }

  if (!validateEmail(email)) {
    return "กรุณากรอกอีเมลที่ถูกต้อง";
  }

  if (name.length > 20) {
    return "ชื่อไม่ควรยาวเกิน 20 ตัวอักษร";
  }

  if (password !== reEnterPassword) {
    return "รหัสผ่านไม่ตรงกัน";
  }

  if (!validatePassword(password)) {
    return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร และประกอบไปด้วยตัวพิมพ์เล็ก พิมพ์ใหญ่ ตัวเลข และอักขระพิเศษ";
  }

  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthday.getFullYear();
  const monthDifference = currentDate.getMonth() - birthday.getMonth();
  const dayDifference = currentDate.getDate() - birthday.getDate();

  if (
    age < 13 ||
    (age === 13 &&
      (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))
  ) {
    return "ผู้ใช้ต้องมีอายุอย่างน้อย 13 ปี";
  }

  return null;
};

const Signup = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [birthday, setBirthday] = useState<Date>(new Date());

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_FIRESTORE;

  const handleSignup = async () => {
    setLoading(true);
    Keyboard.dismiss();

    const errorMessage = validateInputs(
      email,
      password,
      reEnterPassword,
      birthday,
      name
    );
    if (errorMessage) {
      Toast.show({ type: "warning", text1: errorMessage });
      setLoading(false);
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userUid = response.user.uid;

      const writeUserData = async () => {
        try {
          await setDoc(doc(db, "users", userUid), {
            name: name,
            email: email,
            birthday: birthday.toISOString(),
          });
        } catch (error) {
          console.log("writeUserData Error: ", error);
        }
      };
      await writeUserData();

      Toast.show({ type: "login", text1: "สร้างบัญชีเสร็จเรียบร้อย" });
      props.navigation.navigate("login");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        Toast.show({
          type: "warning",
          text1: "ไม่มีบัญชีในระบบ โปรดลองอีกที",
          position: "top",
          swipeable: true,
          visibilityTime: 3000,
          topOffset: 50,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <RootContainer style={s.signupRootContainer}>
      <View>
        <Text style={s.headerText}>สร้างบัญชี</Text>
        <Text style={s.subheaderText}>
          สร้างบัญชีเพื่อรับคำแนะนำโรคที่ตรงใจคุณ
        </Text>
      </View>
      <ScrollView style={s.scrollView}>
        <View style={s.signupWrapper}>
          <TextInput
            style={s.signupInput}
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder="ชื่อ"
          />
          <TextInput
            style={s.signupInput}
            onChangeText={(text) => setEmail(text)}
            value={email}
            inputMode="email"
            placeholder="อีเมล"
          />
          <TextInput
            style={s.signupInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="สร้างรหัสผ่าน"
            secureTextEntry={true}
          />
          <TextInput
            style={s.signupInput}
            onChangeText={(text) => setReEnterPassword(text)}
            value={reEnterPassword}
            placeholder="รหัสผ่านอีกรอบ"
            secureTextEntry={true}
          />
          <View
            style={[
              s.signupInput,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Text
              style={{
                marginRight: "auto",
                color: "grey",
                fontFamily: Fonts.regular,
              }}
            >
              วันเกิด
            </Text>
            <DateTimePicker
              style={{ borderRadius: 20 }}
              value={birthday}
              onChange={(event, date: Date) => {
                setBirthday(date);
              }}
              themeVariant="light"
              accentColor="#3246FF"
              locale="th-TH"
              maximumDate={new Date()}
            />
          </View>

          {loading ? (
            <ActivityIndicator />
          ) : (
            <CustomButton style={s.submitButton} onPress={handleSignup}>
              <Text style={s.submitButton__text}>สร้างบัญชี</Text>
            </CustomButton>
          )}
        </View>
        <View style={s.line}>
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              top: -10,
              backgroundColor: "#EFEFEF",
              color: "#828282",
              fontFamily: Fonts.regular,
              paddingHorizontal: 10,
            }}
          >
            หรือ
          </Text>
        </View>
        <View>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <CustomButton
              style={[s.submitButton, s.signupButton]}
              onPress={() => props.navigation.navigate("login")}
            >
              {/* <Image
                style={s.googleButtonImage}
                source={require("../../assets/images/googleLogo.png")}
              /> */}
              <Text style={{ fontFamily: Fonts.regular, color: "#fff" }}>
                มีบัญชีอยู่แล้ว
              </Text>
            </CustomButton>
          )}
        </View>
      </ScrollView>
    </RootContainer>
  );
};

const defaultShadow = {
  shadowColor: "black",
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 6,
  shadowOpacity: 0.1,
};

const s = StyleSheet.create({
  signupRootContainer: {
    padding: 20,
    paddingTop: 100,
    gap: 60,
    backgroundColor: "#EFEFEF",
  },
  scrollView: {
    borderRadius: 20,
  },
  headerText: {
    fontSize: 40,
    fontFamily: Fonts.regular,
  },
  subheaderText: {
    fontSize: 15,
    fontFamily: Fonts.regular,
  },
  headerTextHighlight: {
    fontSize: 40,
    color: "blue",
    fontFamily: Fonts.regular,
  },
  signupWrapper: {},
  signupText: {
    fontFamily: Fonts.regular,
    marginBottom: 10,
    fontSize: 20,
  },
  signupInput: {
    fontFamily: Fonts.regular,
    backgroundColor: "#fdfdfd",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    ...defaultShadow,
  },
  submitButton: {
    backgroundColor: "#3246FF",
    padding: 20,
    marginTop: 30,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
  },
  submitButton__text: {
    color: "#fff",
    fontFamily: Fonts.regular,
    textAlign: "center",
  },
  line: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    opacity: 0.5,
    marginVertical: 25,
  },
  googleButtonImage: {
    height: 30,
    width: 30,
  },
  signupButton: {
    marginTop: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});

export default Signup;
