import { useEffect, useState } from "react";
import axios from "axios";
import usegetLocation from "./usegetLocation";

export default function useGetPrayerTimes() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {location} = usegetLocation();

  const getPrayerTimes = async () => {
    const api = location ? `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${location.lat}&longitude=${location.lng}&method=0` :
      `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=Beirut&country=Lebanon&method=0`;

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
    console.log(location)
  }, []);

  return { prayerTimes, isLoading };
}
