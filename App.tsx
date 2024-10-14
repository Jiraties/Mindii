import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast, { ErrorToast } from "react-native-toast-message";
import {
  StyleSheet,
  Button,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";

import Home from "./src/screens/Home";
import Settings from "./src/screens/Settings";
import Diagnosis from "./src/screens/Diagnosis";
import HeaderText from "./src/components/HeaderText";
import CustomButton from "./src/components/CustomButton";
import Conclusions from "./src/screens/Conclusions";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Splashscreen from "./src/screens/Splashscreen";
import { store } from "./src/context/store";
import { authenticationActions } from "./src/context/authenticationSlice";
import { FIREBASE_FIRESTORE } from "./FirebaseConfig";

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
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={Home}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderText />,
          headerRight: (props) => (
            <CustomButton onPress={() => navigation.navigate("settings")}>
              <Image
                style={s.settingsIcon}
                source={require("./assets/images/cog.png")}
              />
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
          headerTitle: () => <HeaderText isDiagnosis={true} />,
        }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  console.log("isAuthenticated is: ", isAuthenticated);
  const toastConfig = {
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: "#f54254", padding: 20 }}
        contentContainerStyle={{
          borderRadius: 20,
        }}
        text1Style={{
          fontSize: 15,
          fontFamily: "SemiBold",
        }}
        text2Style={{
          fontFamily: "SemiBold",
        }}
      />
    ),
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
      console.log(storedToken);

      if (storedToken) {
        dispatch(authenticationActions.authenticate(storedToken));

        const getUserInformation = async () => {
          const userRef = doc(db, "users", storedToken); // Assuming you saved it under their UID
          getDoc(userRef)
            .then((docSnap) => {
              if (docSnap.exists()) {
                const userData = docSnap.data();
                console.log("User's name from Firestore:", userData);
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

  if (isTryingLogin) {
    return <ActivityIndicator />;
  }

  return <Navigation />;
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

const Stack = createNativeStackNavigator();

const s = StyleSheet.create({
  settingsIcon: {
    width: 25,
    height: 25,
  },
});
