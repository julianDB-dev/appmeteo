import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';
import Projetfinal from './components/projetfinal';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'white',
  },
});

function App() {
  {
    /*} const [zipCode, setZipCode] = useState('06200');
  const handleZipCodeInput = (value) => {
    setZipCode(value);
  };*/
  }
  const Cacahuete = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Cacahuete.Navigator
        initialRouteName="Mon compte"
        openByDefault
        drawerType="slide">
        <Cacahuete.Screen
          name="projetfinal"
          component={Projetfinal}
          options={{title: 'Code Postal'}}
        />
        {/*<TextInput
          style={{
            height: 40,
            borderColor: 'white',
            borderWidth: 1,
            width: 130,
            marginBottom: 5,
          }}
          onChangeText={handleZipCodeInput}
          value={zipCode}
        />*/}
      </Cacahuete.Navigator>
    </NavigationContainer>
  );
}

export default App;
