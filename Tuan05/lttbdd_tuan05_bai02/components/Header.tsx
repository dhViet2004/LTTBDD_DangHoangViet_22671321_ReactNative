import React from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet,Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface HeaderProps {
  onBack?: () => void;
  onCartPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBack, onCartPress }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="arrow-back-outline" size={24} color="white" />
    </TouchableOpacity>
    <View style={styles.searchBox}>
      <Ionicons name="search" size={20} color='black' style={{marginRight: 5}} />
      <TextInput
        placeholder='Dây cáp usb'
        placeholderTextColor='gray'
        style={{ flex: 1, fontSize: 15, paddingVertical: 0 }}
      />
    </View>
    <TouchableOpacity onPress={onCartPress} style={{position: 'relative'}}>
      <Ionicons name='cart' size={24} color='white'/>
      <View style={styles.cartBadge}>
        <Text style={{color:'#fff', fontSize:10}}>1</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity>
      <Ionicons name='ellipsis-horizontal' size={24} color="white"/>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1BA9FF',
    minHeight: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-between'
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
    height: 35,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 3,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});

export default Header;