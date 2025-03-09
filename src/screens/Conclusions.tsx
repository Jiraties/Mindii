import LottieView from "lottie-react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
} from "react-native";
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
import { SymbolView } from "expo-symbols";

const filler_image =
  "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

const ai_generated = {
  // Existing conclusions...
  acute_gastritis: {
    diseaseName: "โรคกระเพาะอาหารอักเสบเฉียบพลัน",
    description: "การอักเสบของเยื่อบุกระเพาะอาหาร",
    remedies: "หลีกเลี่ยงอาหารรสจัดและแอลกอฮอล์ ทานยาลดกรดตามแพทย์สั่ง",
    flags: ["visitDoctor"],
    imageUri: filler_image,
  },
  severe_cirrhosis: {
    diseaseName: "โรคตับแข็งขั้นรุนแรง",
    description: "การทำลายเนื้อเยื่อตับอย่างรุนแรง",
    remedies: "หลีกเลี่ยงแอลกอฮอล์ ทานยาตามแพทย์สั่ง",
    flags: ["visitDoctor"],
    imageUri: filler_image,
  },
  peptic_ulcer: {
    diseaseName: "แผลในกระเพาะอาหาร",
    description: "แผลที่เกิดขึ้นในเยื่อบุกระเพาะอาหาร",
    remedies: "หลีกเลี่ยงอาหารรสจัด ทานยาลดกรดตามแพทย์สั่ง",
    flags: ["visitDoctor"],
    imageUri: filler_image,
  },
  stomach_cancer: {
    diseaseName: "มะเร็งกระเพาะอาหาร",
    description: "การเจริญเติบโตของเซลล์มะเร็งในกระเพาะอาหาร",
    remedies: "พบแพทย์เพื่อรับการรักษา",
    flags: ["visitDoctor"],
    imageUri: filler_image,
  },
  possible_meningitis_or_brain_injury: {
    diseaseName: "อาจเป็นเยื่อหุ้มสมองอักเสบหรือบาดเจ็บที่สมอง",
    description:
      "อาการที่อาจเกิดจากการอักเสบของเยื่อหุ้มสมองหรือบาดเจ็บที่สมอง",
    remedies: "พบแพทย์ทันที",
    flags: ["visitDoctor"],
    imageUri: filler_image,
  },
  chronic_abdominal_pain: {
    diseaseName: "อาการปวดท้องเรื้อรัง",
    description: "อาการปวดท้องที่เกิดขึ้นเป็นเวลานาน",
    remedies: "พบแพทย์เพื่อรับการวินิจฉัยและรักษา",
    flags: ["visitDoctor"],
    imageUri: filler_image,
  },
  possible_jaundice: {
    diseaseName: "อาจเป็นดีซ่าน",
    description: "ภาวะที่ผิวหนังและตาเหลืองเนื่องจากระดับบิลิรูบินในเลือดสูง",
    remedies: "พบแพทย์เพื่อรับการวินิจฉัยและรักษา",
    flags: ["visitDoctor"],
    imageUri: filler_image,
  },
  side_effect_from_medication: {
    diseaseName: "ผลข้างเคียงจากยา",
    description: "อาการที่เกิดจากการใช้ยาบางชนิด",
    remedies: "ปรึกษาแพทย์เพื่อปรับเปลี่ยนยา",
    flags: ["visitDoctor"],
    imageUri: filler_image,
  },
  pregnancy: {
    diseaseName: "การตั้งครรภ์",
    description: "ภาวะที่เกิดจากการตั้งครรภ์",
    remedies: "พบแพทย์เพื่อรับการดูแลและคำแนะนำ",
    flags: ["visitDoctor"],
    imageUri: filler_image,
  },
  chronic_kidney_failure: {
    diseaseName: "ไตวายเรื้อรัง",
    description: "ภาวะที่ไตสูญเสียความสามารถในการกรองของเสียจากเลือด",
    remedies: "พบแพทย์เพื่อรับการรักษา",
    flags: ["visitDoctor"],
    imageUri: filler_image,
  },
  indigestion_or_chronic_biliary_colic: {
    diseaseName: "อาการอาหารไม่ย่อยหรือปวดท้องเรื้อรัง",
    description: "อาการปวดท้องที่เกิดจากการย่อยอาหารไม่สมบูรณ์",
    remedies: "หลีกเลี่ยงอาหารที่กระตุ้นอาการ ทานยาตามแพทย์สั่ง",
    flags: ["visitDoctor"],
    imageUri: filler_image,
  },
  intestinal_parasites: {
    diseaseName: "พยาธิในลำไส้",
    description: "การติดเชื้อพยาธิในลำไส้",
    remedies: "ทานยาถ่ายพยาธิตามคำแนะนำของแพทย์",
    flags: ["visitDoctor"],
    imageUri: filler_image,
  },
  chronic_vomiting_in_children: {
    diseaseName: "อาเจียนเรื้อรังในเด็ก",
    description: "อาการอาเจียนที่เกิดขึ้นเป็นเวลานานในเด็ก",
    remedies: "พบแพทย์เพื่อรับการวินิจฉัยและรักษา",
    flags: ["visitDoctor"],
    imageUri: filler_image,
  },
  fever_with_fatigue_or_infection: {
    diseaseName: "ไข้ร่วมกับอ่อนเพลียหรือการติดเชื้อ",
    description: "อาการไข้ที่เกิดร่วมกับอาการอ่อนเพลียหรือการติดเชื้อ",
    remedies: "พักผ่อน ดื่มน้ำมาก ๆ พบแพทย์เพื่อรับการรักษา",
    flags: ["visitDoctor"],
    imageUri: filler_image,
  },
  other_possible_causes: {
    diseaseName: "สาเหตุอื่น ๆ ที่เป็นไปได้",
    description: "อาการที่อาจเกิดจากสาเหตุอื่น ๆ",
    remedies: "พบแพทย์เพื่อรับการวินิจฉัยและรักษา",
    flags: ["visitDoctor"],
    imageUri: filler_image,
  },
  possible_cough_induced_vomiting: {
    diseaseName: "อาเจียนจากการไอ",
    description: "อาการอาเจียนที่เกิดจากการไอ",
    remedies: "พักผ่อน ดื่มน้ำมาก ๆ พบแพทย์เพื่อรับการรักษา",
    flags: ["visitDoctor"],
    imageUri: filler_image,
  },
};

