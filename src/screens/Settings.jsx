import { Text, StyleSheet } from "react-native";

import RootContainer from "../components/RootContainer";

const Settings = () => {
  return (
    <RootContainer>
      <Text style={s.headerText}>ตั้งค่า</Text>
    </RootContainer>
  );
};

const s = StyleSheet.create({
  headerText: {
    fontSize: 40,
    fontFamily: "SemiBold",
  },
});

export default Settings;
