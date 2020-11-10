import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Image, TextInput} from 'react-native';

const styles = StyleSheet.create({
  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  search: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  temps: {
    color: 'black',
    textAlign: 'right',
    padding: 20,
    fontSize: 15,
  },
  main: {
    color: 'black',
    textAlign: 'right',
    padding: 20,
    fontSize: 45,
  },
  wind: {
    color: 'black',
    textAlign: 'center',
    padding: 20,
    fontSize: 15,
  },

  icon: {
    marginRight: 170,
    width: 170,
    height: 160,
  },

  tempmin: {
    color: 'black',
    textAlign: 'center',
    padding: 20,
    fontSize: 10,
  },

  tempmax: {
    color: 'black',
    textAlign: 'center',

    fontSize: 10,
  },
});

function Exometeo() {
  const [meteo, setMeteo] = useState({
    weather: [{}],
    main: [{}],
    wind: [{}],
  });
  const [zipCode, setZipCode] = React.useState('');

  useEffect(() => {
    recup();
  }, []);

  function recup() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(
      'http://api.openweathermap.org/data/2.5/weather?zip=06550,fr&appid=0117bfc8112320174887d7f1d1099bff&units=metric&lang=fr',
      options,
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (datameteo) => {
          setMeteo(datameteo);
        },
        (error) => {
          console.log(error);
        },
      );
  }

  return (
    <View>
      <Text style={styles.temps}>{meteo.weather[0].description}</Text>
      <Image
        style={styles.icon}
        source={{
          uri:
            'http://openweathermap.org/img/wn/' +
            meteo.weather[0].icon +
            '.png',
        }}
      />
      <Text style={styles.title}>La Roquette sur Siagne</Text>

      <Text style={styles.main}>{meteo.main.temp}°C</Text>
      <Text style={styles.tempmin}>
        Température minimale : {meteo.main.temp_min}°C
      </Text>
      <Text style={styles.tempmax}>
        Température maximale : {meteo.main.temp_max}°C
      </Text>
      <Text style={styles.wind}>Vent : {meteo.wind.speed}km/h</Text>
    </View>
  );
}

export default Exometeo;
