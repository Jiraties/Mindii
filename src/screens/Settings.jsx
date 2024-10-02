import { Text, StyleSheet, ScrollView } from "react-native";

import RootContainer from "../components/RootContainer";

const Settings = () => {
  return (
    <RootContainer>
      <Text style={s.headerText}>ตั้งค่า</Text>
      <ScrollView style={s.settingsList}>
        <View style={s.settingsItem}></View>
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
  settingsItem: {},
});

export default Settings;
