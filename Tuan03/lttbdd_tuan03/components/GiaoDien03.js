import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function GiaoDien03() {
  return (
    <LinearGradient
      colors={['#C7F4F7', '#D1F4F6', '#E5F4F5', '#37D6F8', '#00CCF9']}
      locations={[0.0003, 0.3021, 0.8542, 0.965, 1]}
      style={styles.gradient}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <Ionicons
            name="lock-closed"
            size={120}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.title}>FORGET {'\n'}PASSWORD</Text>
          <Text style={styles.subtitle}>
            Provide your account’s email for which you want to reset your
            password
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={24}
              color="black"
              style={styles.mailIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#000"
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  bottomContainer:{
    paddingHorizontal:30,
    width: '100%',
    marginBottom:'30%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1BFBF',
    borderRadius: 2,
    width: '100%',
    height: 48,
    marginBottom: 32,
    paddingHorizontal: 12,
  },
  mailIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  button: {
    backgroundColor: '#FFDD00',
    width: '100%',
    height: 48,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1,
  },
});
