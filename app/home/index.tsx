import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icons for UI

const chats = [
  { id: "1", name: "Ashish Rawat", message: "Hey! How's it going?", time: "10:30 AM" },
  { id: "2", name: "Nishant Kumar Singh", message: "What's up?", time: "9:45 AM" },
  { id: "3", name: "Sahil Sharma", message: "Hi there", time: "8:15 AM" }
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={40} color="blue" />
        </TouchableOpacity>
        <Text style={styles.headerText}>ChatSphere</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={25} color="blue" />
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem}>
            <Ionicons name="person-circle" size={50} color="green" />
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatMessage}>{item.message}</Text>
            </View>
            <Text style={styles.chatTime}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Floating New Chat Button */}
      <TouchableOpacity style={styles.newChatButton}>
        <Ionicons name="chatbubble" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#004d40", // Dark teal-green
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00e676", // Neon green
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333", // Dark border
    backgroundColor: "#1e1e1e", // Dark chat list
  },
  chatInfo: {
    flex: 1,
    marginLeft: 10,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00e676", // Green name text
  },
  chatMessage: {
    color: "#80cbc4", // Light teal for message
  },
  chatTime: {
    color: "#4db6ac", // Light cyan for time
    fontSize: 12,
  },
  newChatButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#00e676", // Bright green button
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Shadow effect for Android
  },
});


export default HomeScreen;
