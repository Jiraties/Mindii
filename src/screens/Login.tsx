import Toast from "react-native-toast-message";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from "react-native";

import CustomButton from "../components/CustomButton";
import RootContainer from "../components/RootContainer";
import { Fonts } from "../constants/styles";
import { authenticationActions } from "../context/authenticationSlice";

const Login = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = FIREBASE_AUTH;

  const loginHandler = async () => {
    setLoading(true);
    Keyboard.dismiss();

    try {
      const response: any = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = response.user.uid;
      const tokenId = response._tokenResponse.idToken;
      dispatch(
        authenticationActions.authenticate({ token: tokenId, uid: uid })
      );
      Toast.show({
        type: "login",
        text1: "เข้าสู่ระบบสำเร็จ",
        position: "top",
        swipeable: true,
        visibilityTime: 1500,
        topOffset: 50,
      });
    } catch (error) {
      Toast.show({
        type: "warning",
        text1: "ไม่มีบัญชีในระบบ โปรดลองอีกที",
        position: "top",
        swipeable: true,
        visibilityTime: 1500,
        topOffset: 50,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <RootContainer style={s.loginRootContainer}>
      <View>
        <Text style={s.headerText}>ยินดีต้อนรับสู่</Text>
        <Text style={[s.headerText, { color: "#3246FF" }]}>ใกล้หมอ </Text>
        <Text style={s.subheaderText}>
          ล็อกอินเพื่อเริ่มต้นประเมินอาการได้ทันที
        </Text>
      </View>
      <View style={s.loginWrapper}>
        <TextInput
          style={s.loginInput}
          inputMode="email"
          placeholder="อีเมล"
          autoCorrect={false}
          autoCapitalize={"none"}
          onChangeText={(input) => setEmail(input)}
          value={email}
        />
        <TextInput
          style={s.loginInput}
          placeholder="รหัสผ่าน"
          autoCorrect={false}
          autoCapitalize={"none"}
          secureTextEntry={true}
          onChangeText={(input) => setPassword(input)}
          value={password}
        />
        {loading ? (
          <ActivityIndicator style={s.submitButton} />
        ) : (
          <CustomButton style={s.submitButton} onPress={loginHandler}>
            <Text style={s.submitButton__text}>ล็อกอิน</Text>
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
          <ActivityIndicator style={s.submitButton} />
        ) : (
          <CustomButton
            style={[s.submitButton, s.signupButton]}
            onPress={() => props.navigation.navigate("signup")}
          >
            {/* <Image
              style={s.googleButtonImage}
              source={require("../../assets/images/googleLogo.png")}
            /> */}
            <Text style={s.submitButton__text}>สร้างบัญชีใกล้หมอ</Text>
          </CustomButton>
        )}
      </View>
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
  loginRootContainer: {
    padding: 20,
    paddingTop: 100,
    gap: 60,
    backgroundColor: "#EFEFEF",
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
  loginWrapper: {},
  loginText: {
    fontFamily: Fonts.regular,
    marginBottom: 10,
    fontSize: 20,
  },
  loginInput: {
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

export default Login;
