import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, FlatList, StyleSheet, Alert } from "react-native";

// 👉 Change API_URL depending on your setup
// For Android Emulator: use 10.0.2.2
// For Real Device: replace with your PC IP (example: http://192.168.1.5:3000)
const API_URL = "http://10.0.2.2:3000/users";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [updatePost, setUpdatePost] = useState("");

  // 🔹 GET all posts
  const fetchPosts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("GET error:", err);
      Alert.alert("Error", "Failed to fetch data. Check your API URL.");
    }
  };

  // 🔹 POST new post
  const addPost = async () => {
    if (!newPost.trim()) return;
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newPost }),
      });
      setNewPost("");
      Alert.alert("Success", "Post added successfully!");
      fetchPosts();
    } catch (err) {
      console.error("POST error:", err);
    }
  };

  // 🔹 PUT (update first post)
  const updateFirstPost = async () => {
    if (posts.length === 0) return;
    try {
      await fetch(`${API_URL}/${posts[0].id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: updatePost || "Updated Post" }),
      });
      setUpdatePost("");
      Alert.alert("Success", "First post updated!");
      fetchPosts();
    } catch (err) {
      console.error("PUT error:", err);
    }
  };

  // 🔹 DELETE (remove first post)
  const deleteFirstPost = async () => {
    if (posts.length === 0) return;
    try {
      await fetch(`${API_URL}/${posts[0].id}`, { method: "DELETE" });
      Alert.alert("Deleted", "First post removed!");
      fetchPosts();
    } catch (err) {
      console.error("DELETE error:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📌 JSON Server + React Native</Text>

      {/* GET */}
      <Button title="Refresh Posts (GET)" onPress={fetchPosts} />

      {/* POST */}
      <TextInput
        style={styles.input}
        placeholder="Enter new post"
        value={newPost}
        onChangeText={setNewPost}
      />
      <Button title="Add Post (POST)" onPress={addPost} />

      {/* PUT */}
      <TextInput
        style={styles.input}
        placeholder="Update first post"
        value={updatePost}
        onChangeText={setUpdatePost}
      />
      <Button title="Update First Post (PUT)" onPress={updateFirstPost} />

      {/* DELETE */}
      <Button
        title="Delete First Post (DELETE)"
        color="red"
        onPress={deleteFirstPost}
      />

      {/* Show Posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.post}>{item.title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginVertical: 10,
    borderRadius: 5,
  },
  post: {
    fontSize: 16,
    marginTop: 8,
    padding: 6,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
  },
});
