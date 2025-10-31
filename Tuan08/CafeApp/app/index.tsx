import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

// Giả sử bạn lưu ảnh trong assets
const jewelBoxImage = require('../assets/images/anh1.png'); // Sửa đường dẫn
const javastiImage = require('../assets/images/anh2.png');   // Sửa đường dẫn

export default function WelcomeScreen() {
  
  const handleGetStarted = () => {
    // Dùng replace để không quay lại màn hình này
    router.replace('/(tabs)/shops'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Cafe world</Text>
        <Image source={jewelBoxImage} style={styles.image} />
        <Image source={javastiImage} style={styles.image} />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Màu nền xám nhạt
    padding: 20,
  },
  content: {
    flex: 1, // Đẩy nút xuống dưới
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  image: {
    width: '80%',
    height: 100, // Chiều cao cố định
    resizeMode: 'contain', // Đảm bảo ảnh vừa vặn
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00BCD4', // Màu cyan
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});