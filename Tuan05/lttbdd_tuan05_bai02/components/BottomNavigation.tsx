import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const BottomNavigation = () => (
  <View style={styles.bottomNav}>
    <TouchableOpacity style={styles.navButton}>
      <Ionicons name="home-outline" size={30} color="white"/>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton}>
      <Ionicons name="person-outline" size={30} color="white"/>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton}>
      <Ionicons name="cart-outline" size={30} color="white"/>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1BA9FF',
    height: 54,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopWidth: 0.5,
    borderTopColor: '#eee'
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
});

export default BottomNavigation;