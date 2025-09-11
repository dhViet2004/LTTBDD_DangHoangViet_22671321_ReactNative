import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import eyeicon from '../assets/eyi-icon.png'

export default function GiaoDien08() {
  return (
    <View style={styles.container}>
      <Image source={eyeicon} style={styles.eyeImg} />
      <View style={styles.inputBox}>
        <Ionicons name="person-outline" size={22} color="#674ffb" />
        <TextInput
          style={styles.input}
          placeholder="Please input user name"
          placeholderTextColor="#aaa"
        />
      </View>
      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={22} color="#674ffb" />
        <TextInput
          style={styles.input}
          placeholder="Please input password"
          placeholderTextColor="#aaa"
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginBtnText}>LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.rowLink}>
        <TouchableOpacity>
          <Text style={styles.linkText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.otherLoginRow}>
        <View style={styles.divider}/>
        <Text style={styles.otherLoginText}>Other Login Methods</Text>
        <View style={styles.divider}/>
      </View>
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn}>
          <MaterialCommunityIcons name="account-plus" size={28} color="#2196F3" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}>
          <MaterialCommunityIcons name="wifi" size={28} color="#F9A825" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}>
          <FontAwesome name="facebook" size={28} color="#3b5998" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 28, paddingHorizontal: 18,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
  },
  eyeImg: {
    width: 90, height: 90,
    marginBottom: 20,
    borderRadius: 45,
    alignSelf: 'center',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 9,
    paddingHorizontal: 6,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 17,
    marginLeft: 12,
    color: '#222',
  },
  loginBtn: {
    backgroundColor: '#674ffb',
    borderRadius: 8,
    height: 46,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 14,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  rowLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  linkText: {
    color: '#222',
    fontSize: 15,
    fontWeight: '500',
  },
  otherLoginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 8,
    paddingHorizontal: 2,
  },
  divider: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#674ffb',
    marginHorizontal: 6,
    opacity: 0.3,
  },
  otherLoginText: {
    fontSize: 15,
    color: '#674ffb',
    fontWeight: 'bold',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 12,
  },
  socialBtn: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    marginHorizontal: 6,
    alignItems: 'center',
    height: 54,
    justifyContent: 'center',
    elevation: 1,
  },
});