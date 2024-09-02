import { StyleSheet, View, Text } from "react-native";

const HomeListItem = (props) => {
  return (
    <View style={s.homeListItem}>
      <Text style={s.homeListItem__text}>{props.text}</Text>
      <View style={s.homeListItem__button}>
        <Text>{props.button}</Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  homeListItem: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    height: 175,
  },
  homeListItem__text: {
    fontSize: 20,
  },
  homeListItem__button: {
    backgroundColor: "blue",
    width: "40%",
    height: 40,
    borderRadius: 100,
    alignContent: "center",
  },
});

export default HomeListItem;
