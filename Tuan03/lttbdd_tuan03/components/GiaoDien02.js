import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
export default function GiaoDien02() {
  return (
    <LinearGradient
      colors={['#C7F4F7', '#D1F4F6', '#E5F4F5', '#37D6F8', '#00CCF9']}
      locations={[0.0003, 0.3021, 0.8542, 0.965, 1]}
      style= {styles.gradient}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <View style={styles.top}>
            <View style={styles.circleContainer}>
              <View style={styles.circle} />
            </View>
            <View style={styles.center}>
              <Text style={styles.title}>GROW {'\n'}YOUR BUSINESS</Text>
              <Text style={styles.subtitle}>
                We will help you to grow your business using online server
              </Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.howWork}>HOW WE WORK?</Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  howWork: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  bottom: {
    width: '100%',
    marginBottom: 40,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#E8BB00',
    borderRadius: 15,
    paddingVertical: 13,
    paddingHorizontal: 28,
    marginHorizontal: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  top: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
    marginTop: 60,
  },
  circle: {
    borderWidth: 8,
    backgroundColor: 'black',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'transparent',
  },
  circleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 18,
  },
  subtitle: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
});
