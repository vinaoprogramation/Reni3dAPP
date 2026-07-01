import React, { useState, useEffect } from "react";

import { Image, Text, View, TouchableOpacity, Modal, Dimensions } from "react-native";



const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

import useImpreesao from "../../../../Contexts/useImpressao";
export default function CarroselFotos({ visivelFotos, fecharModalFotos }) {
    const dadosIndividuais = useImpreesao((state) => state.dadosIndividuais);

    const passaFoto = () => {
        for(let contador=0; contador<=dadosIndividuais.fotos.length; contador++){
            return (
                <Image source={dadosIndividuais.fotos[contador]} />
            )
        }
        


    }
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

                    <View>
                        {passaFoto}
                    </View>

                </View>
            </View>
        </Modal>
    );
}
