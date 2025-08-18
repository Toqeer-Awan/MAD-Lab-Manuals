import React from 'react'
import { Text, View, Button } from 'react-native'

const AboutScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>About Screen</Text>
          {/* <Button title="Go to About" onPress={() => navigation.navigate("About")} /> */}
        </View>
  )
}

export default AboutScreen;