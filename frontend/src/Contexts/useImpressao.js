import { create } from "zustand"


const useImpreesao = create((set, get) => ({
  dados: [],
  dadosIndividuais: null,
  dadosPorAutor: null,
  alunos: null,
  id: null,
  nome: null,
  carregaPorAutor: false,




  load: async () => {


    try {
      const res = await fetch('http://192.168.1.14:3002/catalogo');
      const json = await res.json();


      set({ dados: (json.projetos || []) });


    } catch (e) {
      console.log(e);
    }
  },




  loadSingle: async (id) => {


    try {
      const res = await fetch(`http://192.168.1.14:3002/catalogo/${id}`);
      const json = await res.json();
      console.log(json)


      set({ dadosIndividuais: (json) });


    } catch (e) {
      console.log(e);
    }
  },


  filtraAutor: async (nome) => {


    try {
      const res = await fetch(`http://192.168.1.14:3002/teste/${nome}`);
      const json = await res.json();


      set({ dadosPorAutor: (json.dadosFiltrados) });


    } catch (e) {
      console.log(e);
    }
  },


   pegaAlunos: async () => {


    try {
      const res = await fetch('http://192.168.1.14:3002/alunos');
      const json = await res.json();


      set({ alunos: (json.nomesAlunos || []) });


    } catch (e) {
      console.log(e);
    }
  },




  pegaId: async (id) => {
    set({ id: id })
  },

  pegaNome: async (nome) => {
    set({ nome: nome })
  },

  mudaCarregaPorAutor: async () => {
    set({ carregaPorAutor: true })
  },

  mudaCarregaPorAutorFalse: async () => {
    set({ carregaPorAutor: false })
  },


}
)
);


export default useImpreesao