export const conclusionsList = {
  malaria: {
    diseaseName: "มาลาเรีย",
    description: "ควรกินยาลดไข้ ควรกินยารักษามาลาเรีย",
    remedies:
      "กินยารักษามาลาเรียตามคำแนะนำของแพทย์ ดื่มน้ำเยอะ ๆ พักผ่อนให้เพียงพอ",
    flags: ["visitDoctor"],
    imageUri:
      "https://www.cdc.gov/malaria/media/images/1_Anopheles_gambiae.jpg",
  },
  thyroid: {
    diseaseName: "ต่อมไทรอยด์ทำงานเกิน คอพอกเป็นพิษ",
    description:
      "ต่อมไทรอยด์ทำงานผิดปกติ ส่งผลต่อการทำงานของระบบต่าง ๆ ในร่างกาย",
    remedies: "ลดความเครียด ทานอาหารสมดุล พบแพทย์เพื่อปรับฮอร์โมน",
    flags: ["visitDoctor"],
    imageUri: "https://www.vibhavadi.com/images/healthex/4299_01639541039.jpg",
  },
  giardia: {
    diseaseName: "ท้องเสียจากเชื้อไกอาร์เดีย",
    description: "การติดเชื้อที่ลำไส้เล็ก ทำให้เกิดอาการท้องเสีย",
    remedies: "ดื่มน้ำเกลือแร่ หลีกเลี่ยงอาหารรสจัดและดิบ พักผ่อนให้เพียงพอ",
    flags: [],
    imageUri: "https://cth.co.th/wp-content/uploads/2021/05/Giardiasis2.jpg",
  },
  irritable_bowel: {
    diseaseName: "ลำไส้แปรปรวน",
    description: "ภาวะลำไส้ทำงานผิดปกติ ทำให้เกิดอาการปวดท้องและขับถ่ายผิดปกติ",
    remedies:
      "หลีกเลี่ยงอาหารที่กระตุ้นอาการ เช่น อาหารรสจัดและไขมันสูง ทานอาหารมีกากใย",
    flags: [],
    imageUri:
      "https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_6292_44959658610231484248.jpg",
  },
  tricuriasis: {
    diseaseName: "โรคพยาธิแส้ม้า",
    description: "เกิดจากพยาธิตัวกลมที่อยู่ในลำไส้ใหญ่",
    remedies: "รักษาความสะอาด ทานยาถ่ายพยาธิตามคำแนะนำของแพทย์",
    flags: [],
    imageUri:
      "https://www.lenntech.com/images/Water%20Borne%20Diseases/trichuriasis.jpg",
  },
  lactase_deficiency: {
    diseaseName: "ภาวะพร่องแล็กเทส",
    description: "ร่างกายย่อยแลคโตสในนมได้ไม่สมบูรณ์",
    remedies:
      "ดื่มนมทีละน้อยหรือดื่มนมที่ไม่มีแลคโตส เลือกโยเกิร์ตหรือชีสแทนนมสด",
    flags: [],
    imageUri:
      "https://samitivej-prod-new-website.s3.ap-southeast-1.amazonaws.com/public/uploads/contents/dcbaff3c2bc12cf75a6caa9fec1d8f20.jpg",
  },
  typhoid: {
    diseaseName: "ไข้ทัยฟอยด์",
    description: "โรคจากเชื้อแบคทีเรียซาลโมเนลลา มีอาการปวดท้องและไข้สูง",
    remedies: "ดื่มน้ำเยอะ ๆ พักผ่อน ทานยาฆ่าเชื้อตามแพทย์สั่ง",
    flags: ["visitDoctor"],
    imageUri:
      "https://lirp.cdn-website.com/69c0b277/dms3rep/multi/opt/Typhoid+Fever+Symptoms-+Causes-+Risk+Factors-+Complications-+Diagnosis+-+Prevention-640w.jpg",
  },
  diabetes: {
    diseaseName: "โรคเบาหวาน",
    description: "ระดับน้ำตาลในเลือดสูงผิดปกติจากการขาดอินซูลิน",
    remedies: "ควบคุมอาหาร ออกกำลังกาย ทานยาหรือฉีดอินซูลินตามแพทย์สั่ง",
    flags: ["visitDoctor"],
    imageUri:
      "https://alokamedicare.in/wp-content/uploads/2022/07/Diabetes-Alokamedicare-1024x1024.jpg",
  },
  tetanus: {
    diseaseName: "โรคบาดทะยัก",
    description: "การติดเชื้อแบคทีเรียส่งผลต่อระบบประสาท",
    remedies: "ทำแผลให้สะอาดทันที พบแพทย์เพื่อฉีดวัคซีนป้องกันบาดทะยัก",
    imageUri:
      "https://www.scientificanimations.com/wp-content/uploads/2020/02/3D-medical-animation-of-tatanus.jpg",
    flags: ["visitDoctor"],
  },
  heatstroke: {
    diseaseName: "โรคลมร้อน",
    description: "อุณหภูมิในร่างกายสูงจนเกิดอาการอ่อนเพลียและอันตราย",
    remedies: "พักในที่ร่ม ดื่มน้ำให้มาก เช็ดตัวลดไข้",
    flags: ["visitDoctor"],
    imageUri:
      "https://familyfirster.com/wp-content/uploads/2022/06/heatstroke-symptoms.jpeg",
  },
  pneumonia: {
    diseaseName: "โรคปอดอักเสบ",
    description: "การติดเชื้อหรือการระคายเคืองในปอด",
    remedies: "พักผ่อน ทานยาปฏิชีวนะตามแพทย์สั่ง",
    flags: ["visitDoctor"],
    imageUri:
      "https://bgh.sgp1.digitaloceanspaces.com/old-site/inline-images/shutterstock_417318079.jpg",
  },
  dengue: {
    diseaseName: "โรคไข้เลือดออก",
    description: "การติดเชื้อไวรัสเดงกีจากยุงลาย",
    remedies: "ดื่มน้ำมาก ๆ เช็ดตัวลดไข้ ไม่ใช้ยาแอสไพริน",
    flags: [],
    imageUri:
      "https://bgh.sgp1.digitaloceanspaces.com/old-site/inline-images/shutterstock_417318079.jpg",
  },
  tuberculosis: {
    diseaseName: "วัณโรค",
    description: "การติดเชื้อแบคทีเรียในปอด",
    remedies: "พักผ่อน ทานอาหารเสริมภูมิคุ้มกัน ทานยาตามแพทย์สั่ง",
    flags: ["visitDoctor"],
    imageUri:
      "https://www.pan-tb.org/wp-content/uploads/2023/04/What-is-tuberculosis.jpg",
  },
  sle: {
    diseaseName: "โรคแพ้ภูมิตนเอง",
    description: "ภาวะที่ระบบภูมิคุ้มกันทำงานผิดปกติ",
    remedies: "รับประทานยาตามแพทย์สั่ง หลีกเลี่ยงสารกระตุ้นอาการ เช่น แสงแดด",
    flags: [],
    imageUri:
      "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/Image-Galleries/Systemic-Lupus/642X361_SLIDE_2_Systemic_Lupus_Erythematosus.jpg?w=1155",
  },
  pericarditis: {
    diseaseName: "เยื่อหุ้มหัวใจอักเสบ",
    description: "การอักเสบของเยื่อหุ้มหัวใจ",
    remedies: "พักผ่อน ทานยาตามแพทย์สั่ง",
    flags: ["visitDoctor"],
    imageUri: "https://i.ytimg.com/vi/BXfnlCebHHE/maxresdefault.jpg",
  },
  ...ai_generated,
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
  // const imageUri = conclusionsList[diseaseId].imageUri ? true : false;

  const previousScreenName =
    navigationRouteHistory[navigationRouteHistory.length - 2].name;
  const lastScreenWasDiagnosis = previousScreenName === "diagnosis";

  if (diseaseId === "no_match" || diseaseId === "serious_no_match") {
    console.log("diseaseId", diseaseId);
    const isSerious = diseaseId === "serious_no_match";

    console.log("isSerious", isSerious);

    return (
      <RootContainer>
        <ScrollView>
          <View style={s.conclusionsRootContainer}>
            <View>
              <Text style={s.headerText}>ทางเราขออภัยอย่างยิ่ง</Text>
              <Text style={s.headerTextHighlight}>
                {isSerious
                  ? "เราแนะนำให้คุณพบแพทย์"
                  : "เราไม่พบโรคที่ตรงกับข้อมูลของคุณ"}
              </Text>
            </View>
            {isSerious && (
              <View style={s.conclusionsTag}>
                <Text style={s.conclusionsTag__text}>ควรพบแพทย์ทันที</Text>
              </View>
            )}

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

            <Text style={s.descriptionText}>
              {isSerious
                ? "เราขออภัยที่ไม่สามารถประเมินโรคจากข้อมูลอาการของคุณได้ในขณะนี้ อย่างไรก็ตาม เนื่องจากอาการของคุณดูมีความรุนแรง เราขอแนะนำให้คุณเข้ารับการตรวจและคำปรึกษาจากแพทย์โดยด่วนเพื่อความปลอดภัยและการรักษาที่เหมาะสม"
                : "เราขออภัยที่ไม่สามารถประเมินโรคจากข้อมูลอาการของคุณได้ในขณะนี้"}
            </Text>
            <View style={s.remedies}>
              <Text style={s.remedies__text}>
                อาการที่คุณเลือก:{"  "}
                {diagnosisData.symptomList.map(
                  (symptom, index) => symptom.name + " "
                )}
              </Text>
            </View>
          </View>
        </ScrollView>
        <CustomButton
          style={s.returnButton}
          onPress={() => {
            console.log(previousScreenName);

            if (previousScreenName === "diagnosis") navigation.navigate("home");
            else navigation.goBack();
          }}
        >
          <Text style={s.returnButton__text}>กลับ</Text>
        </CustomButton>
      </RootContainer>
    );
  }

  console.log(conclusionsList[diseaseId]);

  if (conclusionsList[diseaseId] !== undefined) {
    return (
      <RootContainer>
        <ScrollView style={{ overflow: "visible" }}>
          <View style={s.conclusionsRootContainer}>
            <View>
              <Text style={s.headerText}>
                {lastScreenWasDiagnosis
                  ? "คุณมีความเสี่ยงเป็น"
                  : "ขณะนั้นระบบเราประเมินว่าคุณเป็น"}
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

            <Image
              style={s.image}
              source={{
                uri: conclusionsList[diseaseId].imageUri,
              }}
              onLoadStart={() => setImageIsLoading(true)}
              onLoadEnd={() => setImageIsLoading(false)}
              onError={() => setImageIsLoading(false)}
            />

            <Text style={s.descriptionText}>
              {conclusionsList[diseaseId].description}
            </Text>
            <View style={s.remedies}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <SymbolView
                  name="stethoscope.circle.fill"
                  tintColor="#3246ff"
                  size={40}
                />
                <Text style={s.remedies__text}>การรักษาเบื้องต้น</Text>
              </View>
              <Text style={s.remedies__text}>
                {conclusionsList[diseaseId].remedies}
              </Text>
            </View>
            <View style={s.remedies}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <SymbolView
                  name="checkmark.circle.fill"
                  tintColor="#3246ff"
                  size={40}
                />
                <Text style={s.remedies__text}>อาการหลักที่คุณเลือก</Text>
              </View>
              <Text style={s.remedies__text}>
                {diagnosisData.symptomList.map(
                  (symptom, index) => symptom.name + " "
                )}
              </Text>
            </View>
            <CustomButton
              style={s.link}
              onPress={() =>
                Linking.openURL(
                  `https://www.google.com/search?q=${conclusionsList[diseaseId].diseaseName}`
                )
              }
            >
              <Text style={s.link__text}>อ่านเกี่ยวกับโรคเพิ่มเติมบนเว็บ</Text>
            </CustomButton>
          </View>
        </ScrollView>
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
    gap: 10,
    ...Shadows.default,
  },
  remedies__text: {
    fontFamily: Fonts.regular,
  },
  remedies__icon: {
    height: 20,
    width: 20,
  },
  returnButton: {
    backgroundColor: "#fdfdfd",
    position: "absolute",
    bottom: 30,
    left: 30,
    padding: 20,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  returnButton__text: {
    color: "#000",
    fontFamily: Fonts.regular,
  },
  link: {
    width: "100%",
    backgroundColor: "#3246FF",
    padding: 20,
    borderRadius: 20,
    ...Shadows.default,
    alignItems: "center",
    marginBottom: 50,
  },
  link__text: {
    color: "#fff",
    fontFamily: Fonts.regular,
  },
});

export default Conclusions;
