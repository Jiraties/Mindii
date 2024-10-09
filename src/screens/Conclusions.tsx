import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import RootContainer from "../components/RootContainer";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const Conclusions = (props) => {
  const navigation = useNavigation();

  const renderFlags = (flags) => {
    flags.map((flag) => {
      if (flag === "visitDoctor") {
        return (
          <View style={s.conclusionsTag}>
            <Text style={s.conclusionsTag__text}>ควรพบแพทย์ทันที</Text>
          </View>
        );
      }
    });
  };

  return (
    <RootContainer>
      <ScrollView>
        <View style={s.conclusionsRootContainer}>
          <View>
            <Text style={s.headerText}>คุณมีความเสี่ยงเป็น</Text>
            <Text style={s.headerTextHighlight}>
              {props.conclusion.diseaseName}
            </Text>
          </View>

          {props.conclusion.flags.map((flag, index) => {
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
              uri: props.conclusion.imageUri,
            }}
          />
          <Text style={s.descriptionText}>{props.conclusion.description}</Text>
          <View style={s.remedies}>
            <Text style={s.remedies__text}>
              เราแนะนำให้คุณพบแพทย์อย่างยิ่งเนื่องจากอาการคุณ
            </Text>
          </View>
          <CustomButton onPress={() => navigation.navigate("home")}>
            <Text>กลับ</Text>
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
});

export default Conclusions;
