import React, {useState, useEffect} from 'react';
import Exometeo2 from './Exometeo2';
import {Icon} from 'react-native-elements';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  Niveau1: {
    flex: 5,
  },
  Imagebg: {
    flex: 1,
    resizeMode: 'cover',
  },
  conteneur1: {
    flex: 2,
    flexDirection: 'row',
  },
  conteneur1esc1: {
    flex: 1,
  },
  Bouton1: {
    top: 15,
    marginLeft: 80,
  },
  Bouton2: {
    top: 15,
  },

  date: {
    fontSize: 25,
    textAlign: 'center',
    top: 20,
    color: 'white',
  },
  conteneur1esc2: {
    flex: 1,
    flexDirection: 'row',
  },

  conteneur2: {
    flex: 2,
    flexDirection: 'column',
  },
  heure: {
    marginLeft: 40,
    fontSize: 60,
    color: 'white',
  },
  city: {
    fontSize: 25,
    color: 'white',
    marginLeft: 15,
  },

  conteneur4: {
    flex: 4,
    flexDirection: 'row',
  },
  conteneur4esc4: {
    flex: 1,
  },
  temps: {
    bottom: 30,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  conteneur4esc5: {
    flex: 1,
  },

  main: {
    fontSize: 35,
    color: 'white',
    top: 40,
    marginLeft: 20,
  },
  tempmin: {
    top: 65,
    marginLeft: 5,
    color: 'white',
  },
  tempmax: {
    top: 75,
    marginLeft: 20,
    color: 'white',
  },
  wind: {
    top: 85,
    marginLeft: 60,
    color: 'white',
  },

  icon: {
    marginRight: 120,
    width: 200,
    height: 190,
  },
});

function Projetfinal(props) {
  const openDrawer = () => {
    props.navigation.toggleDrawer();
  };
  const [meteo, setMeteo] = useState({
    weather: [{}],
    main: [{}],
    wind: [{}],
  });

  const [zipCode, setZipCode] = useState('06550');
  const handleZipCodeInput = (value) => {
    setZipCode(value);
  };

  saveValue = async () => {
    try {
      await AsyncStorage.setItem('zipcode', zipCode);
      console.log('succes');
    } catch (error) {
      console.log(error);
    }

    console.log('Done.');
  };
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
      'http://api.openweathermap.org/data/2.5/weather?zip=' +
        zipCode +
        ',fr&appid=b6497aa622623d34b037dcf0e8a4f213&units=metric&lang=fr',
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
    <View style={styles.Niveau1}>
      <ImageBackground
        style={styles.Imagebg}
        source={require('../assets/images/bleu2.jpg')}>
        <View style={styles.conteneur1}>
          <View style={styles.conteneur1esc1}>
            <Text style={styles.date}>26/10/2020 Lundi</Text>
          </View>

          <View style={styles.conteneur1esc2}>
            <View>
              <TextInput
                style={{
                  marginLeft: 90,
                  top: 60,
                  position: 'absolute',
                  color: 'white',
                  height: 40,
                  borderColor: 'white',
                  borderWidth: 1,
                  width: 70,
                }}
                onChangeText={handleZipCodeInput}
                value={zipCode}
              />
            </View>
            <TouchableOpacity style={styles.button4} onPress={saveValue}>
              <Text>Essai</Text>
            </TouchableOpacity>
            <View style={styles.Bouton1}>
              <TouchableOpacity style={styles.button} onPress={openDrawer}>
                <Icon
                  type="entypo"
                  name="magnifying-glass"
                  size={40}
                  color="white"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.Bouton2}>
              <TouchableOpacity style={styles.button} onPress={recup}>
                <Icon type="entypo" name="cw" size={40} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.conteneur2}>
          <Text style={styles.heure}>10h00</Text>
          <Text style={styles.city}>
            <Icon type="entypo" name="location-pin" size={25} color="red" />{' '}
            {meteo.name}
          </Text>
        </View>

        <View style={styles.conteneur4}>
          <View style={styles.conteneur4esc4}>
            <Image
              style={styles.icon}
              source={{
                uri:
                  'http://openweathermap.org/img/wn/' +
                  meteo.weather[0].icon +
                  '.png',
              }}
            />
            <Text style={styles.temps}>{meteo.weather[0].description}</Text>
          </View>
          <View style={styles.conteneur4esc5}>
            <Text style={styles.main}>
              <Icon type="entypo" name="thermometer" size={25} color="orange" />{' '}
              {meteo.main.temp}°C
            </Text>
            <Text style={styles.tempmin}>
              Température min: {meteo.main.temp_min}°C
            </Text>
            <Text style={styles.tempmax}>
              Température max: {meteo.main.temp_max}°C
            </Text>
            <Text style={styles.wind}>
              <Icon
                style={styles.air}
                type="entypo"
                name="air"
                size={15}
                color="white"
              />{' '}
              Vent : {meteo.wind.speed}km/h
            </Text>
          </View>
        </View>
        <Exometeo2 />
      </ImageBackground>
    </View>
  );
}

export default Projetfinal;
