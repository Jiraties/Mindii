import RootContainer from "../components/RootContainer";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Fonts, Shadows } from "../constants/styles";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";

const WellnessHub = (props) => {
  const navigation = useNavigation();
  const content = [
    // {
    //   name: "คู่มือการกับมาอยู่กับปัจจุบัน",
    //   description: "โดย เคนจิ ทานิกุชิ",
    //   color: "#FF877E",
    // },
    // {
    //   name: "ทฤษีขนมปังไหม้",
    //   description: "โดย สาริน สุขแก้ว",
    //   color: "#5271FF",
    // },
  ];

  const videos = [
    { id: 1, url: "https://www.youtube.com/embed/-moW9jvvMr4" },
    { id: 2, url: "https://www.youtube.com/embed/arj7oStGLkU" },
    { id: 3, url: "https://www.youtube.com/embed/rBUjOY12gJA" },
  ];

  return (
    <RootContainer>
      <Text style={s.title}>Wellness Hub</Text>
      <Text style={s.description}>
        ยินดีต้อนรับสู่แหล่งคอนเท้นต์ด้าน Mindfulness
      </Text>
      <ScrollView style={s.hub} contentContainerStyle={{ paddingBottom: 50 }}>
        {content.map((content) => (
          <CustomButton
            onPress={() => navigation.navigate("breathingExercise")}
            style={[s.hub__item, { backgroundColor: content.color }]}
            key={content.name}
          >
            <Image
              style={s.hub__logo}
              source={require("../../assets/images/logo.png")}
            />
            <View>
              <Text style={s.hub__itemTitle}>{content.name}</Text>
              <Text style={s.hub__itemDescription}>{content.description}</Text>
            </View>
          </CustomButton>
        ))}

        <Text style={s.subtitle}>วิดีโอแนะนำ</Text>
        {videos.map((video) => (
          <View key={video.id} style={s.videoContainer}>
            <WebView
              style={s.video}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{ uri: video.url }}
            />
          </View>
        ))}
      </ScrollView>
    </RootContainer>
  );
};

const screenWidth = Dimensions.get("window").width;

const s = StyleSheet.create({
  title: {
    fontFamily: Fonts.regular,
    fontSize: 40,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 24,
    marginBottom: 10,
    marginTop: 20,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    marginBottom: 30,
    width: "90%",
  },
  hub: {},
  hub__item: {
    height: 200,
    backgroundColor: "#FF877E",
    borderRadius: 30,
    padding: 20,
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
    ...Shadows.default,
  },
  hub__logo: {
    height: 27,
    width: 100,
  },
  hub__itemTitle: {
    fontFamily: Fonts.regular,
    fontSize: 25,
    color: "#fff",
  },
  hub__itemDescription: {
    fontFamily: Fonts.regular,
    color: "#fff",
  },
  videoContainer: {
    height: 200,
    width: screenWidth - 40,
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
    alignSelf: "center",
  },
  video: {
    flex: 1,
  },
});

export default WellnessHub;
