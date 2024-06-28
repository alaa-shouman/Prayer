import { useEffect, useState } from "react";
import axios from "axios";

export default function useGetPrayerTimes() {
  const date = new Date();
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPrayerTimes = async () => {
    const api =
      "https://api.aladhan.com/v1/calendarByCity/2024/5?city=Beirut&country=Lebanon&method=0";

    setIsLoading(true);
    try {
      const response = await axios.get(api);
      const dayIndex = date.getDate() - 1;
      const times = Object.entries(response.data.data[dayIndex].timings);
      setPrayerTimes(times);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
      Alert.alert("Error fetching prayer times. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPrayerTimes();
  }, []); // Run only once on component mount

  return { prayerTimes, isLoading };
};
