import React from 'react'
import { Pressable, View ,Text,StyleSheet} from 'react-native'
import { GlobalStyles } from '../constants/styles';

function Button({children,onclick}) {
    
    return (
      <Pressable onPress={onclick}>
          <View style={styles.button}>
            <Text style={{color:GlobalStyles.colors.green_lightest}}>{children}</Text>
          </View>
      </Pressable>
    );
}

export default Button

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.green_light,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "100%",
  },
});