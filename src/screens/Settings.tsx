import Toast from "react-native-toast-message";
import { Text, StyleSheet, ScrollView, View, Switch } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import RootContainer from "../components/RootContainer";
import CustomButton from "../components/CustomButton";
import authenticationSlice, {
  authenticationActions,
} from "../context/authenticationSlice";
import { Fonts } from "../constants/styles";
import { RootState } from "../context/store";

const Settings = (props) => {
  const [theme, setTheme] = useState("light");
  const userInformation = useSelector<RootState>(
    (state) => state.authentication.userInformation
  );
  const birthday = new Date(userInformation.birthday);
  const dispatch = useDispatch();

  const themeSwitchHandler = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  const logoutHandler = () => {
    dispatch(authenticationActions.logout());
    Toast.show({
      type: "logout",
      text1: "ออกจากระบบสำเร็จ",
      position: "top",
      swipeable: true,
      visibilityTime: 1500,
      topOffset: 50,
    });
    // props.navigation.navigate("splashscreen");
  };

  return (
    <RootContainer>
      <Text style={s.headerText}>ตั้งค่า</Text>
      <ScrollView style={s.settingsList}>
        <View style={[s.settingsItem, s.account]}>
          {/* <View style={s.account__flag}>
            <Text style={s.account__flag}>บัญชีใกล้หมอ</Text>
          </View> */}
          <Text style={s.account__name}>{userInformation.name}</Text>
          <Text style={s.account__birthday}>
            เกิดวันที่{" "}
            {birthday.toLocaleString("th-TH", {
              dateStyle: "long",
            })}
          </Text>

          <View style={s.account__actions}>
            {/* <CustomButton
              style={s.button}
              pressedStyle={{ backgroundColor: "#2533b3" }}
              onPress={logoutHandler}
            >
              <Text style={s.button__text}>เปลี่ยนรหัสผ่าน</Text>
            </CustomButton> */}
            <CustomButton
              style={s.button}
              pressedStyle={{ backgroundColor: "#2533b3" }}
              onPress={logoutHandler}
            >
              <Text style={s.button__text}>ออกจากระบบ</Text>
            </CustomButton>
          </View>
        </View>
        <View style={s.settingsItem}>
          <Text style={s.settingsItem__text}>Debug</Text>
          <CustomButton
            style={s.button}
            onPress={() =>
              Toast.show({
                type: "warning",
                text1: "TESTING TOAST",
                text2: "successfully testing",
              })
            }
          >
            <Text style={s.button__text}>Toast</Text>
          </CustomButton>
        </View>
      </ScrollView>
    </RootContainer>
  );
};

const s = StyleSheet.create({
  headerText: {
    fontSize: 40,
    fontFamily: Fonts.regular,
    marginBottom: 30,
  },
  settingsList: {
    gap: 20,
    borderRadius: 20,
  },
  settingsItem: {
    padding: 20,
    backgroundColor: "#fdfdfd",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3246FF",
    width: "40%",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  button__text: {
    color: "#fff",
    fontFamily: Fonts.regular,
  },
  settingsItem__text: {
    fontFamily: Fonts.regular,
  },
  account: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  account__name: {
    fontSize: 30,
    fontFamily: Fonts.regular,
  },
  account__birthday: {
    marginBottom: 30,
    fontFamily: Fonts.regular,
  },
  account__flag: {
    backgroundColor: "#959ffc",
    padding: 5,
    borderRadius: 10,
    color: "#fff",
    fontFamily: Fonts.regular,
  },
  account__actions: {
    flexDirection: "row",
    gap: 10,
    marginLeft: "auto",
    // justifyContent: "space-around",
  },
});

export default Settings;
