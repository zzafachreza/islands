import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import Intl from "intl";
import 'intl/locale-data/jsonp/id-ID'
import { MyHeader, MyInput } from '../../components';
import { WebView } from 'react-native-webview';

export default function StatesDetail({ navigation, route }) {
    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul="States Detail" onPress={() => navigation.goBack()} />

            <View style={{
                marginHorizontal: 10,
                backgroundColor: colors.primary,
                borderRadius: 10,
                overflow: 'hidden',
                // borderWidth: 1,
                padding: 10,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    color: colors.black,
                    fontSize: 20
                }}>{item.State}</Text>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: 16
                    }}>Population</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        color: colors.black,
                        fontSize: 16
                    }}>{new Intl.NumberFormat().format(item.Population)}</Text>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: 16
                    }}>Year</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        color: colors.success,
                        fontSize: 16
                    }}>{item.Year}</Text>
                </View>
            </View>

            <WebView
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onMessage={(event) => {
                    console.log('event: ', event)
                }}
                injectedJavaScript={`
                var element1 = document.getElementsByClassName('header-container')[0];
                var element2 = document.getElementsByClassName('banner-container')[0];
                element1.style.display = 'none';
                element2.style.display = 'none';
                `} source={{ uri: 'https://id.wikipedia.org/wiki/' + item.State }} style={{ flex: 1 }} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})