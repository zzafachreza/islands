import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Animated, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking, ImageBackground } from 'react-native';
import { fonts, windowWidth, colors, windowHeight, MyDimensi } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import SweetAlert from 'react-native-sweet-alert';
import { color } from 'react-native-reanimated';

export default function Home({ navigation }) {

  const [kirim, setKirim] = useState({
    api_token: api_token,
    email: null,
    password: null
  });
  const [loading, setLoading] = useState(false);

  const [comp, setComp] = useState({});

  const card = new Animated.Value(-30);
  const img = new Animated.Value(-20);





  useEffect(() => {
    Animated.timing(card, {
      toValue: 1,
      duration: 850,
      useNativeDriver: false,
    }).start();
    Animated.timing(img, {
      toValue: 0,
      duration: 850,
      useNativeDriver: false,
    }).start();
    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })

  }, []);

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white

    }}>

      <ScrollView style={{ position: "relative" }}>


        <Animated.View style={{
          padding: 10,
          flex: 1, margin: 10,
          bottom: card,
          borderRadius: 0,

        }}>

          <Image source={require('../../assets/icon.png')} style={{
            width: 250,
            height: 250,
            alignItems: 'center',
            alignSelf: "center",

          }} />



          <Text style={{
            fontFamily: fonts.secondary[800],
            textAlign: 'center',
            fontSize: 20,
            color: colors.black,
            marginTop: 10,
          }}>Halo, Selamat Datang !</Text>


        </Animated.View>
        <View style={{
          marginTop: '10%',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('States')} style={{
            padding: 10,
            backgroundColor: colors.primary,
            width: windowWidth / 2,
            height: windowWidth / 2,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image source={require('../../assets/a1.png')} style={{
              width: '75%',
              height: '75%'
            }} />
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: 20,
              color: colors.black
            }}>States</Text>
          </TouchableOpacity>
        </View>





        {loading && <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>}

      </ScrollView>
      <Text style={{
        fontFamily: fonts.secondary[400],
        textAlign: 'center',
        fontSize: 14,
        color: colors.black,
        marginBottom: 10,
      }}>Copyright © 2024 | Islands</Text>
    </View>




  );
}

const styles = StyleSheet.create({});
