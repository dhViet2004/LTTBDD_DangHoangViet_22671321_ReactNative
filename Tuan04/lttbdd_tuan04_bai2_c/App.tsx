import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PasswordOutput from './components/PasswordOutput';
import PasswordLengthInput from './components/PasswordLengthInput';
import OptionCheckbox from './components/OptionCheckbox';
import GenerateButton from './components/GenerateButton';

const PasswordGeneratorScreen: React.FC = () => {
  const [length, setLength] = useState<string>('8');
  const [lower, setLower] = useState<boolean>(true);
  const [upper, setUpper] = useState<boolean>(false);
  const [number, setNumber] = useState<boolean>(true);
  const [symbol, setSymbol] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const generatePassword = useCallback(() => {
    let charset = '';
    if (lower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (number) charset += '0123456789';
    if (symbol) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!charset) {
      setPassword('');
      return;
    }
    let pass = '';
    for (let i = 0; i < Number(length); i++) {
      pass += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(pass);
  }, [length, lower, upper, number, symbol]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>PASSWORD{'\n'}GENERATOR</Text>
        <PasswordOutput password={password} />
        <PasswordLengthInput value={length} onChange={setLength} />
        <OptionCheckbox label="Include lower case letters" checked={lower} onToggle={() => setLower(v => !v)} />
        <OptionCheckbox label="Include upcase letters" checked={upper} onToggle={() => setUpper(v => !v)} />
        <OptionCheckbox label="Include number" checked={number} onToggle={() => setNumber(v => !v)} />
        <OptionCheckbox label="Include special symbol" checked={symbol} onToggle={() => setSymbol(v => !v)} />
        <GenerateButton onPress={generatePassword} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5D6D9C' },
  container: {
    backgroundColor: '#23235B',
    margin: 20,
    padding: 24,
    borderRadius: 22,
    elevation: 10,
    shadowColor: '#222',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    width: 330,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    letterSpacing: 1.5,
  },
});

export default PasswordGeneratorScreen;