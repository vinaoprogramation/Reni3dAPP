import React, { useEffect, useState } from "react";
import { Image, Text, View, TouchableOpacity, Modal, Dimensions } from "react-native";

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

import seta from "../../../../../assets/left.png";
import useImpreesao from "../../../../Contexts/useImpressao";

export default function CarroselFotos({ visivelFotos, fecharModalFotos, fotos, contadorInicial }) {

    const dadosIndividuais = useImpreesao((state) => state.dadosIndividuais)
    const [contador, setContador] = useState(0);
    useEffect(() => {
        setContador(contadorInicial)
    }, [contadorInicial])

    const listaFotos = fotos || [];

    const aumenta = () => {
        if (contador < listaFotos.length - 1) {
            setContador(contador + 1);
        }
    };

    const diminui = () => {
        if (contador > 0) {
            setContador(contador - 1);
        }
    };

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
                    <View style={{marginBottom: 25}}>
                        <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold' }}>
                        {dadosIndividuais?.projeto?.nome_impressao} {"\u2022"} {contador + 1} / {listaFotos.length}
                    </Text>
                    </View>
                    


                    <View style={{ flex: 1, position: 'relative', justifyContent: 'center' }}>

                        {listaFotos && listaFotos[contador] && listaFotos[contador].url ? (
                            <Image
                                style={{
                                    width: "100%",
                                    height: '100%',
                                    borderRadius: 30,

                                }}
                                source={{ uri: listaFotos[contador].url }}
                            />
                        ) : (
                            <Text style={{ alignSelf: 'center' }}>Imagem indisponível</Text>
                        )}

                        {contador > 0 && (
                            <TouchableOpacity
                                onPress={diminui}
                                style={{
                                    position: 'absolute',
                                    left: 15,
                                    backgroundColor: '#ffffff',
                                    width: 40,
                                    height: 40,
                                    borderRadius: 25,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    opacity: 0.8,
                                    elevation: 5,
                                    zIndex: 5
                                }}
                            >
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={seta}
                                />
                            </TouchableOpacity>
                        )}

                        {contador < listaFotos.length - 1 && (
                            <TouchableOpacity
                                onPress={aumenta}
                                style={{
                                    position: 'absolute',
                                    right: 15, 
                                    backgroundColor: '#ffffff',
                                    width: 40,
                                    height: 40,
                                    borderRadius: 25,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    transform: [{ rotate: '180deg' }],
                                    opacity: 0.8,
                                    elevation: 5,
                                }}
                            >
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={seta}
                                />
                            </TouchableOpacity>


                        )}

                       


                    </View>

                     <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', height: 60 }}>
                            <TouchableOpacity style={{ marginRight: 30, marginBottom: 10 }} onPress={fecharModalFotos}>
                                <Text style={{ color: "#59afff" }}>FECHAR</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
        </Modal>
    );
}
