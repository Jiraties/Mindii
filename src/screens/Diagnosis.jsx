import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";

const Diagnosis = (props) => {
  const navigation = useNavigation();
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [originalSymptomList] = useState([
    {
      id: "fever",
      name: "🤒 ไข้",
      description:
        "ภาวะที่อุณหภูมิของร่างกายสูงกว่าปกติ บ่งบอกถึงการติดเชื้อหรืออาการอื่นๆ",
    },
    {
      id: "runny_nose",
      name: "🤧 น้ำมูกไหล",
      description: "เกิดจากการอักเสบของเยื่อบุจมูก มักเกิดจากการแพ้หรือหวัด",
    },
    {
      id: "cough",
      name: "😷 ไอ",
      description: "การตอบสนองของร่างกายต่อสิ่งแปลกปลอมในทางเดินหายใจ",
    },
    {
      id: "headache",
      name: "🤕 ปวดหัว",
      description:
        "รู้สึกปวดบริเวณศีรษะ อาจเกิดจากความเครียด ไมเกรน หรือภาวะอื่นๆ",
    },
    {
      id: "chills",
      name: "🤒 หนาวสั่น",
      description: "อาการที่รู้สึกหนาวและสั่น ร่วมกับมีไข้สูง",
    },
    {
      id: "nausea",
      name: "🤢 คลื่นไส้",
      description: "ความรู้สึกไม่สบายในกระเพาะอาหาร ที่อาจนำไปสู่อาเจียน",
    },
    {
      id: "stomach_pain",
      name: "🤕 ปวดท้อง",
      description: "อาการปวดหรือไม่สบายในช่องท้อง อาจเกิดจากปัญหาทางเดินอาหาร",
    },
    {
      id: "fatigue",
      name: "😴 อ่อนเพลีย",
      description:
        "รู้สึกเหนื่อยล้า ไม่มีพลังงาน อาจเกิดจากการนอนน้อยหรือความเครียด",
    },
    {
      id: "sore_throat",
      name: "🤒 เจ็บคอ",
      description: "รู้สึกเจ็บหรือแสบคอ มักเป็นอาการของการติดเชื้อในลำคอ",
    },
    {
      id: "ear_congestion",
      name: "👂 หูอื้อ",
      description:
        "ความรู้สึกเหมือนมีสิ่งอุดกั้นในหู อาจเกิดจากการติดเชื้อหรือเปลี่ยนความดันอากาศ",
    },
  ]);
  const [symptomList, setSymptionList] = useState(originalSymptomList);

  const searchFieldHandler = (text) => {
    setSearchFieldValue(text); // Update the search field value
    const filteredSymptomList = originalSymptomList.filter((symptom) => {
      return symptom.name.includes(text); // Use the 'text' parameter directly here
    });
    setSymptionList(filteredSymptomList); // Update the displayed list
  };

  const selectedSymptomHandler = (a) => {
    console.log(a);
  };

  return (
    <View style={[s.home, s.rootContainer]}>
      <Image
        blurRadius={70}
        source={require("../../assets/images/homeBackground.png")}
        style={{ position: "absolute" }}
      />
      <Text style={s.headerText}>มาประเมินโรคกัน</Text>
      <Text style={s.headerDescriptionText}>
        เริ่มจากการเลือกอาการที่กระทบที่สุด
      </Text>
      <TextInput
        placeholder="ค้นหาอาการที่ต้องการ..."
        style={s.searchField}
        value={searchFieldValue}
        onChangeText={searchFieldHandler} // Call the handler with each change
      />
      {symptomList.length === 0 && (
        <View style={s.diagnosisListItem__notFound}>
          <Text style={s.diagnosisListItem__notFoundText}>
            ไม่พบอาการที่คุณค้นหา ⛓️‍💥
          </Text>
        </View>
      )}
      <FlatList
        data={symptomList}
        keyExtractor={(symptom) => symptom.id}
        renderItem={({ item: symptom }) => {
          return (
            <View style={s.diagnosisListItem}>
              <Text style={s.diagnosisListItem__titleText}>{symptom.name}</Text>
              <Text style={s.diagnosisListItem__descriptionText}>
                {symptom.description}
              </Text>
              <CustomButton
                onPress={() => selectedSymptomHandler(symptom.id)}
                style={s.diagnosisListItem__button}
              >
                <Text style={s.diagnosisListItem__buttonText}>{">"}</Text>
              </CustomButton>
            </View>
          );
        }}
      />
    </View>
  );
};

const s = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 40,
    fontFamily: "SemiBold",
  },
  headerDescriptionText: {
    fontSize: 15,
    fontFamily: "SemiBold",
    marginBottom: 10,
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
    overflow: "visible",
  },
  diagnosisListItem__notFound: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  diagnosisListItem__notFoundText: {
    textAlign: "center",
    fontFamily: "SemiBold",
  },
  diagnosisListItem__titleText: {
    fontSize: 20,
    fontFamily: "SemiBold",
    flex: 1,
  },
  diagnosisListItem__descriptionText: {
    flex: 1,
    fontFamily: "SemiBold",
  },
  diagnosisListItem__button: {
    flex: 0.3,
    backgroundColor: "#3246FF",
    paddingVertical: 30,
    borderRadius: 100,
    justifyContent: "center",
  },
  diagnosisListItem__buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: 800,
  },
  searchField: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 100,
    marginBottom: 20,
    fontFamily: "SemiBold",
  },
  homeListItem__button: {
    position: "absolute",
    bottom: 40,
    right: 40,
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
  homeListItem__buttonPressed: {
    backgroundColor: "#2533b3",
    elevation: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});

export default Diagnosis;
