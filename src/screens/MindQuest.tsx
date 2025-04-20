import React, { useEffect, useReducer, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import RootContainer from "../components/RootContainer";
import { Fonts, Shadows } from "../constants/styles";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../context/store";
import { Quest } from "../context/mindQuestSlice";
import { Audio } from "expo-av";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import Story from "./Story";

const MindQuest = () => {
  const [hp, setHp] = useState(100);
  const [cumulatedDamage, setCumulatedDamage] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [storyIsDone, setStoryIsDone] = useState(false);
  const dispatch = useDispatch<any>();
  const navigation = useNavigation();

  const quests = useSelector((state: RootState) => state.mindQuest.quests);

  console.log(quests);

  useEffect(() => {
    const completedTasks: Quest[] = quests.filter((quest) => quest.completed);
    console.log(completedTasks);
    let damage = 0;
    completedTasks.forEach((quest) => {
      damage += quest.hpReduction;
    });

    console.log(damage);
    setCumulatedDamage(damage);

    console.log("Cumulated Damage Is:" + cumulatedDamage);
  }, [quests]);

  const playAttackSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/attack.mp3")
    );

    await sound.playAsync();
  };

  const playDeathSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/Dead.mp3")
    );

    await sound.playAsync();
  };

  //   const toggleTask = (id) => {
  //     setTasks((prevTasks) =>
  //       prevTasks.map((task) => {
  //         if (task.id === id && !task.completed) {
  //           setHp((prevHp) => Math.max(0, prevHp + task.hp));
  //           return { ...task, completed: true };
  //         }
  //         return task;
  //       })
  //     );
  //   };

  const handleAttack = () => {
    if (cumulatedDamage === 0) return;
    playAttackSound();

    setHp((prev) => {
      const newHp = Math.max(0, prev - cumulatedDamage);
      if (newHp <= 0) playDeathSound();
      return newHp;
    });
    setCumulatedDamage(0);
  };

  if (!storyIsDone) {
    return <Story storyIsDone={(isDone) => setStoryIsDone(isDone)} />;
  } else {
    return (
      <RootContainer>
        <Image
          style={s.questBackground}
          source={require("../../assets/images/questBackground.jpg")}
        />
        <Text style={s.title}>MindQuest 🎮</Text>
        <Text style={s.description}>
          ทำเควสต์เรื่อยๆทุกวันเพื่อลดอำนาจมืดของ Drogon!
        </Text>

        <View style={s.character}>
          <Text style={s.character__bubble}>แกไม่ชนะพลังมืดข้าหรอก</Text>
          <Image
            style={s.character__image}
            source={require("../../assets/images/drogon.png")}
          />
          <Text style={s.hp__label}>HP: {hp}/100</Text>
          <View style={s.hp__bar}>
            <View style={[s.hp, { width: `${hp}%` }]} />
          </View>
        </View>

        <ScrollView style={s.quest}>
          {quests.map((task) => (
            <View key={task.id} style={s.quest__item}>
              <View style={s.questRow}>
                <AntDesign
                  name={task.completed ? "checkcircle" : "checkcircleo"}
                  size={20}
                  color={task.completed ? "#5271ff" : "#ccc"}
                  style={{ marginRight: 10 }}
                />
                <View>
                  <Text style={s.quest__itemText}>{task.title}</Text>
                  <Text style={s.quest__itemDesc}>{task.desc}</Text>
                </View>
              </View>
              <View style={s.questRight}>
                <Text style={s.questHP}>-{task.hpReduction}HP</Text>
                <FontAwesome
                  name="heart"
                  size={20}
                  color="#5271ff"
                  style={{ marginLeft: 5 }}
                />
              </View>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={handleAttack}
          style={[
            s.attackButton,
            cumulatedDamage === 0 ? { backgroundColor: "#0101" } : {},
          ]}
        >
          <Text
            style={[
              s.attackButtonText,
              cumulatedDamage === 0 ? { color: "#000" } : {},
            ]}
          >
            โจมตี! -{cumulatedDamage}HP
          </Text>
        </TouchableOpacity>

        {/* <CustomButton onPress={() => navigation.navigate("story")}>
          <Text>Story</Text>
        </CustomButton> */}
      </RootContainer>
    );
  }
};

const s = StyleSheet.create({
  title: {
    fontFamily: Fonts.regular,
    fontSize: 40,
    marginTop: 70,
    color: "#fff",
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    width: "90%",
    color: "#fff",
  },
  questBackground: {
    position: "absolute",
    height: 425,
  },
  character__image: {
    height: 290,
    marginTop: -20,
    marginBottom: -100,
    width: "auto",
    resizeMode: "contain",
    ...Shadows.light,
  },
  character__bubble: {
    backgroundColor: "#efefef",
    position: "absolute",
    padding: 10,
    right: 0,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    zIndex: 2,
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
  hp__bar: {
    width: "100%",
    height: 30,
    backgroundColor: "#fdfdfd",
    borderRadius: 100,
    ...Shadows.light,
  },
  hp: {
    height: 30,
    backgroundColor: "#5271ff",
    borderRadius: 100,
    ...Shadows.light,
  },
  hp__label: {
    color: "#fff",
    marginBottom: 10,
    fontFamily: Fonts.regular,
    fontSize: 15,
  },
  character: {},
  quest: {
    paddingTop: 20,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    gap: 20,
    flex: 1,
  },
  quest__item: {
    backgroundColor: "#fdfdfd",
    borderRadius: 30,
    width: "100%",
    padding: 20,
    marginBottom: 15,
    ...Shadows.light,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  quest__itemText: {
    fontFamily: Fonts.regular,
    fontSize: 15,
  },
  quest__itemDesc: {
    fontFamily: Fonts.regular,
    color: "#777",
  },
  questRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  questHP: {
    fontFamily: Fonts.regular,
    color: "#5271ff",
  },
  attackButton: {
    backgroundColor: "#5271ff",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  attackButtonText: {
    fontFamily: Fonts.regular,
    color: "#fff",
    // fontSize: 18,
  },
});

export default MindQuest;
