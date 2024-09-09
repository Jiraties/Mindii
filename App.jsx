import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import Home from "./src/screens/Home";
import Settings from "./src/screens/Settings";
import Diagnosis from "./src/screens/Diagnosis";

export default function App() {
  const [fontsAreLoaded] = useFonts({
    SemiBold: require("./assets/fonts/IBMPlexSansThai-Medium.ttf"),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="home"
          component={Home}
          title="ใกล้หมอ"
          options={{
            headerTitle: () => (
              <>
                <Text style={s.headerTitle}>ใกล้</Text>
                <Text style={[s.headerTitle, { color: "#3246FF" }]}>หมอ</Text>
              </>
            ),
            headerStyle: {
              backgroundColor: "#EFEFEF",
            },
          }}
        />
        <Stack.Screen name="settings" component={Settings} />
        <Stack.Screen name="diagnosis" component={Diagnosis} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

const s = StyleSheet.create({
  // header: {
  //   backgroundColor: "#EFEFEF",
  // },
  headerTitle: {
    fontSize: 20,
    fontFamily: "SemiBold",
  },
});
