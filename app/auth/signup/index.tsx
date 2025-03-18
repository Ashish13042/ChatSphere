import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { saveLocalItem } from "@/services/secureStorage";
import { APIURL } from "@/services/APIURL";
const SignUpScreen = () => {
    const router=useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSignUp = async () => {
    try {
      const response = await axios.post(APIURL+"/users/signup", {
        name,
        email,
        password
      });

      if (response.data.token) {
        await SecureStore.setItemAsync("userToken", response.data.token);
        saveLocalItem("userToken", response.data.token)
        Alert.alert("Success", "Account created successfully!");
        
      } else {
        Alert.alert("Error", "Invalid response from server.");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        Alert.alert("Error", error.response.data.message);
      } else {
        Alert.alert("Error", "Signup failed.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput placeholder="Name" style={styles.input} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Password" style={styles.input} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>router.push("/auth/signin")}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#222" },
  title: { fontSize: 28, color: "white", marginBottom: 20 },
  input: { width: "80%", height: 50, backgroundColor: "#333", borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, color: "white" },
  button: { width: "80%", backgroundColor: "#28a745", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "white", fontSize: 18 },
  link: { color: "#0af", marginTop: 15 },
});
