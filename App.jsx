import { StyleSheet, Button, Image } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import Home from "./src/screens/Home";
import Settings from "./src/screens/Settings";
import Diagnosis from "./src/screens/Diagnosis";
import HeaderText from "./src/components/HeaderText";
import CustomButton from "./src/components/CustomButton";

export default function App() {
  const [fontsAreLoaded] = useFonts({
    SemiBold: require("./assets/fonts/IBMPlexSansThai-Medium.ttf"),
  });
  // const navigate = useNavigation();

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
              nav
              options={{
                gestureEnabled: false,
                // headerBackTitle: "กลับ",
                // headerBackButtonMenuEnabled: true,
                headerBackVisible: false,
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
  settingsIcon: {
    width: 25,
    height: 25,
  },
});
