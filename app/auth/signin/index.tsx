import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import { saveLocalItem } from "@/services/secureStorage";
import { APIURL } from "@/services/APIURL";

const SignInScreen = () => {
  const [identifier, setIdentifier] = useState(""); // for email or phone
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(APIURL + "/users/signin", {
        identifier,  // this can be email or phone
        password,
      });

      if (response.data.token) {
        saveLocalItem("userToken", response.data.token);
        Alert.alert("Success", "Signin successful!");
        router.replace("/home");
      } else {
        Alert.alert("Error", "Invalid response from server."); 
      }
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Signin failed.");
    }
  };

  return (
    <ImageBackground 
      source={require("../../../assets/images/bg.jpg")}
      style={styles.background} 
      resizeMode="cover"
    >
      <View style={styles.overlay}> 
        <Text style={styles.title}>Sign In</Text>
        <TextInput 
          placeholder="Email or Phone Number" 
          style={styles.input} 
          onChangeText={setIdentifier} 
          keyboardType="default" 
        />
        <TextInput 
          placeholder="Password" 
          style={styles.input} 
          onChangeText={setPassword} 
          secureTextEntry 
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/auth/signup")}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignInScreen;


const styles = StyleSheet.create({
  background: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent white overlay
    width: "100%",
    height: "100%",
  },
  title: { fontSize: 28,fontWeight:"bold", color: "rgb(17, 87, 51)", marginBottom: 20 },
  input: { 
    width: "80%", 
    height: 50, 
    backgroundColor: "white",
    borderColor: "black", 
    borderWidth: 2,
    borderRadius: 10, 
    paddingHorizontal: 15, 
    marginBottom: 15, 
    color: "black"
  },
  button: { width: "80%", backgroundColor: "green", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "white", fontSize: 18 },
  link: { color: "rgb(5, 50, 27)", marginTop: 15 },
});
