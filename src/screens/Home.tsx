import { StyleSheet, View, ScrollView, Text, Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

import HomeListItem from "../components/HomeListItem";
import RootContainer from "../components/RootContainer";

import CustomButton from "../components/CustomButton";
import { collection, setDoc, doc } from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "../../FirebaseConfig";
import { useSelector } from "react-redux";

const Home = (props) => {
  const username = useSelector(
    (state) => state.authentication.userInformation.name
  );

  async function fetchToken() {
    const storedToken = await AsyncStorage.getItem("token");
    console.log("The token is: ", storedToken);
  }

  fetchToken();

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
          warningModal
        />
        {/* <HomeListItem
          text="ประเมินความเสี่ยงเป็นโรคซึมเศร้า 🌧️"
          button="เริ่มเลย!"
          image={false}
          redirectTo="home"
        /> */}

        <HomeListItem
          text="ดูประวัติการประเมินโรคของคุณ"
          button="ไป"
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
