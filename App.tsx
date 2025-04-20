import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast, { ErrorToast, ToastConfig } from "react-native-toast-message";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { Provider, useDispatch, useSelector } from "react-redux";
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
import {
  fetchConclusionHistory,
  conclusionActions,
} from "./src/context/conclusionSlice";
import MindiiMate from "./src/screens/MindiiMate";
import Journal from "./src/screens/Journal";
import WellnessHub from "./src/screens/WellnessHub";
import BreathingExercise from "./src/screens/BreathingExercise";
import MindQuestScreen from "./src/screens/MindQuest";
import MindQuest from "./src/screens/MindQuest";
import Story from "./src/screens/Story";

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

  const Tabs = createBottomTabNavigator();

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
    <Stack.Navigator initialRouteName="หน้าหลัก">
      <Stack.Screen
        name="หน้าหลัก"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
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
          // headerBackVisible:
        }}
      />
      <Stack.Screen
        name="mate"
        component={MindiiMate}
        options={{
          headerTitle: () => <HeaderText text={"Mate"} />,
        }}
      />
      <Stack.Screen
        name="journal"
        component={Journal}
        options={{
          headerTitle: () => <HeaderText text={"Journal"} />,
        }}
      />
      <Stack.Screen
        name="wellnessHub"
        component={WellnessHub}
        options={{
          headerTitle: () => <HeaderText text={"Wellness Hub"} />,
        }}
      />
      <Stack.Screen
        name="breathingExercise"
        component={BreathingExercise}
        options={{
          headerTitle: () => <HeaderText text={"Mindfulness"} />,
        }}
      />
      <Stack.Screen
        name="mindQuest"
        component={MindQuest}
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerShadowVisible: false, // removes the default shadow
        }}
      />
      <Stack.Screen
        name="story"
        component={Story}
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerShadowVisible: false, // removes the default shadow
        }}
      />
    </Stack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false, // We'll control headers from stack if needed
        tabBarActiveTintColor: "#5271ff",
      }}
    >
      <Tabs.Screen
        name="mindQuest"
        component={MindQuest}
        options={{
          tabBarLabel: "Quest",
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name="sparkle.magnifyingglass"
              tintColor={color}
              style={{ width: size, height: size }}
            />
          ),
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />

      <Tabs.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name="house"
              tintColor={color}
              style={{ width: size, height: size }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="mate"
        component={MindiiMate}
        options={{
          tabBarLabel: "MindiiMate",
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name="bubble"
              tintColor={color}
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
    </Tabs.Navigator>
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
    success2: ({ text1 }) => <CustomToast type="success2" text1={text1} />,
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
        // dispatch(fetchConclusionHistory(storedUid));

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
    regular: require("./assets/fonts/IBMPlexSansThai-Medium.ttf"),
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
  "splashscreen",
  "ai",
  "mate",
  "journal",
  "breathingExercise",
  "story"
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
