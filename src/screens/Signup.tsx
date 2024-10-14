import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
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

const Signup = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [birthday, setBirthday] = useState<Date>(new Date());

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_FIRESTORE;

  const signup = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userUid = response.user.uid;

      console.log(userUid);

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

      Toast.show({ type: "success", text1: "สร้างบัญชีเสร็จเรียบร้อย" });
      props.navigation.navigate("login");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("อีเมลนี้ถูกใช้ไปแล้ว", "โปรดลองใหม่อีกที", [
          {
            text: "ลองใหม่",
            style: "cancel",
          },
        ]);
        setEmail("");
      }
    } finally {
      setLoading(false);
    }
  };

  const reEnterPasswordValidator = () => {
    // if (reEnterPassword) {
    // }
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
            onBlur={reEnterPasswordValidator}
            placeholder="รหัสผ่านอีกรอบ"
            secureTextEntry={true}
          />
          <View
            style={[
              s.signupInput,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Text style={{ marginRight: "auto", color: "grey" }}>วันเกิด</Text>
            <DateTimePicker
              style={{ borderRadius: 20 }}
              value={birthday}
              onChange={(event, date: Date) => {
                setBirthday(date);
              }}
            />
          </View>

          {loading ? (
            <ActivityIndicator />
          ) : (
            <CustomButton style={s.submitButton} onPress={signup}>
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
              fontFamily: "SemiBold",
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
              <Text style={{ fontFamily: "SemiBold", color: "#fff" }}>
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
    fontFamily: "SemiBold",
  },
  subheaderText: {
    fontSize: 15,
    fontFamily: "SemiBold",
  },
  headerTextHighlight: {
    fontSize: 40,
    color: "blue",
    fontFamily: "SemiBold",
  },
  signupWrapper: {},
  signupText: {
    fontFamily: "SemiBold",
    marginBottom: 10,
    fontSize: 20,
  },
  signupInput: {
    fontFamily: "SemiBold",
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
    fontFamily: "SemiBold",
    textAlign: "center",
  },
  line: {
    borderWidth: 1,
    borderColor: "#fff",
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
