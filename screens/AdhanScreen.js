import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GlobalStyles } from "../constants/styles";

function AdhanScreen({ route }) {
  const prayerTimes = route?.params.times;
  console.log(prayerTimes[0]);
  return (
    <ImageBackground
      source={require("../assets/doodles.png")}
      style={styles.container}
      imageStyle={styles.imageStyle}
    >
      <ScrollView>
        <View>
          {prayerTimes.map((prayerTime, index) => (
            <View style={styles.prayertab}>
              <Text></Text>
              <Text style={styles.prayerName}>{prayerTime[0]}</Text>
              <Text style={styles.prayerTime}>{prayerTime[1].split('(EEST)')}</Text>
              <Text></Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default AdhanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.green_lightest,

  },
  imageStyle: {
    opacity: 0.7,
  },
  prayertab: {
    flexDirection:'row',
    // backgroundColor: GlobalStyles.colors.green_lightest,
    borderRadius: 10,
    paddingHorizontal:10,
    alignItems: "center",
    justifyContent: "space-evenly",
    // shadowColor: GlobalStyles.colors.green_dark,
    // shadowOpacity: 0.4,
    // shadowOffset: { width: 2, height: 2 },
    // elevation: 3, // for Android shadow
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 10,

  },
  prayerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.green_secondary,
    margin: 10,
  },
  prayerTime: {
    fontSize: 16,
    fontWeight: "bold", 
    color: GlobalStyles.colors.green_secondary,
  },
});
