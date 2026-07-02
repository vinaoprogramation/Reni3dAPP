import React, { useState, useEffect } from "react";
import { Text, View, Dimensions, TouchableOpacity, FlatList, Modal, Image, Alert } from "react-native";
import useImpreesao from "../../../Contexts/useImpressao";


// Correção do erro: Importando da pasta legacy para compatibilidade total
import * as FileSystem from 'expo-file-system/legacy';


const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

import information from "../../../../assets/information.png"

import CarroselFotos from "./CarroselFotos";



export default function Detalhes({ visivel, fecharModal }) {
      const [ativoFotos, setAtivoFotos] = useState(false)
      const [mandaFotos, setMandaFotos] = useState([])
      const [contador, setContador] = useState(0)


    const [baixando, setBaixando] = useState(false);
    const [progresso, setProgresso] = useState(0);
    const [carregando, setCarregando] = useState(true);


    const dadosIndividuais = useImpreesao((state) => state.dadosIndividuais);
    const loadSingle = useImpreesao((state) => state.loadSingle);


    const fotoPerfil = dadosIndividuais ? dadosIndividuais.avatar : null;
    const data = dadosIndividuais ? dadosIndividuais.data : null;
    const id = useImpreesao((state) => state.id);


    const baixarArquivo = async (stlUrl) => {
        if (!stlUrl) {
            Alert.alert("Erro", "URL de download não encontrada.");
            return;
        }


        setBaixando(true);
        setProgresso(0);


        // Extrai o nome do arquivo da URL ou define um padrão
        const nomeArquivo = stlUrl.split('/').pop() || 'modelo.stl';
        const destinoUri = `${FileSystem.documentDirectory}${nomeArquivo}`;


        try {
            // Baixa o arquivo usando a API estável do FileSystem
            const resultado = await FileSystem.downloadAsync(stlUrl, destinoUri);


            Alert.alert('Sucesso', `Arquivo STL baixado com sucesso!`);
            console.log('Salvo em:', resultado.uri);
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível baixar o arquivo STL.');
        } {
            setBaixando(false);
        }
    };


    useEffect(() => {
        const buscarDados = async (idAtual) => {
            setCarregando(true);
            await loadSingle(idAtual);
            setCarregando(false);
        };


        if (visivel && id) {
            buscarDados(id);
        }
    }, [visivel, id]);


    return (

    
        <Modal
            transparent
            visible={visivel}
            animationType="fade"
            statusBarTranslucent
            onRequestClose={fecharModal}
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
                        if (visivel) fecharModal();
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
                        height: height - 150,
                        borderRadius: 15,
                        padding: 20
                    }}
                >
                <CarroselFotos visivelFotos={ativoFotos} fotos={mandaFotos} fecharModalFotos={() => setAtivoFotos(false)} contadorInicial={contador}/>
                    
                    {dadosIndividuais && (
                        <View style={{ height: 45 }}>
                            <Text style={{ fontSize: 20, fontWeight: '500' }}>
                                {dadosIndividuais.projeto?.nome_impressao}
                            </Text>
                        </View>
                    )}


                    {dadosIndividuais && (
                        <FlatList
                            data={dadosIndividuais.fotos ?? []}
                            keyExtractor={(item, index) => String(item.id)}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                onPress={()=>{
                                    setAtivoFotos(true)
                                    setMandaFotos(dadosIndividuais.fotos )
                                    setContador(index)
                                  }}
                                >
                                    <Image
                                        source={{ uri: item.url }}
                                        style={{
                                            width: "100%",
                                            height: 220,
                                            marginBottom: 20,
                                            borderRadius: 30,
                                            elevation: 3
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            initialNumToRender={8}
                            maxToRenderPerBatch={8}
                            windowSize={5}
                            removeClippedSubviews={false}
                            ListHeaderComponent={
                                <Text style={{ fontSize: 20, fontWeight: '900', marginBottom: 10 }}>
                                    Fotos
                                </Text>
                            }
                            ListFooterComponent={
                                <View style={{ borderWidth: 0.5, borderRadius: 15, padding: 15 }}>
                                    <Text style={{ fontSize: 20, fontWeight: '900', marginBottom: 10 }}>
                                        Informações
                                    </Text>


                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                        {fotoPerfil && (
                                            <Image
                                                style={{ width: 50, height: 50, borderRadius: 100 }}
                                                source={{ uri: fotoPerfil }}
                                            />
                                        )}


                                        <View style={{ paddingRight: 100 }}>
                                            <Text style={{ fontSize: 16, lineHeight: 22 }}>
                                                <Text style={{ fontWeight: 'bold' }}>Autor: </Text>
                                                {dadosIndividuais.projeto?.usuario_nome}
                                            </Text>
                                            <Text style={{ fontSize: 16, lineHeight: 22, color: "#949494" }}>
                                                {dadosIndividuais.projeto?.usuario_curto || dadosIndividuais.projeto?.usuario_curso}
                                            </Text>
                                        </View>
                                    </View>


                                    <View style={{ marginTop: 20 }}>
                                        <Text><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Categoria:</Text> {dadosIndividuais.projeto?.categoria}</Text>
                                        <Text><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Material:</Text> {dadosIndividuais.projeto?.material}</Text>
                                        <Text><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Cor:</Text> {dadosIndividuais.projeto?.cor_filamento}</Text>
                                        <Text><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Gramas:</Text> {dadosIndividuais.projeto?.gramas}</Text>
                                        <Text><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Tempo:</Text> {dadosIndividuais.projeto?.tempo_impressao}</Text>
                                        <Text><Text style={{ fontWeight: 'bold', fontSize: 16 }}>Data:</Text> {data}</Text>
                                    </View>


                                    {dadosIndividuais.downloadStl ?
                                        (<TouchableOpacity
                                            style={{
                                                backgroundColor: baixando ? '#b0cbe8' : '#6797ce',
                                                marginTop: 20,
                                                marginBottom: 10,
                                                borderRadius: 15,
                                                paddingVertical: 10
                                            }}
                                            disabled={baixando}
                                            onPress={() => baixarArquivo(dadosIndividuais.downloadStl)}
                                        >
                                            <Text style={{ color: 'white', fontWeight: '900', textAlign: 'center', fontSize: 16 }}>
                                                {baixando ? "BAIXANDO..." : "BAIXAR STL"}
                                            </Text>
                                        </TouchableOpacity>)
                                        : <View style={{
                                            backgroundColor: "#beecfa",
                                            marginTop: 20,
                                            marginBottom: 10,
                                            borderRadius: 15,
                                            paddingVertical: 10
                                        }}>
                                            <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'flex-start', gap: 10,}}>
                                                <Image

                                                    source={information}
                                                    style={{ width: 22, height: 22 }}

                                                />
                                                <Text style={{ color: '#004459', textAlign: 'left', fontSize: 16, paddingRight:50 }} >Esse Projeto ainda não possui STL para download</Text>

                                            </View>

                                        </View>}

                                </View>
                            }
                        />
                    )}


                    <View style={{ height: 70, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity style={{ marginRight: 30, marginTop: 15 }} onPress={fecharModal}>
                            <Text style={{ color: "#59afff" }}>FECHAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
