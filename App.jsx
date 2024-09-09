import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/Home";
import Settings from "./src/screens/Settings";
import Diagnosis from "./src/screens/Diagnosis";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="home"
          component={Home}
          title="ใกล้หมอ"
          headerTransparent={true}
          options={{
            headerTitle: () => (
              <>
                <Text style={s.headerTitle}>ใกล้</Text>
                <Text style={[s.headerTitle, { color: "#3246FF" }]}>หมอ</Text>
              </>
            ),
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
  headerText: {
    textAlign: "left",
    fontSize: 40,
    fontFamily: "IBM Plex Sans Thai",
  },
  headerTextHighlight: {
    textAlign: "left",
    fontSize: 40,
    color: "blue",
    fontFamily: "IBM Plex Sans Thai",
  },
  homeList: {
    marginTop: 30,
    overflow: "visible",
  },
  headerTitle: {
    fontSize: 20,
  },
});
