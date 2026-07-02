import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, InteractionManager, TextInput } from 'react-native';


import { Image, prefetch } from 'expo-image';


import logo from "../../../assets/logo.jpeg"
import olho from "../../../assets/visible.png"




import useImpreesao from '../../Contexts/useImpressao';

import estilos from './estilos';


import Detalhes from './Detalhes';


export default function HomeScreen() {
    const [ativo, setAtivo] = useState(false)
 


  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState("");


  const dados = useImpreesao((state) => state.dados)


  const load = useImpreesao((state) => state.load)


    const pegaId = useImpreesao((state) => state.pegaId)


  useEffect(() => {
    setLoading(true)
    load();
    setLoading(false)
  }, []);








  const renderItem = useCallback(({ item }) => (
    <View style={{ backgroundColor: 'white', borderRadius: 15, marginBottom: 25, elevation: 2 }}>




      {item.thumbnailUrl && (


        <Image
          source={item.thumbnailUrl}
          style={{ width: '100%', height: 230, borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={300}


        />
      )}




      <View style={{ paddingHorizontal: 15, paddingBottom: 20 }}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginVertical: 18 }}>
          <Text style={{ paddingVertical: 3, paddingHorizontal: 5, textAlign: 'center', borderWidth: 1, borderColor: '#e7e7e796', borderRadius: 15, backgroundColor: '#e7e7e796' }}>{item.categoria}</Text>
          <Text style={{ paddingVertical: 3, paddingHorizontal: 8, textAlign: 'center', borderWidth: 1, borderColor: '#c7c5c5', borderRadius: 15, backgroundColor: '#ffffff' }}>{item.material}</Text>
        </View>






        <Text style={{ fontSize: 20, fontWeight: '900' }}>{item.nome_impressao}</Text>


        <View style={{ marginVertical: 5, display: 'flex', flexDirection: 'row', gap: 15 }} >
          <Image source={{ uri: item.fotoPerfil }}
            style={{ width: 40, height: 40, borderRadius: 100 }}
          />
          <View style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Text style={{ color: "#8b8b8b", fontSize: 15 }}>Autor: {item.usuario_nome}</Text>
            <Text style={{ fontSize: 12, color: "#8b8b8b" }}>{item.usuario_curso}</Text>


          </View>










        </View>
        <Text style={{ fontSize: 14, color: "#8b8b8b" }}>Data: {item.data}</Text>


      </View>


      <TouchableOpacity style={{ width: '90%', borderRadius: 12, paddingVertical: 7, marginVertical: 20, marginHorizontal: 'auto', backgroundColor: '#669cda' }}
      onPress={()=>{
        setAtivo(true)
        pegaId(item.id)
      }}
     
      >
        <View style={{ justifyContent: 'center', flexDirection: 'row', gap: 8 }}>
          <Image
            source={olho}
            style={{
              width: 20,
              height: 20
            }}
          />


          <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: '900' }}>ABRIR PROJETO</Text>
        </View>




      </TouchableOpacity>










    </View>
  ), []);




  const header = useCallback(() => (
    <View style={{ marginTop: 30, }}>




      <View style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
        <Image
          source={logo}
          style={{ width: 50, height: 50, borderRadius: 100, marginVertical: 'auto' }}
        />


        <View style={{ display: 'flex', flexWrap: 'wrap', boxSizing: 'border-box', marginBottom: 15 }}>
          <Text style={{ color: "#4b8fe7", fontWeight: "900", fontSize: 12 }}>APP 3D RENI</Text>
          <Text style={{ fontSize: 50, textAlign: 'left', fontWeight: 'bold' }}>
            Catálogo
          </Text>
          <Text style={{ fontSize: 50, textAlign: 'left', fontWeight: 'bold', lineHeight: 45 }}>
            Produção
          </Text>




        </View>
      </View>






      <Text
        style={{ color: "#464646", fontSize: 17 }}
      >Explore projetos, fotos e arquivos STL disponíveis para download.</Text>


      <TouchableOpacity style={{ width: '100%', borderWidth: 1, borderColor: "#6f82ec", borderRadius: 12, paddingVertical: 7, marginVertical: 20, marginHorizontal: 'auto' }}>
        <Text style={{ textAlign: 'center', color: '#6f82ec' }}>ÁREA INTERNA</Text>
      </TouchableOpacity>




      <View style={{ backgroundColor: 'white', width: '100%', marginTop: 10, marginBottom: 25, borderRadius: 15 }}>
        <TextInput
          placeholder='Busca por nome'
          value={busca}
          onChangeText={setBusca}
          style={{
            borderWidth: 0.5, borderColor: "#b8b8b8", borderRadius: 15, margin: 13, paddingVertical: 17, paddingHorizontal: 10, color: "#d1d0d0"
          }}
        />


        <TouchableOpacity
          placeholder='Busca por nome'
          value={busca}
          onChangeText={setBusca}
          style={{
            borderWidth: 0.5, borderColor: "#b8b8b8", borderRadius: 15, margin: 13, paddingVertical: 17, paddingHorizontal: 10,
          }}


          onPress={() => {


          }}
        >
          <Text style={{ color: "#727272" }}>Categoria</Text>
        </TouchableOpacity>


      </View>


    </View>


  ), [])


  return <>
    <Detalhes visivel={ativo} fecharModal={() => setAtivo(false)} />


   
   
    <View style={estilos.fundo}>
     






      {loading ? (
        <View>
          <ActivityIndicator size="large" />
          <Text>Carregando</Text>
        </View>

        
      ) : (
        <FlatList
          data={dados}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          initialNumToRender={3}
          maxToRenderPerBatch={2}
          windowSize={3}
          removeClippedSubviews
          ListHeaderComponent={header}
        />
      )}
    </View>
  </>;
}
