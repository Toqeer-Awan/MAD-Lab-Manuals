// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Screens/HomeScreen";
import TasksScreen from "./Screens/TasksScreen";
import AddTaskScreen from "./Screens/AddTaskScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import TaskDetailScreen from "./Screens/TaskDetailScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TaskStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TasksMain" component={TasksScreen} options={{ title: "Tasks" }} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") iconName = "home";
            else if (route.name === "Tasks") iconName = "list";
            else if (route.name === "Add Task") iconName = "add-circle";
            else if (route.name === "Profile") iconName = "person";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Tasks" component={TaskStack} options={{ headerShown: false }} />
        <Tab.Screen name="Add Task" component={AddTaskScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
