import { create } from "zustand"


const useImpreesao = create((set, get) => ({
  dados: [],
  dadosIndividuais: null,
  id: null,




  load: async () => {


    try {
      const res = await fetch('http://10.0.2.2:3001/catalogo');
      const json = await res.json();


      set({ dados: (json.projetos || []) });


    } catch (e) {
      console.log(e);
    }
  },




  loadSingle: async (id) => {


    try {
      const res = await fetch(`http://10.0.2.2:3001/catalogo/${id}`);
      const json = await res.json();
      console.log(json)


      set({ dadosIndividuais: (json) });


    } catch (e) {
      console.log(e);
    }
  },


  pegaId: async (id) => {
    set({ id: id })
  },


}
)
);


export default useImpreesao
