import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  useWindowDimensions,
  Appearance,
} from "react-native";

const colorScheme = Appearance.getColorScheme();

const RootContainer = (props) => {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const isIpad = screenWidth >= 1100 && screenHeight >= 800;

  return (
    <View
      style={[
        s.home,
        s.rootContainer,
        isIpad && { paddingHorizontal: screenWidth / 3.5 },
      ]}
    >
      <Image
        blurRadius={70}
        source={require("../../assets/images/homeBackground.png")}
        style={
          isIpad
            ? [s.imageBackground, { width: screenWidth }]
            : s.imageBackground
        }
      />
      {props.children}
    </View>
  );
};

const s = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colorScheme === "light" ? "#EFEFEF" : "#000",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  imageBackground: {
    position: "absolute",
  },
  imageBackground__ipad: {
    position: "absolute",
  },
});

export default RootContainer;
