// HomeScreen.js
import React, { useState, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Animated, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import {Modal} from 'react-native';

const { width } = Dimensions.get("window");

const chats = [
  { id: "1", name: "Ashish Rawat", message: "Hey! How's it going?", time: "10:30 AM" },
  { id: "2", name: "Nishant Kumar Singh", message: "What's up?", time: "9:45 AM" },
  { id: "3", name: "Sahil Sharma", message: "Hi there", time: "8:15 AM" },
  { id: "4", name: "Ashish Rawat", message: "Hey! How's it going?", time: "10:30 AM" },
  { id: "5", name: "Nishant Kumar Singh", message: "What's up?", time: "9:45 AM" },
  { id: "6", name: "Sahil Sharma", message: "Hi there", time: "8:15 AM" },
  { id: "7", name: "Ashish Rawat", message: "Hey! How's it going?", time: "10:30 AM" },
  { id: "8", name: "Nishant Kumar Singh", message: "What's up?", time: "9:45 AM" },
  { id: "9", name: "Sahil Sharma", message: "Hi there", time: "8:15 AM" }
];

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.7)).current;

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: -width * 0.7,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>

      {/* Sidebar */}
{menuVisible && (
  <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={toggleMenu} />
)}
<Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
  <View style={styles.sidebarContent}>
    <Image
      source={require('../../assets/images/logo.png')}
      style={styles.logo}
    />
    <View style={styles.menuItems}>
      <TouchableOpacity><Text style={styles.menuText}>Home</Text></TouchableOpacity>
      <TouchableOpacity><Text style={styles.menuText}>Profile</Text></TouchableOpacity>
      <TouchableOpacity><Text style={styles.menuText}>Settings</Text></TouchableOpacity>
      <TouchableOpacity><Text style={styles.menuText}>Logout</Text></TouchableOpacity>
    </View>
    <View style={styles.profileSection}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
      <Image
        source={require('../../assets/images/Profilesample.png')}
        style={styles.profilePic}
      />
      </TouchableOpacity>
      <Text style={styles.profileName}>Shefali</Text>
    </View>
    {/* Modal for Profile Picture */}
    <Modal visible={modalVisible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)} >
          <Image source = {require('../../assets/images/Profilesample.png')}
          style={styles.modalImage} />
        </TouchableOpacity>
      </View>
    </Modal>

  </View>
</Animated.View>


      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={35} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>ChatSphere</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        contentContainerStyle={{ padding: 10 }}
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BlurView intensity={50} tint="dark" style={styles.chatItem}>
            <TouchableOpacity style={styles.chatRow}>
              <Ionicons name="person-circle" size={50} color="#00e676" />
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMessage}>{item.message}</Text>
              </View>
              <Text style={styles.chatTime}>{item.time}</Text>
            </TouchableOpacity>
          </BlurView>
        )}
      />

      {/* Floating New Chat Button */}
      <TouchableOpacity style={styles.newChatButton}>
        <Ionicons name="chatbubble" size={30} color="white" />
      </TouchableOpacity>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "transparent",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#138d75",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: "#1a1a1a",
    zIndex: 2,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  sidebarContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 30,
  },
  menuItems: {
    gap: 20,
  },
  menuText: {
    fontSize: 18,
    color: "#138d75",
    fontWeight: "600",
  },
  profileSection: {
    alignItems: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  profileName: {
    color: "#138d75",
    fontSize: 16,
    fontWeight: "bold",
  },
  chatItem: {
    borderRadius: 50,
    marginVertical: 8,
    overflow: "hidden",
  },
  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(12, 150, 104, 0.26)",
    padding: 15,
    borderRadius: 30,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 10,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#138d75",
  },
  chatMessage: {
    color: "#80cbc4",
  },
  chatTime: {
    color: "#4db6ac",
    fontSize: 12,
  },
  newChatButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#138d75",
    padding: 20,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 150,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
});

export default HomeScreen;
