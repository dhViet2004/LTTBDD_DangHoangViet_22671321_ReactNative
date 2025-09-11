import {View, StyleSheet,Text, Dimensions, TextInput} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const {height} = Dimensions.get('window');

export default function Giaodien04 (){
  return (
    <LinearGradient
      colors={['#C7F4F7', '#D1F4F6', '#E5F4F5', '#37D6F8', '#00CCF9']}
      locations={[0.0003, 0.3021, 0.8542, 0.965, 1]}
      style={styles.gradient}
    >
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.title}>CODE</Text>
      </View>

      <Text style={styles.TextMain}>VERIFICATION</Text>
      <Text style={styles.TextSubMain}>Enter ontime password sent on {'\n'}++849092605798</Text>
      <View style={styles.row}>
        {[...Array(6)].map((_,i)=>(
          <View key={i} style={styles.square}></View>
        ))}
      </View>
      <View style={styles.button}>
      <TextInput placeholder='VERIFY CODE' style={styles.textInput}/>
    </View>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient:{
    flex:1,
  },
  container:{
    flex:1,
    alignItems:'center',
  },
  containerTop:{
    alignItems:'center',
    marginTop: height * 0.2,
  },
  title:{
    fontSize: 70,
    fontWeight: 'bold',
  },
  TextMain:{
    marginTop: height*0.1,
    fontWeight:'bold',
    fontSize: 30,
  },
  TextSubMain:{
    marginTop: height*0.1,
    textAlign:'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  square:{
    width: 50,
    height: 50,
    borderColor: 'black',
    borderWidth: 2,
  },
  button:{
    backgroundColor: '#E3C000',
    alignItems: 'center',
    width: '80%',
    borderRadius: 5,
    marginTop:10,
  },
  textInput:{
    fontWeight: 'bold',
    fontSize: 15,
    textAlign:'center',
    width:'100%',
    height: 50,
  }
})