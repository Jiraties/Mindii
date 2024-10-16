import { useSelector } from "react-redux";
import RootContainer from "../components/RootContainer";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
} from "react-native";
import { RootState } from "../context/store";
import { conclusionsList } from "./Conclusions";
import { Shadows } from "../constants/styles";
import CustomButton from "../components/CustomButton";
import { SymbolView } from "expo-symbols";

const History = () => {
  const conclusionHistory = useSelector(
    (state: RootState) => state.conclusion.conclusionHistory
  );

  return (
    <RootContainer>
      <Text style={s.headerText}>ประวัติการประเมิน</Text>
      <Text style={s.subheaderText}>หาประวัติการประเมินเก่าของคุณและริวีว</Text>

      <View style={{ gap: 20, flex: 4.5 }}>
        {conclusionHistory.length === 0 && (
          <View style={s.symptomListItem__notFound}>
            <Text style={s.symptomListItem__notFoundText}>
              คุณยังไม่มีประวัติการประเมินโรค 🤷‍♂️
            </Text>
          </View>
        )}
        {conclusionHistory.map((conclusion, index) => {
          const fullConclusion = conclusionsList[conclusion.diseaseId];
          console.log(conclusion.date);
          const date = new Date(conclusion.date);

          return (
            <View key={index} style={s.historyItem_wrapper}>
              <Image
                source={{ uri: fullConclusion.imageUri }}
                style={s.historyItem_image}
              />
              <View style={s.historyItem_textWrapper}>
                <Text style={[s.historyItem_text, { fontSize: 20 }]}>
                  {fullConclusion.diseaseName}
                </Text>
                <Text style={s.historyItem_text}>
                  {date.toLocaleString("th-TH", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </Text>
                <View style={s.vote__wraper}>
                  <CustomButton style={s.upvote}>
                    <SymbolView name="hand.thumbsup" tintColor="green" />
                  </CustomButton>
                  <CustomButton style={s.downvote}>
                    <SymbolView name="hand.thumbsdown" tintColor="#fa5639" />
                  </CustomButton>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </RootContainer>
  );
};

const s = StyleSheet.create({
  historyItem_wrapper: {
    backgroundColor: "#fdfdfd",
    borderRadius: 20,
    justifyContent: "center",

    ...Shadows.default,
  },
  historyItem_text: {
    fontFamily: "SemiBold",
  },

  historyItem_image: {
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  historyItem_textWrapper: {
    padding: 20,
  },
  headerText: {
    fontSize: 40,
    fontFamily: "SemiBold",
    // marginBottom: ,
  },
  subheaderText: {
    fontSize: 15,
    fontFamily: "SemiBold",
    marginBottom: 20,
  },
  searchField: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 100,
    marginBottom: 20,
    fontFamily: "SemiBold",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  upvote: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#b8ffbf",
  },
  downvote: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#ffc2b8",
  },
  vote__wraper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  symptomListItem__notFound: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  symptomListItem__notFoundText: {
    textAlign: "center",
    fontFamily: "SemiBold",
  },
});

export default History;
