import React, {useState, useEffect} from 'react';
import {Icon} from 'react-native-elements';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  onPress,
} from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#8bbbf7',
    margin: 5,
    borderRadius: 10,
    padding: 6,
  },

  content: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    width: 100,
    borderWidth: 0.5,
    borderColor: 'black',
  },

  txt: {
    color: 'white',
    justifyContent: 'center',
    fontSize: 10,
    top: 35,
  },

  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
  },

  weather: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    top: 10,
  },
  main: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  temp: {
    textAlign: 'center',
  },
  wind: {
    top: 20,
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  icon: {
    width: 100,
    height: 90,
  },
  temps: {
    top: 10,
    color: 'white',
    textAlign: 'center',
  },
});

function Exometeo5() {
  const [meteo5, setMeteo5] = useState({
    list: [],
  });

  useEffect(() => {
    temps5jours();
  }, []);

  function temps5jours() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(
      'http://api.openweathermap.org/data/2.5/forecast?zip=06550,fr&appid=0117bfc8112320174887d7f1d1099bff&units=metric&lang=fr',
      options,
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (datameteo) => {
          setMeteo5(datameteo);
          console.log(datameteo.list);
        },
        (error) => {
          console.log(error);
        },
      );
  }

  const prevision = meteo5.list.map((meteo, index) => (
    <View style={styles.card}>
      <Image
        style={styles.icon}
        source={{
          uri:
            'http://openweathermap.org/img/wn/' +
            meteo.weather[0].icon +
            '.png',
        }}
      />
      <Text style={styles.main}>{meteo.weather[0].main}</Text>
      <Text style={styles.temps}>
        <Icon type="entypo" name="thermometer" size={13} color="orange" />
        {''}
        {meteo.main.temp}°C
      </Text>
      <Text style={styles.wind}>
        <Icon
          style={styles.air}
          type="entypo"
          name="air"
          size={10}
          color="white"
        />{' '}
        {meteo.wind.speed}km/h
      </Text>
      <Text style={styles.txt}> {meteo.dt_txt}</Text>
    </View>
  ));

  return (
    <ScrollView horizontal={true}>
      <Text style={styles.title}></Text>
      {prevision}
    </ScrollView>
  );
}

export default Exometeo5;
