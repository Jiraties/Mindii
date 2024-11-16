import LottieView from "lottie-react-native";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { Skeleton } from "moti/skeleton";
import { useState } from "react";
import { useSelector } from "react-redux";

import RootContainer from "../components/RootContainer";
import CustomButton from "../components/CustomButton";
import { RootState } from "../context/store";
import { conclusion } from "../models/conclusionTypes";
import { StackNavigation } from "../../App";
import { Shadows, Fonts } from "../constants/styles";

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
  irritable_bowel: {
    diseaseName: "ลำไส้แปรปรวน",
    description:
      "ลำไส้แปรปรวนเป็นภาวะการทำงานของลำไส้ที่ผิดปกติ ทำให้เกิดอาการปวดท้องร่วมกับการขับถ่ายที่เปลี่ยนไป โดยอาจเปลี่ยนที่ความถี่ หรือลักษณะของอุจจาระ โรคนี้มักเรื้อรั้งโดยอาการอาจเป็นๆ หายๆ ซึ่งแม้จะไม่ใช่โรคร้ายแรงแต่ส่งผลต่อคุณภาพชีวิต",
    flags: [],
    imageUri:
      "https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_6292_44959658610231484248.jpg",
  },

  tricuriasis: {
    diseaseName: "โรคพยาธิแส้ม้า",
    description:
      "   โรคพยาธิเเส้ม้า คือโรคที่เกิดจากพยาธิตัวกลมที่ชื่อ ทริคูริส ทริคิยูร่า (Trichuris trichiura) หรือที่เรียกกันว่า พยาธิเเส้ม้า ที่เรียกอย่างนี้เพราะตัวพยาธิมีรูปร่างคล้ายเเส้ โดยมีหัวเรียวยาวคล้ายปลายเเส้ เเละส่วนท้ายของลำตัวอ้วนใหญ่คล้ายด้ามเเส้ พยาธิตัวเต็มวัยใช้ส่วนหัวฝังอยู่ในบริเวณลำไส้ใหญ่ส่วนต้น พยาธิตัวผู้มีความยาวประมาณ 30-45 มม. ส่วนพยาธิตัวเมียมีความยาวประมาณ 35-50 มม.",
    flags: [],
    imageUri:
      "https://www.lenntech.com/images/Water%20Borne%20Diseases/trichuriasis.jpg",
  },
  lactase_deficiency: {
    diseaseName: "ภาวะพร่องแล็กเทส",
    description:
      "ส ควรดูแลรักษา และปฏิบัติตัวตามคำแนะนำของแพทย์ ดังนี้ ดื่มนมครั้งละน้อย (น้อยกว่า 200 มล.) หรือดื่มพร้อมอาหารมื้อหลัก หรือบริโภคโยเกิร์ต (ซึ่งผ่านการย่อยจากแบคทีเรียมาระดับหนึ่งแล้ว) ก็อาจไม่ทำให้เกิดอาการได้ หรือลดอาการให้น้อยลงได้",
    flags: [],
    imageUri:
      "https://samitivej-prod-new-website.s3.ap-southeast-1.amazonaws.com/public/uploads/contents/dcbaff3c2bc12cf75a6caa9fec1d8f20.jpg",
  },
  typhoid: {
    diseaseName: "ไข้ทัยฟอยด์",
    description:
      "ไข้ทัยฟอยด์ หรือไข้พาราทิฟอยด์ คือโรคที่เกิดจากการติดเชื้อแบคทีเรียซาลโมเนลลา ที่เป็นเชื้อที่อยู่ในกลุ่มเชื้อที่ทำให้เกิดอาการปวดท้อง อาเจียน ถ่ายเหลว และไข้สูง โดยเชื้อนี้สามารถติดต่อผ่านทางอาหารหรือน้ำดื่มที่มีเชื้อ",
    flags: ["visitDoctor"],
    imageUri:
      "https://lirp.cdn-website.com/69c0b277/dms3rep/multi/opt/Typhoid+Fever+Symptoms-+Causes-+Risk+Factors-+Complications-+Diagnosis+-+Prevention-640w.jpg",
  },
  diabetes: {
    diseaseName: "โรคเบาหวาน",
    description:
      "โรคเบาหวาน คือ โรคที่เกิดจากการเกิดขึ้นของระดับน้ำตาลในเลือดที่สูงเกินไป โดยที่ระดับน้ำตาลในเลือดที่สูงเกินไปนี้เกิดจากการขาดฮอร์โมนอินซูลิน หรือเซลล์ที่ตอบสนองต่อฮอร์โมนอินซูลินไม่ได้ ทำให้เกิดอาการของโรคเบาหวาน",
    flags: ["visitDoctor"],
    imageUri:
      "https://www.bumrungrad.com/-/media/project/bumrungrad/conditions/diabetes/diabetes-featured-image.jpg",
  },
  tetanus: {
    diseaseName: "โรคบาดทะยัก",
    description:
      "การติดเชื้อแบคทีเรีย น้ำลายสัตว์เลี้ยงลูกด้วยนม โดยการติดเชื้ออาจส่งผลต่อระบบประสาท ทำให้กล้ามเนื้อตึงหรือแข็งเกร็ง",
    flags: ["visitDoctor"],
  },
  heatstroke: {
    description:
      "สภาพอากาศที่ร้อนจัด ทำให้อุณหภูมิในร่างกายสูงขึ้นอย่างรวดเร็ว จนไม่สามารถระบายความร้อนออกได้ทันที",
    flags: ["visitDoctor"],
  },
};

