import { StyleSheet, Button, Image, SafeAreaView } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import Home from "./src/screens/Home";
import Settings from "./src/screens/Settings";
import Diagnosis from "./src/screens/Diagnosis";
import HeaderText from "./src/components/HeaderText";
import CustomButton from "./src/components/CustomButton";
import Conclusions from "./src/screens/Conclusions";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Splashscreen from "./src/screens/Splashscreen";

const AuthenticationStack = () => {
  return (
    <Stack.Navigator initialRouteName="splashscreen">
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        component={Signup}
        options={{ headerShown: false }}
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

export default function App() {
  const isAuthenticated = false;
  const [fontsAreLoaded] = useFonts({
    SemiBold: require("./assets/fonts/IBMPlexSansThai-Medium.ttf"),
  });
  // const navigate = useNavigation();

  if (fontsAreLoaded) {
    return (
      <NavigationContainer>
        {isAuthenticated ? <AuthenticatedStack /> : <AuthenticationStack />}
      </NavigationContainer>
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
