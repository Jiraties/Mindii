import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import HomeListItem from "../components/HomeListItem";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const Home = (props) => {
  const username = "กรรมการ AC Innovation";
  const isIpad = screenWidth >= 1100 && screenHeight >= 800;

  return (
    <View style={[s.home, s.rootContainer]}>
      <Image
        blurRadius={70}
        source={require("../../assets/images/homeBackground.png")}
        style={isIpad ? s.imageBackground__ipad : s.imageBackground}
      />
      <View style={s.headerView}>
        <Text style={s.headerText}>สวัสดีครับ</Text>
        <Text style={s.headerTextHighlight}>{username}</Text>
      </View>
      <ScrollView
        style={isIpad ? s.homeList__ipad : s.homeList}
        alwaysBounceVertical={false}
      >
        <HomeListItem
          text="ตรวจเช็คโรคเบื้องต้น 🧑‍⚕️"
          button="เริ่มเลย!"
          image
          redirectTo="diagnosis"
        />
        <HomeListItem
          text="ประเมินความเสี่ยงเป็นโรคซึมเสร้า 🌧️"
          button="เริ่มเลย!"
          image={false}
          redirectTo="home"
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
  imageBackground: {
    position: "absolute",
  },
  imageBackground__ipad: {
    position: "absolute",
    width: screenWidth,
  },
});

export default Home;
