import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import HomeListItem from "../components/HomeListItem";
import RootContainer from "../components/RootContainer";

const Home = (props) => {
  const username = "กรรมการ AC Innovation";

  return (
    <RootContainer>
      <View style={s.headerView}>
        <Text style={s.headerText}>สวัสดีครับ</Text>
        <Text style={s.headerTextHighlight}>{username}</Text>
      </View>
      <ScrollView style={s.homeList} alwaysBounceVertical={false}>
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
});

export default Home;
