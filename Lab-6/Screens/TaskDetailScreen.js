// screens/TaskDetailScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TaskDetailScreen = ({ route }) => {
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.desc}>{task.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  desc: { fontSize: 18, color: "gray" },
});

export default TaskDetailScreen;
