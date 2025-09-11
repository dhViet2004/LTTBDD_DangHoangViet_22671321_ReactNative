import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function GiaoDien07() {
  return (
    <LinearGradient colors={['#FBCB00', '#BF9A00']} style={styles.gradient}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.title}>
          <Text style={styles.loginText}>LOGIN</Text>
        </View>

        <View style={styles.inputBox}>
          <Ionicons name='person' style={styles.icon}/>
          <TextInput placeholder="Name" style={styles.input}/>
        </View>
        <View style={styles.inputBox}>
          <Ionicons name='lock-closed' style={styles.icon}/>
          <TextInput placeholder="Password" style={styles.input}/>
          <Ionicons name= 'eye' style={styles.icon}/>
        </View>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginTextBtn}>LOGIN</Text>
        </TouchableOpacity>

        <Text style={styles.textBottom}>CREATE ACCOUNT</Text>
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
  title: {
    marginVertical: 109,
    alignItems: 'flex-start',
  },
  loginText: {
    marginLeft: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputBox:{
    marginBottom: 30,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
  },
  input:{
    width: '100%',
    height: '100%',
    fontSize: 30,
    paddingHorizontal: 20,
  },
  icon:{
    fontSize: 30,
  },
  loginBtn:{
    marginTop: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    backgroundColor:'black'
  },
  loginTextBtn:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textBottom:{
    marginTop: 40,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
