import React from "react";
import { View } from "react-native";
import PrayerTimes from "../components/PrayerTimes";
import Tasbeeh from "../components/Tasbeeh";

function HomeScreen() {
  return (
    <View>
      <PrayerTimes />
      <Tasbeeh />
    </View>
  );
}

export default HomeScreen;
