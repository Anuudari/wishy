import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

import Home from "../screens/Home";
import UserInfo from "../screens/UserInfo";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="UserInfo"
        component={UserInfo}
        options={{
          tabBarLabel: "UserInfo",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="UserInfo" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="Home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
