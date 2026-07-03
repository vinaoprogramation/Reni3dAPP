import React, { useEffect } from "react";

import { Text, View, TouchableOpacity, Modal, FlatList } from "react-native";

import useImpreesao from "../../../Contexts/useImpressao";

export default function SelecionaCategoria({ categoriaVisivel }) {


  const filtraAutor = useImpreesao((state) => state.filtraAutor)

  const dadosPorAutor = useImpreesao((state) => state.dadosPorAutor)

  const alunos = useImpreesao((state) => state.alunos)

  const pegaAlunos = useImpreesao((state) => state.pegaAlunos)

  const pegaNome = useImpreesao((state) => state.pegaNome)


  const mudaCarregaPorAutor = useImpreesao((state) => state.mudaCarregaPorAutor)

    const mudaCarregaPorAutorFalse = useImpreesao((state) => state.mudaCarregaPorAutorFalse)



  useEffect(() => {
    pegaAlunos()
  }, [])



  return (

    <View>



      {categoriaVisivel ? (



        <View style={{ backgroundColor: '#ffffff', width: '85%', marginHorizontal: 'auto', borderRadius: 15, paddingVertical: 15, marginTop: 0 }}>

          <TouchableOpacity style={{ paddingVertical: 15 }}
            onPress={() => {
              mudaCarregaPorAutorFalse()

            }}
          >
            <Text style={{ textAlign: 'left', fontSize: 16, marginLeft: 15 }}>Todos</Text>
          </TouchableOpacity>



          <FlatList
            data={alunos}
            keyExtractor={(item) => (item)}
            initialNumToRender={3}
            maxToRenderPerBatch={2}
            windowSize={3}
            removeClippedSubviews
            renderItem={({ item }) => {
              return (


                <TouchableOpacity style={{ paddingVertical: 15 }}
                  onPress={() => {
                    pegaNome(item)
                    mudaCarregaPorAutor()

                  }}
                >
                  <Text style={{ textAlign: 'left', fontSize: 16, marginLeft: 15 }}>{item}</Text>
                </TouchableOpacity>
              )



            }}

          />

        </View>

      ) : (null)}

    </View>
  )
};
