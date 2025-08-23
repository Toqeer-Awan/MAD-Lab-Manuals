// components/TaskItem.js
import React from "react";
import { Text, TouchableHighlight, StyleSheet, View } from "react-native";

const TaskItem = ({ task, onPress }) => {
  return (
    <TouchableHighlight
      underlayColor="#ddd"
      onPress={() => onPress(task)}
      style={styles.taskContainer}
    >
      <View>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskDesc}>{task.description}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskDesc: {
    fontSize: 14,
    color: "gray",
  },
});

export default TaskItem;
