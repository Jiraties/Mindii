import { Text, StyleSheet, ScrollView, View, Switch } from "react-native";

import RootContainer from "../components/RootContainer";
import { useState } from "react";

const Settings = () => {
  const [theme, setTheme] = useState("light");

  const themeSwitchHandler = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  return (
    <RootContainer>
      <Text style={s.headerText}>ตั้งค่า</Text>
      <ScrollView style={s.settingsList}>
        <View style={s.settingsItem}>
          <Text>Hello</Text>
          <Switch
            value={theme === "light" ? false : true}
            onChange={themeSwitchHandler}
          />
        </View>
      </ScrollView>
    </RootContainer>
  );
};

const s = StyleSheet.create({
  headerText: {
    fontSize: 40,
    fontFamily: "SemiBold",
  },
  settingsList: {
    flex: 1,
  },
  settingsItem: {
    padding: 20,
    backgroundColor: "#fdfdfd",
    borderRadius: 20,
  },
});

export default Settings;
