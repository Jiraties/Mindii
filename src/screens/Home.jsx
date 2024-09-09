import { StyleSheet, View, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import HomeListItem from "../components/HomeListItem";

const Home = (props) => {
  const username = "จิรัฏฐ์ ชูตระกูล ";

  return (
    <View style={[s.home, s.rootContainer]}>
      <View style={s.headerView}>
        <Text style={s.headerText}>สวัสดีคุณ</Text>
        <Text style={s.headerTextHighlight}>{username}</Text>
      </View>
      <ScrollView style={s.homeList} alwaysBounceVertical={false}>
        <HomeListItem text="ตรวจเช็คโรคเบื้องต้น 🧑‍⚕️" button="เริ่มเลย!" />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
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
    textAlign: "left",
    fontSize: 40,
    fontFamily: "IBM Plex Sans Thai",
  },
  headerTextHighlight: {
    textAlign: "left",
    fontSize: 40,
    color: "blue",
    fontFamily: "IBMPlexSansThai_600SemiBold",
  },
  homeList: {
    marginTop: 30,
    overflow: "visible",
  },
});

export default Home;
