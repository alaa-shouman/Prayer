import { StyleSheet, View, Text, Dimensions, Alert } from "react-native";
import { GlobalStyles } from "../constants/styles";
import Button from "../UI/Button";
import axios from "axios";
import { useEffect, useState } from "react";

const { height } = Dimensions.get("window");
const date = new Date();
const day = date.getDate();
const api =
  "https://api.aladhan.com/v1/calendarByCity/2024/5?city=Beirut&country=Lebanon&method=0";

function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingPrayer, setUpcomingPrayer] = useState(null);

  const getPrayerTimes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(api);
      const dayIndex = date.getDate() - 1;
      const times = Object.entries(response.data.data[dayIndex].timings);
      setPrayerTimes(times);
      setUpcomingPrayer(findUpcomingPrayer(times));
    } catch (error) {
      Alert.alert("Error fetching prayer times. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const findUpcomingPrayer = (times) => {
    const mins = date.getHours() * 60 + date.getMinutes();
    return times.find(([name, time]) => {
      const arr = time.split(":");
      const prayerMins =
        parseInt(arr[0]) * 60 + parseInt(arr[1].split("(EEST)"));
      return prayerMins > mins;
    });
  };

  useEffect(() => {
    getPrayerTimes();
    const interval = setInterval(() => {
      setUpcomingPrayer(findUpcomingPrayer(prayerTimes));
    }, 3600000);

    return () => clearInterval(interval);
  }, [day]);

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
          <Text style={styles.times}>UPCOMING PRAYER </Text>
          {upcomingPrayer && (
            <Text style={styles.times}>
              {upcomingPrayer[0]} AT {upcomingPrayer[1].split("(EEST)")}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

export default PrayerTimes;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    minHeight: height / 4,
    backgroundColor: GlobalStyles.colors.green_primary,
    borderBlockColor:GlobalStyles.colors.green_light,
    borderBottomEndRadius:50,
  },
  times: {
    fontSize: 24,
    margin: 10,
    textAlign: "center",
    color: GlobalStyles.colors.green_lightest,
  },
});
