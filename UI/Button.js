import React from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { GlobalStyles } from "../constants/styles";

function Button({ children, onclick }) {
  return (
    <TouchableOpacity
      onPress={onclick}
      style={styles.button}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.green_primary,
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 36,
    shadowColor: GlobalStyles.colors.green_dark,
    shadowOpacity: 0.4,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3, // for Android shadow
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: GlobalStyles.colors.green_lightest,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