const Conclusions: React.FC<{ conclusionId: string }> = (props) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const navigation = useNavigation<StackNavigation>();
  const navigationRouteHistory = useNavigationState((state) => state.routes);
  const diseaseId = useSelector(
    (state: RootState) => state.conclusion.displayConclusion.diseaseId
  );
  const diagnosisData = useSelector(
    (state: RootState) => state.conclusion.displayConclusion.diagnosisData
  );

  const previousScreenName =
    navigationRouteHistory[navigationRouteHistory.length - 2].name;
  const lastScreenWasDiagnosis = previousScreenName === "diagnosis";

  if (diseaseId === "no_match") {
    return (
      <RootContainer>
        <ScrollView>
          <View style={s.conclusionsRootContainer}>
            <View>
              <Text style={s.headerText}>ทางเราขออภัยอย่างยิ่ง</Text>
              <Text style={s.headerTextHighlight}>
                เราไม่พบโรคที่ตรงกับข้อมูลของคุณ
              </Text>
            </View>

            <View
              style={{
                width: "auto",
                backgroundColor: "#fdfdfd",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                ...Shadows.default,
              }}
            >
              <LottieView
                source={require("../../assets/animations/failAnimation.json")}
                autoPlay
                style={{ width: 300, height: 300 }}
              />
            </View>

            <Text style={s.descriptionText}></Text>
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
              onPress={() => {
                console.log(previousScreenName);

                if (previousScreenName === "diagnosis")
                  navigation.navigate("home");
                else navigation.goBack();
              }}
            >
              <Text style={s.returnButton__text}>กลับ</Text>
            </CustomButton>
          </View>
        </ScrollView>
      </RootContainer>
    );
  }

  console.log(conclusionsList[diseaseId]);

  if (conclusionsList[diseaseId] !== undefined) {
    return (
      <RootContainer>
        <ScrollView>
          <View style={s.conclusionsRootContainer}>
            <View>
              <Text style={s.headerText}>
                {lastScreenWasDiagnosis ? "คุณมีความเสี่ยงเป็น" : ``}
              </Text>
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
              onPress={() => {
                if (previousScreenName === "diagnosis")
                  navigation.navigate("home");
                else navigation.goBack();
              }}
            >
              <Text style={s.returnButton__text}>กลับ</Text>
            </CustomButton>
          </View>
        </ScrollView>
      </RootContainer>
    );
  } else {
    return (
      <RootContainer>
        <Text>The disease {diseaseId} is still in the works</Text>
        <CustomButton
          style={s.returnButton}
          onPress={() => {
            if (previousScreenName === "diagnosis") navigation.navigate("home");
            else navigation.goBack();
          }}
        >
          <Text style={s.returnButton__text}>กลับ</Text>
        </CustomButton>
      </RootContainer>
    );
  }
};

const s = StyleSheet.create({
  conclusionsRootContainer: {
    flexDirection: "column",
    gap: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: Fonts.regular,
  },
  headerTextHighlight: {
    fontSize: 40,
    // color: "blue",
    fontFamily: Fonts.regular,
  },
  conclusionsTag: {
    backgroundColor: "#f54254",
    padding: 10,
    borderRadius: 10,
    marginRight: "auto",
  },
  conclusionsTag__text: {
    color: "#fcdcdf",
    fontFamily: Fonts.regular,
  },
  image: {
    height: 250,
    borderRadius: 30,
    ...Shadows.default,
  },
  descriptionText: {
    fontFamily: Fonts.regular,
  },
  remedies: {
    backgroundColor: "#fdfdfd",
    padding: 20,
    borderRadius: 20,
    ...Shadows.default,
  },
  remedies__text: {
    fontFamily: Fonts.regular,
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
    fontFamily: Fonts.regular,
  },
});

export default Conclusions;
