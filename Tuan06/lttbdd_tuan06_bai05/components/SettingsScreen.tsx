import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Nhận thông báo</Text>
        <Switch value={isEnabled} onValueChange={setIsEnabled} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Chế độ tối</Text>
        <Switch value={isDark} onValueChange={setIsDark} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 32, backgroundColor: '#fff' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 },
  label: { fontSize: 18 }
});