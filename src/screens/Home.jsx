import { StyleSheet, View, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

import HomeListItem from "../components/HomeListItem";

const Home = (props) => {
  const username = "จิรัฏฐ์";

  return (
    <View style={[s.home, s.rootContainer]}>
      <View style={s.headerView}>
        <Text style={s.headerText}>สวัสดีคุณ</Text>
        <Text style={s.headerTextHighlight}>{username}</Text>
      </View>
      <ScrollView style={s.homeList} alwaysBounceVertical={false}>
        <HomeListItem text="ตรวจเช็คโรคเบื้องต้น 🧑‍⚕️" button="เริ่มเลย!" />
        <HomeListItem
          text="Your previous diagnosis: Check them out!"
          button="เริ่มเลย!"
        />
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
    fontFamily: "SemiBold",
    fontWeight: 800,
    overflow: "visible",
  },
  headerTextHighlight: {
    textAlign: "left",
    fontSize: 40,
    color: "blue",
    fontFamily: "SemiBold",
    lineHeight: 55,
    overflow: "visible",
  },
  homeList: {
    marginTop: 30,
    overflow: "visible",
  },
  headerView: {
    overflow: "visible",
  },
});

export default Home;
