import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../context/store";
import { conclusionsList } from "./Conclusions";
import { Shadows } from "../constants/styles";
import { SymbolView } from "expo-symbols";

import CustomButton from "../components/CustomButton";
import RootContainer from "../components/RootContainer";
import { conclusionActions } from "../context/conclusionSlice";
import { useNavigationState } from "@react-navigation/native";
import { Fonts } from "../constants/styles";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchConclusionHistory } from "../context/conclusionSlice";
import { Skeleton } from "moti/skeleton";
import Toast from "react-native-toast-message";

const History = (props) => {
  const dispatch = useDispatch();
  const conclusionHistory = useSelector(
    (state: RootState) => state.conclusion.conclusionHistory
  );
  const [loading, setLoading] = useState(true);

  const handleItemPress = (diseaseId: string) => {
    dispatch(conclusionActions.viewConclusion(diseaseId));
    props.navigation.navigate("conclusions");
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const storedUid = await AsyncStorage.getItem("uid");
      if (storedUid) {
        const latestConclusionHistory = await dispatch(
          fetchConclusionHistory(storedUid)
        ).unwrap();

        console.log("Fetching the latest conclusions history");

        if (latestConclusionHistory && latestConclusionHistory.length > 0) {
          dispatch(
            conclusionActions.setConclusionHistory(latestConclusionHistory)
          );
        }
        setLoading(false);
        // dispatch(conclusionActions.setConclusionHistory(latestConclusionHistory));
      }
    };

    fetchHistory();
  }, []);

  const handleUpvote = () => {
    Toast.show({
      type: "success2",
      text1: "ขอบคุณสำหรับการตอบรับของคุณ",
      position: "top",
      swipeable: true,
      visibilityTime: 1500,
      topOffset: 50,
    });
  };

  const handleDownvote = () => {
    Toast.show({
      type: "success2",
      text1: "ขอบคุณสำหรับการตอบรับของคุณ",
      position: "top",
      swipeable: true,
      visibilityTime: 1500,
      topOffset: 50,
    });
  };

  return (
    <RootContainer>
      <Text style={s.headerText}>ประวัติการประเมิน</Text>
      <Text style={s.subheaderText}>หาประวัติการประเมินเก่าของคุณและริวีว</Text>

      {loading ? (
        <Skeleton width={"100%"} height={"50%"} colorMode="light" />
      ) : (
        <FlatList
          data={conclusionHistory}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View style={s.symptomListItem__notFound}>
              <Text style={s.symptomListItem__notFoundText}>
                คุณยังไม่มีประวัติการประเมินโรค 🤷‍♂️
              </Text>
            </View>
          }
          style={{ overflow: "visible" }}
          renderItem={({ item }) => {
            const fullConclusion = conclusionsList[item.diseaseId];
            const date = new Date(item.date);

            return (
              <CustomButton
                onPress={() => handleItemPress(item.diseaseId)}
                style={s.historyItem_wrapper}
              >
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
                    น.
                  </Text>
                  <View style={s.vote__wraper}>
                    <CustomButton style={s.upvote} onPress={handleUpvote}>
                      <SymbolView name="hand.thumbsup" tintColor="green" />
                    </CustomButton>
                    <CustomButton style={s.downvote} onPress={handleDownvote}>
                      <SymbolView name="hand.thumbsdown" tintColor="#fa5639" />
                    </CustomButton>
                  </View>
                </View>
              </CustomButton>
            );
          }}
          contentContainerStyle={{ gap: 20, flexGrow: 1 }}
        />
      )}
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
    fontFamily: Fonts.regular,
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
    fontFamily: Fonts.regular,
    // marginBottom: ,
  },
  subheaderText: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    marginBottom: 20,
  },
  searchField: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 100,
    marginBottom: 20,
    fontFamily: Fonts.regular,
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
    fontFamily: Fonts.regular,
  },
});

export default History;
