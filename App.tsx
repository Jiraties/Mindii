import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast, { ErrorToast, ToastConfig } from "react-native-toast-message";
import { StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { NavigationProp } from "@react-navigation/native";

import Home from "./src/screens/Home";
import Settings from "./src/screens/Settings";
import Diagnosis from "./src/screens/Diagnosis";
import HeaderText from "./src/components/HeaderText";
import CustomButton from "./src/components/CustomButton";
import Conclusions from "./src/screens/Conclusions";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Splashscreen from "./src/screens/Splashscreen";
import { RootState, store } from "./src/context/store";
import { authenticationActions } from "./src/context/authenticationSlice";
import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "./FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { SymbolView } from "expo-symbols";
import "react-native-reanimated";
import "react-native-gesture-handler";
import CustomToast from "./src/components/CustomToast";
import History from "./src/screens/History";

const AuthenticationStack = () => {
  return (
    <Stack.Navigator initialRouteName="splashscreen">
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="signup"
        component={Signup}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="splashscreen"
        component={Splashscreen}
        options={{
          headerShown: true,
          title: "",
          headerStyle: {
            backgroundColor: "#EFEFEF",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  const dispatch = useDispatch();
  const db = FIREBASE_FIRESTORE;

  useEffect(() => {
    async function fetchToken() {
      const storedUid = await AsyncStorage.getItem("uid");

      if (storedUid) {
        const getUserInformation = async () => {
          const userRef = doc(db, "users", storedUid); // Assuming you saved it under their UID
          getDoc(userRef)
            .then((docSnap) => {
              if (docSnap.exists()) {
                const userData = docSnap.data();
                dispatch(
                  authenticationActions.setUserInformation({
                    name: userData.name,
                    birthday: userData.birthday,
                  })
                );
              } else {
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        };

        await getUserInformation();
      }
    }

    fetchToken();
  }, []);

  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={Home}
        options={({ navigation }) => ({
          title: "หน้าหลัก",
          headerTitle: () => <HeaderText />,
          headerRight: (props) => (
            <CustomButton onPress={() => navigation.navigate("settings")}>
              <SymbolView name="gearshape" tintColor="#000" />
            </CustomButton>
          ),
          headerStyle: {
            backgroundColor: "#EFEFEF",
          },
          drawerLabel: "หน้าโฮม",
          drawerActiveTintColor: "#FB6E90",
        })}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={{
          headerTitle: () => <HeaderText />,
          headerStyle: {
            backgroundColor: "#EFEFEF",
          },
        }}
      />
      <Stack.Screen
        name="diagnosis"
        component={Diagnosis}
        options={{
          gestureEnabled: false,
          // headerBackTitle: "กลับ",
          // headerBackButtonMenuEnabled: true,
          headerBackVisible: false,
          headerTitle: () => <HeaderText isDiagnosis={true} />,
          headerStyle: {
            backgroundColor: "#EFEFEF",
          },
        }}
      />
      <Stack.Screen
        name="conclusions"
        component={Conclusions}
        options={{
          headerBackVisible: false,
          gestureEnabled: false,
          headerTitle: () => <HeaderText isDiagnosis={true} />,
        }}
      />
      <Stack.Screen
        name="history"
        component={History}
        options={{
          headerTitle: () => <HeaderText isDiagnosis={true} />,
        }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const isAuthenticated = useSelector<RootState>(
    (state) => state.authentication.isAuthenticated
  );
  const toastConfig: ToastConfig = {
    login: ({ text1 }) => <CustomToast type="login" text1={text1} />,
    logout: ({ text1 }) => <CustomToast type="logout" text1={text1} />,
    warning: ({ text1 }) => <CustomToast type="warning" text1={text1} />,
  };

  return (
    <>
      <NavigationContainer>
        {isAuthenticated && <AuthenticatedStack />}
        {!isAuthenticated && <AuthenticationStack />}
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};

const Root = () => {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const dispatch = useDispatch();
  const db = FIREBASE_FIRESTORE;

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUid = await AsyncStorage.getItem("uid");

      if (storedToken) {
        dispatch(
          authenticationActions.authenticate({
            token: storedToken,
            uid: storedUid,
          })
        );

        const getUserInformation = async () => {
          const userRef = doc(db, "users", storedUid); // Assuming you saved it under their UID
          getDoc(userRef)
            .then((docSnap) => {
              if (docSnap.exists()) {
                const userData = docSnap.data();
                dispatch(
                  authenticationActions.setUserInformation({
                    name: userData.name,
                    birthday: userData.birthday,
                  })
                );
              } else {
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
        };

        await getUserInformation();
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (!isTryingLogin) return <Navigation />;
};

export default function App() {
  const [fontsAreLoaded] = useFonts({
    SemiBold: require("./assets/fonts/IBMPlexSansThai-Medium.ttf"),
  });
  // const navigate = useNavigation();

  if (fontsAreLoaded) {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

export type ScreenNames = [
  "home",
  "settings",
  "diagnosis",
  "conclusions",
  "history",
  "login",
  "signup",
  "splashscreen"
];
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const s = StyleSheet.create({
  settingsIcon: {
    width: 25,
    height: 25,
  },
});
