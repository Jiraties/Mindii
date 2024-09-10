import { View, Text, StyleSheet } from "react-native";

const Diagnosis = (props) => {
  return (
    <View style={[s.home, s.rootContainer]}>
      <Text style={s.headerText}>มาวินิจฉัย โรคกัน</Text>
      <Text style={s.headerTextHighlight}></Text>
    </View>
  );
};

const s = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    padding: 20,
    paddingTop: 20,
  },
  headerText: {
    textAlign: "left",
    fontSize: 40,
    fontFamily: "SemiBold",
    fontWeight: 800,
    overflow: "visible",
  },
  headerTextHighlight: {
    textAlign: "left",
    fontSize: 40,
    color: "blue",
    fontFamily: "SemiBold",
    lineHeight: 55,
    overflow: "visible",
  },
});

export default Diagnosis;
