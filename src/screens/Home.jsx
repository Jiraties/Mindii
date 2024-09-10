import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";

import HomeListItem from "../components/HomeListItem";

const Home = (props) => {
  const username = "น้องกรซิ่ง";

  return (
    <View style={[s.home, s.rootContainer]}>
      <Image
        blurRadius={70}
        source={require("../../assets/images/homeBackground.png")}
        style={{ position: "absolute" }}
      />
      <View style={s.headerView}>
        <Text style={s.headerText}>สวัสดีคุณ</Text>
        <Text style={s.headerTextHighlight}>{username}</Text>
      </View>
      <ScrollView style={s.homeList} alwaysBounceVertical={false}>
        <HomeListItem
          text="ตรวจเช็คโรคเบื้องต้น 🧑‍⚕️"
          button="เริ่มเลย!"
          image
          redirectTo="diagnosis"
        />
        {/* <HomeListItem
          text="ทดสอบ"
          button="ทดสอบ"
          image
          redirectTo="diagnosis"
        />
        <HomeListItem
          text="ทดสอบ"
          button="ทดสอบ"
          image
          redirectTo="diagnosis"
        />
        <HomeListItem
          text="ทดสอบ"
          button="ทดสอบ"
          image
          redirectTo="diagnosis"
        /> */}
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
