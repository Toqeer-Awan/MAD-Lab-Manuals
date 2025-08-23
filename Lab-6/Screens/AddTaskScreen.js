// screens/AddTaskScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

const AddTaskScreen = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const addTask = () => {
    if (!title) {
      Alert.alert("Error", "Task title cannot be empty!");
      return;
    }
    Alert.alert("Task Added", `${title} - ${desc}`);
    setTitle("");
    setDesc("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Task Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={desc}
        onChangeText={setDesc}
      />
      <Button title="Add Task" onPress={addTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
});

export default AddTaskScreen;
