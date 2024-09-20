import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../components/CustomButton";
import { ScrollView } from "react-native";

const Diagnosis = (props) => {
  const navigation = useNavigation();

  return (
    <View style={[s.home, s.rootContainer]}>
      <Image
        blurRadius={70}
        source={require("../../assets/images/homeBackground.png")}
        style={{ position: "absolute" }}
      />
      <Text style={s.headerText}>
        {/* เริ่มจากอาการที่คุณรู้สึกว่ากระทบคุณมากที่สุด */}
        มาประเมินโรคกัน
      </Text>
      <ScrollView style={s.diagnosisList}>
        <View style={s.diagnosisListItem}>
          <Text style={s.diagnosisListItem__titleText}>🌡️ ไข้ขึ้น</Text>
          <Text style={s.diagnosisListItem__descriptionText}>
            ไข้เป็นสิ่งบ่งบอกว่ามีสิ่งผิดปกติเกิดขึ้นในร่างกาย
          </Text>
          <CustomButton>
            <Text>Next</Text>
          </CustomButton>
        </View>
        <View style={s.diagnosisListItem}>
          <Text style={s.diagnosisListItem__titleText}>😵‍💫 ปวดหัว</Text>
          <Text style={s.diagnosisListItem__descriptionText}>
            อาการปวดหัวมีหลายรูปแบบทั้งปวดหัวแบบถูกกดบีบ ปวดหัวแปล๊บ ๆ
            ปวดหัวจี๊ด ๆ ปวดหัวตุบ ๆ หรือปวดหัวตื้อ ๆ
          </Text>
          <CustomButton>
            <Text>Next</Text>
          </CustomButton>
        </View>
        <View style={s.diagnosisListItem}>
          <Text style={s.diagnosisListItem__titleText}>🤧 ไอ</Text>
          <Text style={s.diagnosisListItem__descriptionText}>
            เป็นการตอบสนองของร่างกาย
            เมื่อมีสิ่งแปลกปลอมที่ทำให้เกิดการระคายเคืองในทางเดินหายใจ
          </Text>
          <CustomButton>
            <Text>Next</Text>
          </CustomButton>
        </View>
        <View style={s.diagnosisListItem}>
          <Text style={s.diagnosisListItem__titleText}>🤮 อาเจียน</Text>
          <Text style={s.diagnosisListItem__descriptionText}>
            เป็นการตอบสนองของร่างกาย
            เมื่อมีสิ่งแปลกปลอมที่ทำให้เกิดการระคายเคืองในทางเดินหายใจ
          </Text>
          <CustomButton>
            <Text>Next</Text>
          </CustomButton>
        </View>
      </ScrollView>

      <CustomButton
        style={s.homeListItem__button}
        pressedStyle={s.homeListItem__buttonPressed}
        onPress={() => navigation.navigate("home")}
      >
        <Text style={s.homeListItem__buttonText}>กลับหน้่าโฮม</Text>
      </CustomButton>
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
  homeListItem__button: {
    backgroundColor: "#3246FF",
    width: "40%",
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },
  homeListItem__buttonText: {
    color: "#fff",
    fontFamily: "SemiBold",
  },
  diagnosisList: {
    marginTop: 20,
    height: "50%",
  },
  diagnosisListItem: {
    width: "100%",
    backgroundColor: "#fff",

    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  diagnosisListItem__titleText: {
    fontSize: 20,
    fontFamily: "SemiBold",
    flex: 1,
  },
  diagnosisListItem__descriptionText: {
    flex: 1.5,
    fontFamily: "SemiBold",
  },
});

export default Diagnosis;
