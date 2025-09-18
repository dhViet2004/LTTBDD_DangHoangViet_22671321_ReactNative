import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import InputField from './components/InputField';
import LoginButton from './components/LoginButton';
import ForgotPassword from './components/ForgotPassword';

const LoginScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>LOGIN</Text>
        <View style={{ marginTop: 60 }}>
          <InputField
            iconName="person"        
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <InputField
            iconName="lock-closed"   
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            showEye
          />
        </View>
        <LoginButton onPress={() => {}} />
        <ForgotPassword onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFD600' },
  container: { flex: 1, padding: 18, backgroundColor: '#FFD600' },
  title: { color: '#000', fontSize: 34, fontWeight: 'bold', marginTop: 24 },
});

export default LoginScreen;