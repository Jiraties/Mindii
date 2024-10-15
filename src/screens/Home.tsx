import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Appearance,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import HomeListItem from "../components/HomeListItem";
import RootContainer from "../components/RootContainer";
import { useSelector } from "react-redux";

import { Skeleton } from "moti/skeleton";
import { RootState } from "../context/store";
import Toast from "react-native-toast-message";

const Home = (props) => {
  const username: any = useSelector<RootState>(
    (state) => state.authentication.userInformation.name
  );

  async function fetchToken() {
    const storedToken = await AsyncStorage.getItem("token");
  }

  fetchToken();

  return (
    <RootContainer>
      <View style={s.headerView}>
        <Text style={s.headerText}>สวัสดีครับ</Text>
        {username === "" ? (
          <Skeleton width={200} colorMode="light" />
        ) : (
          <Text style={s.headerTextHighlight}>{username}</Text>
        )}
      </View>
      <ScrollView style={s.homeList} alwaysBounceVertical={false}>
        <HomeListItem
          text="ประเมินความเสี่ยงโรคเบื้องต้น 🧑‍⚕️"
          button="เริ่มเลย!"
          image
          redirectTo="diagnosis"
          warningModal
        />

        <HomeListItem
          text="ดูประวัติการประเมินโรคของคุณ"
          button="ไป"
          image={false}
          redirectTo="conclusions"
        />
        <Button
          onPress={() =>
            Toast.show({
              type: "warning",
              text1: "ลองใหม่",
              // text2: "ยินดีต้อนรับ",
              // text1Style: { fontFamily: "SemiBold" },
              position: "top",
              swipeable: true,
              visibilityTime: 1500,
              topOffset: 50,
            })
          }
          title="Show Toast"
        />
      </ScrollView>
      <StatusBar style="auto" />
    </RootContainer>
  );
};

const s = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    padding: 20,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 40,
    fontFamily: "SemiBold",
  },
  headerTextHighlight: {
    fontSize: 40,
    color: "#3246FF",
    fontFamily: "SemiBold",
    lineHeight: 55,
  },
  homeList: {
    marginTop: 30,
    overflow: "visible",
  },
  homeList__ipad: {
    marginTop: 30,
    overflow: "visible",
    flexDirection: "row",
    height: 175,
    gap: 20,
  },
  headerView: {
    overflow: "visible",
  },
});

export default Home;
