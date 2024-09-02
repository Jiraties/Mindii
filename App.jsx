import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";

import Home from "./src/pages/Home";
import HomeListItem from "./src/components/HomeListItem";

export default function App() {
  const username = "จิรัฏฐ์ ชูตระกูล ";

  return (
    <View style={s.container}>
      <View style={s.headerView}>
        <Text style={s.headerText}>สวัสดีคุณ</Text>
        <Text style={s.headerTextHighlight}>{username}</Text>
      </View>

      <ScrollView style={s.homeList} alwaysBounceVertical={false}>
        <HomeListItem text="ตรวจเช็คโรคเบื้องตัน 🧑‍⚕️" button="เริ่มเลย!" />
        <HomeListItem text="ตรวจเช็คโรคเบื้องตัน 🧑‍⚕️" button="เริ่มเลย!" />
        <HomeListItem text="ตรวจเช็คโรคเบื้องตัน 🧑‍⚕️" button="เริ่มเลย!" />
        <HomeListItem text="ตรวจเช็คโรคเบื้องตัน 🧑‍⚕️" button="เริ่มเลย!" />
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    padding: 20,
    paddingTop: 100,
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
  },
  homeList: {
    marginTop: 30,
  },
  homeListItem: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    height: 175,
  },
  homeListItem__text: {
    fontSize: 20,
  },
  homeListItem__button: {
    backgroundColor: "blue",
    width: "40%",
    height: 40,
    borderRadius: 100,
    alignContent: "center",
  },
});
