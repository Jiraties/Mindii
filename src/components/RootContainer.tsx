import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  useWindowDimensions,
  Appearance,
} from "react-native";

const colorScheme = Appearance.getColorScheme();

const RootContainer: React.FC<{
  image?: boolean;
  style?: any;
  children: any;
  padding?: boolean;
}> = ({ image = true, style, children, padding = true }) => {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const isIpad = screenWidth >= 1100 && screenHeight >= 800;

  return (
    <View
      style={[
        s.rootContainer,
        isIpad && { paddingHorizontal: screenWidth / 3.5 },
        padding
          ? {
              paddingHorizontal: 20,
              paddingTop: 20,
            }
          : { padding: 0 },
        style,
      ]}
    >
      {/* {image && (
        <Image
          blurRadius={70}
          source={require("../../assets/images/homeBackground.png")}
          style={
            isIpad
              ? [s.imageBackground, { width: screenWidth }]
              : s.imageBackground
          }
        />
      )} */}
      {children}
    </View>
  );
};

const s = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colorScheme === "light" ? "#EFEFEF" : "#000",
  },
  imageBackground: {
    position: "absolute",
  },
  imageBackground__ipad: {
    position: "absolute",
  },
});

export default RootContainer;
