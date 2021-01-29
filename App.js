import React, {useState} from 'react';
import { StyleSheet, Text, View,TextInput,Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import RadioForm from 'react-native-simple-radio-button';

export default function App() {
  const [weight, setWeight] = useState('');
  const [bottleamount, setBottleamount] = useState(1);
  const [time, setTime] = useState(0);
  const [gender, setGender] = useState('male');
  const [promilles, setPromilles] = useState(0);
  const [ready, setReady] = useState(false);

  const bottles=Array();
  bottles.push({label: '1 bottle',value:1});
  bottles.push({label: '2 bottles',value:2});
  bottles.push({label: '3 bottles',value:3});
  bottles.push({label: '4 bottles',value:4});
  bottles.push({label: '5 bottles',value:5});
  bottles.push({label: '6 bottles',value:6});
  bottles.push({label: '7 bottles',value:7});
  bottles.push({label: '8 bottles',value:8});
  bottles.push({label: '9 bottles',value:9});
  bottles.push({label: '10 bottles',value:10});

  const hours=Array();
  hours.push({label: '1 hour',value:1});
  hours.push({label: '2 hours',value:2});
  hours.push({label: '3 hours',value:3});
  hours.push({label: '4 hours',value:4});
  hours.push({label: '5 hours',value:5});
  hours.push({label: '6 hours',value:6});
  hours.push({label: '7 hours',value:7});
  hours.push({label: '8 hours',value:8});
  hours.push({label: '9 hours',value:9});
  hours.push({label: '10 hours',value:10});

  const genders = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ];

  function getPromilles() {
    
    let burning = weight / 10;
    let litres = bottleamount * 0.33;
    let grams = litres * 8 * 4.5;
    let gramsleft = grams - (burning * time);

    if (!Number.isFinite(burning) || burning <= 0) {
    //  bad input
      setReady(false);
      return 0;
    } 

    setReady(true);
    let promilles = 0;
    if (gender === 'male') {
      promilles = gramsleft / (weight * 0.7);
    }
    else {
      promilles = gramsleft / (weight * 0.6);
    }

    if (promilles<0) {
      return 0;}
    return promilles;
  }

  function calculate() {
   
    let promilles = getPromilles();
    setPromilles(promilles);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weight</Text>
      <TextInput
       style={styles.input}
       onChangeText={text => setWeight(text)}
       placeholder="in kilograms"
       keyboardType='numeric'>
      </TextInput>
      <Text style={styles.header}>Bottles</Text>
      <Picker
          onValueChange={(itemValue) => setBottleamount(itemValue)}
          selectedValue={bottleamount}
          >
            {bottles.map((bottleamount,index) => (
              <Picker.Item key={index} label={bottleamount.label} value={bottleamount.value}/>
            ))}
      </Picker>
      <Text style={styles.header}>Time</Text>
      <Picker
          onValueChange={(itemValue) => setTime(itemValue)}
          selectedValue={time}
          >
            {hours.map((time,index) => (
              <Picker.Item key={index} label={time.label} value={time.value}/>
            ))}
      </Picker>
      <Text style={styles.header}>Gender</Text>
     <RadioForm
     style={styles.radio}
     buttonSize = {10}
     radio_props={genders}
     initial={0}
     onPress={(value) => {setGender(value)}}
     />
     {ready &&
     <>
        <Text style={styles.header}>Promilles</Text>
        <Text>{promilles.toFixed(2)}</Text>
    </>
     }
     {!ready &&
        <Text>Please check weight input</Text>
      
     }
    
     <Button title="Calculate" onPress={calculate}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    paddingTop: 30,
  },
  field: {
    margin: 10,
  },
  input: {
    marginLeft: 10,
  },
  radio: {
    marginTop: 10,
    marginBottom: 10,
   },
});
