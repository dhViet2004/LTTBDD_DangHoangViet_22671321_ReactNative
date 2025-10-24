import { useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

export default function AddJobScreen() {
  const { name, id, title } = useLocalSearchParams<{ name?: string; id?: string; title?: string }>();
  const [job, setJob] = useState(title || '');
  const [loading, setLoading] = useState(false);

  // Đổi link này thành require nếu dùng ảnh local
  const noteImage = 'https://cdn-icons-png.flaticon.com/512/3515/3515437.png';

  const handleFinish = async () => {
    if (!job.trim()) return;
    setLoading(true);
    try {
      if (id) {
        // Update task
        await fetch(`https://68fb388194ec960660251c2e.mockapi.io/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: job,
            completed: false
          })
        });
      } else {
        // Add new task
        await fetch('https://68fb388194ec960660251c2e.mockapi.io/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: job,
            completed: false
          })
        });
      }
      setJob('');
      router.back();
    } catch {
      alert('Có lỗi khi lưu công việc!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFC'}}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Image source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }} style={styles.avatar} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.headerName}>Hi {name || 'User'}</Text>
          <Text style={styles.headerSubtitle}>Have a grate day a head</Text>
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
      </View>
      {/* Title */}
      <Text style={styles.title}>ADD YOUR JOB</Text>
      {/* Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="document-text-outline" size={20} color="#46C18D" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="input your job"
          placeholderTextColor="#787878"
          value={job}
          onChangeText={setJob}
        />
      </View>
      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleFinish}
        disabled={loading || !job.trim()}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Text style={styles.buttonText}>FINISH</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 8 }} />
          </>
        )}
      </TouchableOpacity>
      {/* Note Image */}
      <Image
        source={{ uri: noteImage }}
        style={styles.noteImage}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 8,
  },
  avatar: {
    width: 48, height: 48, borderRadius: 24, marginRight: 4,
  },
  headerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#787878',
    marginTop: 2,
  },
  title: {
    textAlign: 'center',
    color: '#222',
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 32,
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    width: '85%',
    height: 46,
    alignSelf: 'center',
    marginBottom: 32,
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
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignSelf: 'center',
    minWidth: 180,
    justifyContent: 'center',
    marginBottom: 28,
    marginTop: 0,
    opacity: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 17,
    letterSpacing: 1,
  },
  noteImage: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    marginTop: 40,
  },
});