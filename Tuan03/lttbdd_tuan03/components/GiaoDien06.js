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
export default function Giaodien06() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [gender, setGender] = useState(null);

  return (
    <View style={stypes.container}>
      <Text style={stypes.title}>REGISTER</Text>
      <TextInput placeholder="Name" style={stypes.input} />
      <TextInput placeholder="Phone" style={stypes.input} />
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
      <TextInput placeholder="Birthday" style={stypes.input} />
      <View style={stypes.radioRow}>
        <TouchableOpacity
          style={stypes.radioBtn}
          onPress={() => setGender('male')}>
          <View
            style={[
              stypes.radioCircle,
              gender === 'male' && stypes.radioChecked,
            ]}></View>
          <Text style={stypes.radioLabel}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stypes.radioBtn}
          onPress={() => setGender('female')}
        >
          <View style={[stypes.radioCircle, gender === 'female' && stypes.radioChecked]} />
          <Text style={stypes.radioLabel}>Female</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={stypes.button}>
        <Text style={stypes.buttonText}>REGISTER</Text>
      </TouchableOpacity>
      <View style={stypes.text}>
        <Text style={stypes.text}>When you agree to terms and conditions</Text>
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
    marginTop: 20,
  },
  inputBox: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D2EAD7',
    height: 50,
    marginHorizontal: 20,
    marginTop: 20,
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
  radioRow:{
    marginTop: 30,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 30,
  },
  radioBtn:{
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 32,
  },
  radioCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#111',
    marginRight: 8,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioChecked: {
    borderColor: '#111',
    backgroundColor: '#111',
  },
  radioLabel: {
    fontSize: 18,
    color: '#222',
  }
});
