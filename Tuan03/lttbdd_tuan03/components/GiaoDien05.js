import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function Giaodien05() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={stypes.container}>
      <Text style={stypes.title}>LOGIN</Text>
      <TextInput placeholder="Email" style={stypes.input} />
      <View style={stypes.inputBox}>
        <TextInput
          placeholder="Password"
          style={stypes.inputPassword}
          secureTextEntry={!isPasswordVisible}
        />

        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={{ marginRight: 10 }}>
          <Ionicons
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color="#333"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={stypes.button}>
        <Text style={stypes.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <View style={stypes.text}>
        <Text style={stypes.text}>When you agree to terms and conditions</Text>

        <TouchableOpacity style={{marginTop: 10}}>
          <Text style={{color: 'blue'}}> For got your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 10}}>
          <Text> Or login with</Text>
        </TouchableOpacity>
      </View>
      <View style={stypes.socialRow}>
        <TouchableOpacity style={[stypes.socialBtn, stypes.facebookBtn]}>
          <Ionicons name="logo-facebook" size={28} color="#fff"/>
        </TouchableOpacity>
        <TouchableOpacity style={[stypes.socialBtn, stypes.zaloBtn]}>
          <Text style={stypes.zaloIcon}>Z</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[stypes.socialBtn, stypes.googleBtn]}>
        <MaterialCommunityIcons name="google" size={28} color="#4285F4" />
      </TouchableOpacity>
      </View>
    </View>
  );
}

const stypes = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4F5E0',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30,
  },
  input: {
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#D2EAD7',
    marginBottom: 40,
    marginTop: 50,
  },
  inputBox: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D2EAD7',
    height: 50,
    marginHorizontal: 20,
  },
  inputPassword: {
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: 'none',
    width: '100%',
    height: '100%',
    flex: 1,
    fontSize: 16,
  },
  button: {
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C82731',
    marginHorizontal: 20,
    height: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 30,
    alignItems: 'center',
  },
  socialRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 50,
  },
  socialBtn:{
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    borderRadius: 2
  },
  facebookBtn:{
    backgroundColor: '#3b5998',
  },
  zaloBtn:{
    backgroundColor: '#2196F3',
  },
  zaloIcon:{
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  googleBtn: {
    backgroundColor: '#D4F5E0',
    borderWidth: 1,
    borderColor: '#4285F4',
  },
});
