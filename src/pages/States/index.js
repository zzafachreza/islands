import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { SvgUri } from 'react-native-svg';
import Intl from "intl";
import 'intl/locale-data/jsonp/id-ID';
import { MyHeader, MyInput } from '../../components';
export default function States({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [key, setKey] = useState('');
    const [TMP, setTMP] = useState([]);

    const getDataTransaksi = () => {
        setLoading(true);
        axios.get('https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest').then(res => {
            console.log(res.data.data);
            setData(res.data.data.slice(0, -1));
            setTMP(res.data.data.slice(0, -1))
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getDataTransaksi();
    }, []);

    const __renderItem = ({ item }) => {
        return (



            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('StatesDetail', item)
            }}>
                <View style={{
                    marginBottom: 10,
                    backgroundColor: colors.primary,
                    width: '100%',
                    position: 'relative',
                    borderRadius: 10,
                    overflow: 'hidden',
                    // borderWidth: 1,
                    padding: 10,
                }}>
                    <Image source={{
                        uri: `https://okeadmin.com/flags/${item.State}.jpg`
                    }} style={{
                        width: '100%',
                        height: 200,
                    }} />

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
                            color: colors.secondary,
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
                            color: colors.black,
                            fontSize: 16
                        }}>{item.Year}</Text>
                    </View>


                </View>
            </TouchableWithoutFeedback >



        )
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader judul="States" onPress={() => navigation.goBack()} />



            {!loading &&
                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}>
                    <View style={{
                        position: 'relative'
                    }}>
                        {key.length > 0 &&

                            <TouchableWithoutFeedback onPress={() => {
                                setKey(''); setData(TMP);
                            }}>
                                <View style={{
                                    position: 'absolute',
                                    zIndex: 99,
                                    top: 10,
                                    right: 10,
                                }}>
                                    <Icon type='ionicon' name='close' color={colors.secondary} />
                                </View>
                            </TouchableWithoutFeedback>}
                        <View style={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                        }}>
                            <Icon type='ionicon' name='search' color={colors.primary} />
                        </View>
                        <TextInput value={key} onChangeText={x => {
                            setKey(x);
                            if (x.length > 0) {
                                let TMPSrc = data.filter(i => i.State.toLowerCase().indexOf(x.toLowerCase()) > -1);
                                if (TMPSrc.length > 0) {
                                    setData(TMPSrc);
                                }
                            } else {
                                setData(TMP);
                            }
                        }} placeholder='Search . . .' style={{
                            height: 45,
                            borderWidth: 1,
                            marginBottom: 10,
                            borderRadius: 30,
                            paddingLeft: 40,
                            borderColor: colors.primary,
                            fontFamily: fonts.secondary[600],
                            fontSize: MyDimensi / 4
                        }} />
                    </View>
                    <FlatList data={data} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

                </View>
            }
            {loading &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={colors.primary} />

                </View>
            }



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})