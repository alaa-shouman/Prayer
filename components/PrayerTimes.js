// PrayerTimes.js

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import { GlobalStyles } from "../constants/styles";
import useGetPrayerTimes from "../function/useGetPrayerTimes";

const { height } = Dimensions.get("window");

const PrayerTimes = () => {
  const { prayerTimes, isLoading } = useGetPrayerTimes();
  const [upcomingPrayer, setUpcomingPrayer] = useState(null);

  useEffect(() => {
    if (!isLoading && prayerTimes.length > 0) {
      // Logic to find upcoming prayer
      const date = new Date();
      const mins = date.getHours() * 60 + date.getMinutes();
      const upcoming = prayerTimes.find(([name, time]) => {
        const arr = time.split(":");
        const prayerMins =
          parseInt(arr[0]) * 60 + parseInt(arr[1].split(" ")[0]);
        return prayerMins > mins;
      });
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
      <View style={styles.container}>
        <View>
          <Text style={styles.times}>UPCOMING PRAYER</Text>
          {upcomingPrayer && (
            <Text style={styles.times}>
              {upcomingPrayer[0]} AT {upcomingPrayer[1]}
            </Text>
          )}
        </View>
      </View>
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
});
