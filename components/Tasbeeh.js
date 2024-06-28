import React, { cloneElement, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import Button from "../UI/Button";
import { GlobalStyles } from "../constants/styles";
const { height, width } = Dimensions.get("window");

function Tasbeeh() {
  const [tasbeehCount, setTasbeehCount] = useState(0);
  const tasbehat = ["Allahu Akbar", "Alhamdu llah", "Subhan Llah"];
  const [i, setI] = useState(0);
  const handleTasbeeh = () => {
    setTasbeehCount(tasbeehCount + 1);
    if (tasbeehCount < 34) {
      setI(0);
    } else if (tasbeehCount < 67) {
      setI(1);
    } else if (tasbeehCount < 100) {
      setI(2);
    } else {
      setTasbeehCount(0);
      setI(0);
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/masbaha.jpg")}
        style={styles.img}
        blurRadius={5}
        opacity={0.45}
        borderTopRightRadius={75}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.bg}>
          <Text style={styles.text}>{tasbehat[i]}</Text>
          <Text style={styles.Countertext}>{tasbeehCount}</Text>
        </View>
        <View style={styles.btn}>
          <Button onclick={handleTasbeeh}>Click</Button>
          <Button
            onclick={() => {
              setTasbeehCount(0);
              setI(0);
            }}
          >
            Reset
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Tasbeeh;
const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.green_light,
    borderTopRightRadius: 50,
  },
  img: {
    height: height - height / 4,
    resizeMode: "cover",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center ",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 28,
    margin: 10,
    textAlign: "center",
    justifyContent: "center",
    color: GlobalStyles.colors.green_dark,
    fontWeight:'bold',
  },
  bg: {
    borderRadius: 10,
  },
  imageStyle:{
    backgroundColor: GlobalStyles.colors.green_primary,
    opacity: 0.45
  },
  Countertext:{
    fontSize: 40,
    textAlign: "center",
    justifyContent: "center",
    color: GlobalStyles.colors.green_dark,
    marginTop: 10,
    marginBottom: 30


  }
});
