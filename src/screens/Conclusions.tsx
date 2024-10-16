import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import RootContainer from "../components/RootContainer";
import CustomButton from "../components/CustomButton";
import { conclusion } from "../models/conclusionTypes";
import { Skeleton } from "moti/skeleton";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";
import { StackNavigation } from "../../App";

export const conclusionsList = {
  malaria: {
    diseaseName: "มาลาเรีย",
    description: " ควรกินยาลดไข้ ควรกินยารักษามาลาเรีย",
    flags: ["visitDoctor"],
    imageUri:
      "https://www.cdc.gov/malaria/media/images/1_Anopheles_gambiae.jpg",
  },
  thyroid: {
    diseaseName: "ต่อมไทรอยด์ทำงานเกิน คอพอกเป็นพิษ",
    description:
      "ต่อมไทรอยด์ คือ ต่อมไร้ท่อที่อยู่บริเวณลำคอด้านหน้าต่ำกว่าลูกกระเดือกเล็กน้อยมีรูปร่างคล้ายผีเสื้อ ประกอบด้วยปีกซ้ายและขวาคอยทำหน้าที่สร้างฮอร์โมนไทรอยด์ ซึ่งออกฤทธิ์ต่อหลายอวัยวะ เช่นการทำงานของหัวใจและระบบประสาท พัฒนาการของสมองในวัยเด็กรวมถึงระบบเผาผลาญพลังงานของร่างกาย เป็นต้น",
    flags: ["visitDoctor"],
    imageUri: "https://www.vibhavadi.com/images/healthex/4299_01639541039.jpg",
  },
  giardia: {
    diseaseName: "ท้องเสียจากเชื้อไกอาร์เดีย",
    description:
      "เป็นโปรโตซัว (สัตว์เซลล์เดียว) ชนิดหนึ่งแบบเดียวกับอะมีบา สามารถเข้าไปทำให้เกิดการติดเชื้อที่ลำไส้เล็ก กลายเป็นโรคท้องเดินทั้งชนิดเฉียบพลันและเรื้อรังได้",
    flags: [],
    imageUri: "https://cth.co.th/wp-content/uploads/2021/05/Giardiasis2.jpg",
  },
};

const Conclusions: React.FC<{ conclusionId: string }> = (props) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const navigation = useNavigation<StackNavigation>();
  const diseaseId = useSelector(
    (state: RootState) => state.conclusion.displayConclusion.diseaseId
  );
  const diagnosisData = useSelector(
    (state: RootState) => state.conclusion.displayConclusion.diagnosisData
  );

  return (
    <RootContainer>
      <ScrollView>
        <View style={s.conclusionsRootContainer}>
          <View>
            <Text style={s.headerText}>คุณมีความเสี่ยงเป็น</Text>
            <Text style={s.headerTextHighlight}>
              {conclusionsList[diseaseId].diseaseName}
            </Text>
          </View>

          {conclusionsList[diseaseId].flags.map((flag, index) => {
            if (flag === "visitDoctor") {
              return (
                <View style={s.conclusionsTag} key={index}>
                  <Text style={s.conclusionsTag__text}>ควรพบแพทย์ทันที</Text>
                </View>
              );
            }
          })}

          {imageIsLoading && (
            <Skeleton height={250} width={"100%"} colorMode="light" />
          )}
          <Image
            style={s.image}
            source={{
              uri: conclusionsList[diseaseId].imageUri,
            }}
            onLoad={() => setImageIsLoading(false)}
          />
          <Text style={s.descriptionText}>
            {conclusionsList[diseaseId].description}
          </Text>
          <View style={s.remedies}>
            <Text style={s.remedies__text}>
              อาการที่คุณเลือก:{"  "}
              {diagnosisData.symptomList.map(
                (symptom, index) => symptom.name + " "
              )}
            </Text>
          </View>
          <CustomButton
            style={s.returnButton}
            onPress={() => navigation.navigate("home")}
          >
            <Text style={s.returnButton__text}>กลับ</Text>
          </CustomButton>
        </View>
      </ScrollView>
    </RootContainer>
  );
};

const s = StyleSheet.create({
  conclusionsRootContainer: {
    flexDirection: "column",
    gap: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "SemiBold",
  },
  headerTextHighlight: {
    fontSize: 40,
    // color: "blue",
    fontFamily: "SemiBold",
  },
  conclusionsTag: {
    backgroundColor: "#f54254",
    padding: 10,
    borderRadius: 10,
    marginRight: "auto",
  },
  conclusionsTag__text: {
    color: "#fcdcdf",
    fontFamily: "SemiBold",
  },
  image: {
    height: 250,
    borderRadius: 30,
  },
  descriptionText: {
    fontFamily: "SemiBold",
  },
  remedies: {
    backgroundColor: "#fdfdfd",
    padding: 20,
    borderRadius: 20,
  },
  remedies__text: {
    fontFamily: "SemiBold",
  },
  returnButton: {
    backgroundColor: "#3246FF",
    padding: 20,
    marginTop: 30,
    borderRadius: 20,
    marginBottom: 40,
  },
  returnButton__text: {
    color: "#fff",
    fontFamily: "SemiBold",
  },
});

export default Conclusions;
