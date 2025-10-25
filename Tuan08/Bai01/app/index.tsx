import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [name, setName] = useState('');

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <Text style={styles.title}>MANAGE YOUR{'\n'}TASK</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#808080" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#808080"
            value={name}
            onChangeText={setName}
          />
        </View>
        <Link
          href={{
            pathname: '/(tabs)/screen2' as any,
            params: { name }
          }}
          asChild
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>GET STARTED</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#8A5FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 48,
    marginTop: -48,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 32,
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 320,
    height: 40,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00C4CC',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: 'center',
    minWidth: 180,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 1,
  },
});