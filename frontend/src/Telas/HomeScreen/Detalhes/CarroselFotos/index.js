import React, { useState, useEffect } from "react";

import { Image, Text, View, TouchableOpacity, Modal, Dimensions } from "react-native";



const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

import seta from "../../../../../assets/left.png"

import useImpreesao from "../../../../Contexts/useImpressao";
export default function CarroselFotos({ visivelFotos, fecharModalFotos, fotos }) {
    const [contador, setContador] = useState(0)

    const aumenta = () => {
        setContador(contador + 1)
    }


    const diminui = () => {
        setContador(contador - 1)
    }

    useEffect(() => {
        console.log(fotos[0])
        console.log(fotos[1])


    })





    return (
        <Modal
            transparent
            visible={visivelFotos}
            animationType="fade"
            statusBarTranslucent
            onRequestClose={fecharModalFotos}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#000000a8",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        if (visivelFotos) fecharModalFotos();
                    }}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                />


                <View
                    style={{
                        backgroundColor: "white",
                        width: width - 50,
                        height: height - 260,
                        borderRadius: 15,
                        padding: 20
                    }}
                >

                    <View style={{}}>

                        <Text>{contador}</Text>

                        {contador > 0 ? (<TouchableOpacity onPress={() => {
                            diminui()
                        }}>
                            <View style={{ backgroundColor: '#ffffff', width: 50, height: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center', position: 'absolute', marginTop: 200, opacity: 0.7 }}>
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={seta}
                                />
                            </View>

                        </TouchableOpacity>) : (null)}




                        {contador < fotos.length ?? [] ? (<TouchableOpacity onPress={() => {
                            aumenta()
                        }}>
                            <View style={{ backgroundColor: '#ffffff', width: 50, height: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center', position: 'absolute', marginTop: 200, alignSelf: 'flex-end', transform: [{ rotate: '180deg' }], opacity: 0.7 }}>
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={seta}
                                />



                            </View>
                        </TouchableOpacity>) : (null)}


                        <Image
                            style={{
                                width: "100%",
                                height: '90%',
                                marginBottom: 20,
                                borderRadius: 30,
                                elevation: 3
                            }} source={{ uri: fotos[contador].url }}
                        />




                    </View>

                </View>
            </View>
        </Modal>
    );
}
