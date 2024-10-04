import { StyleSheet, View, ScrollView, Text, Appearance } from "react-native";
import { StatusBar } from "expo-status-bar";

import HomeListItem from "../components/HomeListItem";
import RootContainer from "../components/RootContainer";

const Home = (props) => {
  const username = "จิรัฏฐ์ ชูตระกูล";

  return (
    <RootContainer>
      <View style={s.headerView}>
        <Text style={s.headerText}>สวัสดีครับ</Text>
        <Text style={s.headerTextHighlight}>{username}</Text>
      </View>
      <ScrollView style={s.homeList} alwaysBounceVertical={false}>
        <HomeListItem
          text="ประเมินความเสี่ยงโรคเบื้องต้น 🧑‍⚕️"
          button="เริ่มเลย!"
          image
          redirectTo="diagnosis"
        />
        {/* <HomeListItem
          text="ประเมินความเสี่ยงเป็นโรคซึมเศร้า 🌧️"
          button="เริ่มเลย!"
          image={false}
          redirectTo="home"
        /> */}
        <HomeListItem
          text="Conclusions TEST!!!"
          button="เริ่มเลย!"
          image={false}
          redirectTo="conclusions"
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
    color: "blue",
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
