// screens/TasksScreen.js
import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TaskItem from "../Components/TaskItem";

const TasksScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Buy groceries", description: "Milk, Bread, Eggs" },
    { id: "2", title: "Workout", description: "Go for a 30 min run" },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={(task) => navigation.navigate("TaskDetail", { task })}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10 },
});

export default TasksScreen;
