import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function GiaoDien01() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.circleContainer}>
            <View style={styles.circle} />
          </View>
          <View style={styles.center}>
            <Text style={styles.title}>GROW{'\n'}YOUR BUSINESS</Text>
            <Text style={styles.subtitle}>
              We will help you to grow your business using{'\n'}online server
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
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#00C4F7',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  top: {
    alignItems: 'center',
    marginTop: 60,
    width: '100%',
    flex: 1,
  },
  circleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  circle: {
    borderWidth: 8,
    borderColor: 'black',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'transparent',
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
});