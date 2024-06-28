// PrayerTimes.js

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Alert, Pressable } from "react-native";
import { GlobalStyles } from "../constants/styles";
import useGetPrayerTimes from "../function/useGetPrayerTimes";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const PrayerTimes = () => {
  const Navigation = useNavigation()
  const { prayerTimes, isLoading } = useGetPrayerTimes();
  const [upcomingPrayer, setUpcomingPrayer] = useState(null);

  useEffect(() => {
    if (!isLoading && prayerTimes.length > 0) {
      const date = new Date();
      const mins = date.getHours() * 60 + date.getMinutes();
      const upcoming = prayerTimes.find(([name, time]) => {
        const arr = time.split(":");
        const prayerMins =
          parseInt(arr[0]) * 60 + parseInt(arr[1].split(" ")[0]);
        return prayerMins > mins;
      });
      console.log(upcoming);
      setUpcomingPrayer(upcoming);
    }
  }, [prayerTimes, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.times}>Fetching Prayer Times...</Text>
      </View>
    );
  } else {
    return (
      <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', borderless: false }}
      onPress={()=> Navigation.navigate("adan",{times:prayerTimes})}
      >
      <View style={styles.container}>
        <View>
          <Text style={styles.times}>UPCOMING PRAYER</Text>
          {upcomingPrayer && (
            <Text style={styles.times}>
              {upcomingPrayer[0]} AT {upcomingPrayer[1].split('(EEST)')}
            </Text>
          )}
        </View>
      </View>
      </Pressable>
    );
  }
};

export default PrayerTimes;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    minHeight: height / 4,
    backgroundColor: GlobalStyles.colors.green_primary,
    borderColor: GlobalStyles.colors.green_light,
    borderBottomEndRadius: 50,
  },
  times: {
    fontSize: 24,
    margin: 10,
    textAlign: "center",
    color: GlobalStyles.colors.green_lightest,
  },

  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
});
