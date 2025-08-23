// screens/HomeScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Task Manager!</Text>
      <Text style={styles.subtitle}>Organize your daily tasks efficiently 🚀</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  welcome: { fontSize: 24, fontWeight: "bold" },
  subtitle: { fontSize: 16, marginTop: 10, color: "gray" },
});

export default HomeScreen;
