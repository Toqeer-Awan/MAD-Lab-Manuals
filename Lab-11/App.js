import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite";

// ✅ Correct way to open DB in Expo SDK 50+
const db = SQLite.openDatabaseAsync("LabDB.db");

export default function App() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [students, setStudents] = useState([]);

  // create table once
  useEffect(() => {
    (async () => {
      const database = await db;
      await database.execAsync(
        "CREATE TABLE IF NOT EXISTS Students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, rollNo TEXT);"
      );
      fetchStudents();
    })();
  }, []);

  // add student
  const addStudent = async () => {
    if (!name || !rollNo) {
      alert("Please enter both name and roll no");
      return;
    }
    const database = await db;
    await database.runAsync("INSERT INTO Students (name, rollNo) VALUES (?, ?);", [
      name,
      rollNo,
    ]);
    setName("");
    setRollNo("");
    fetchStudents();
  };

  // fetch all students
  const fetchStudents = async () => {
    const database = await db;
    const result = await database.getAllAsync("SELECT * FROM Students;");
    setStudents(result);
  };

  // delete student
  const deleteStudent = async (id) => {
    const database = await db;
    await database.runAsync("DELETE FROM Students WHERE id = ?;", [id]);
    fetchStudents();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📚 Student Management App</Text>

      <TextInput
        placeholder="Enter Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Enter Roll No"
        style={styles.input}
        value={rollNo}
        onChangeText={setRollNo}
      />
      <Button title="Add Student" onPress={addStudent} />

      <FlatList
        style={{ marginTop: 20 }}
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={{ fontSize: 16 }}>
              {item.name} ({item.rollNo})
            </Text>
            <Button title="Delete" onPress={() => deleteStudent(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});
