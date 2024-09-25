import { StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import Home from "./src/screens/Home";
import Settings from "./src/screens/Settings";
import Diagnosis from "./src/screens/Diagnosis";
import HeaderText from "./src/components/HeaderText";

export default function App() {
  const [fontsAreLoaded] = useFonts({
    SemiBold: require("./assets/fonts/IBMPlexSansThai-Medium.ttf"),
  });

  return (
    <>
      {fontsAreLoaded && (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            options={{ drawerActiveTintColor: "#FB6E90" }}
          >
            <Stack.Screen
              name="home"
              component={Home}
              title="ใกล้หมอ"
              options={{
                headerTitle: () => <HeaderText />,
                headerStyle: {
                  backgroundColor: "#EFEFEF",
                },
                drawerLabel: "หน้าโฮม",
                drawerActiveTintColor: "#FB6E90",
              }}
            />
            <Stack.Screen
              name="settings"
              component={Settings}
              options={{
                drawerLabel: "ตั้งค่า",
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
                headerBackTitle: "กลับ",
                headerBackButtonMenuEnabled: true,
                headerTitle: () => <HeaderText />,
                headerStyle: {
                  backgroundColor: "#EFEFEF",
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

const Stack = createNativeStackNavigator();

const s = StyleSheet.create({
  // header: {
  //   backgroundColor: "#EFEFEF",
  // },
  headerTitle: {},
  headerTextWrapper: {},
});
