import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import { saveLocalItem } from "@/services/secureStorage";
import { APIURL } from "@/services/APIURL";
const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(APIURL+"/users/signin", { email, password }); /**/

      if (response.data.token) {
        // Store token securely
        saveLocalItem("userToken", response.data.token);
        Alert.alert("Success", "Signin successful!");
        router.push("/home"); 
      } else {
        Alert.alert("Error", "Invalid response from server.");
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Signin failed."); 
    }
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Password" style={styles.input} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/auth/signup")}> 
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
   
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 28, color: "green", marginBottom: 20 },
  input: { 
    width: "80%", 
    height: 50, 
    backgroundColor: "white",
    borderColor: "black", // Set border color
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 10, 
    paddingHorizontal: 15, 
    marginBottom: 15, 
    color: "black" // Change text color to black
  },
  button: { width: "80%", backgroundColor: "green", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "white", fontSize: 18 },
  link: { color: "green", marginTop: 15 },
});
