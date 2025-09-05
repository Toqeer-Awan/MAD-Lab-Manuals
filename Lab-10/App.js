// App.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", age: "" });

  // Load saved progress on app start
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedForm = await AsyncStorage.getItem("formData");
        const savedStep = await AsyncStorage.getItem("currentStep");
        if (savedForm) setForm(JSON.parse(savedForm));
        if (savedStep) setStep(Number(savedStep));
      } catch (e) {
        console.error("Error loading data", e);
      }
    };
    loadData();
  }, []);

  // Save progress automatically
  const saveProgress = async (newForm, newStep) => {
    try {
      await AsyncStorage.setItem("formData", JSON.stringify(newForm));
      await AsyncStorage.setItem("currentStep", newStep.toString());
    } catch (e) {
      console.error("Error saving progress", e);
    }
  };

  const handleNext = () => {
    const newStep = step + 1;
    setStep(newStep);
    saveProgress(form, newStep);
  };

  const handleChange = (key, value) => {
    const updatedForm = { ...form, [key]: value };
    setForm(updatedForm);
    saveProgress(updatedForm, step);
  };

  const handleSubmit = async () => {
    Alert.alert("Form Submitted", JSON.stringify(form, null, 2));
    await AsyncStorage.removeItem("formData");
    await AsyncStorage.removeItem("currentStep");
    setForm({ name: "", email: "", age: "" });
    setStep(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Multi-step Form</Text>

      {step === 1 && (
        <View>
          <Text>Enter your name:</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(text) => handleChange("name", text)}
          />
          <Button title="Next" onPress={handleNext} />
        </View>
      )}

      {step === 2 && (
        <View>
          <Text>Enter your email:</Text>
          <TextInput
            style={styles.input}
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          <Button title="Next" onPress={handleNext} />
        </View>
      )}

      {step === 3 && (
        <View>
          <Text>Enter your age:</Text>
          <TextInput
            style={styles.input}
            value={form.age}
            onChangeText={(text) => handleChange("age", text)}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 15, borderRadius: 5 }
});
