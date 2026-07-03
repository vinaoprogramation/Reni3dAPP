require('dotenv').config();


const express = require('express');
const axios = require('axios');
const cors = require('cors');
const NodeCache = require('node-cache');
const sharp = require("sharp");




const app = express();
app.use(cors());
app.use(express.json());


const cache = new NodeCache({ stdTTL: 300 });


// =========================
// LISTA
// =========================
app.get('/catalogo', async (req, res) => {
  try {
    const page = req.query.page || 1;


    const api = await axios.get(
      `https://api-ip3d.mbinfoseg.com.br/api/catalogo?page=${page}`
    );


    const projetos = api.data.projetos;


    const detalhes = await Promise.all(
      projetos.map(p =>
        axios.get(`https://api-ip3d.mbinfoseg.com.br/api/catalogo/${p.id}`)
      )
    );




    const resultado = projetos.map((p, i) => {
      const fotos = detalhes[i].data.fotos || [];
      const perfis = detalhes[i].data.projeto || [];


      const isoString = detalhes[i].data.projeto.created_at;
      const data = new Date(isoString);


      const formatoBrasil = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: 'America/Sao_Paulo'
      });


      const dataFormatada = formatoBrasil.format(data);


      return {
        ...p,
        thumbnailUrl: fotos[0]
          ? `https://api-ip3d.mbinfoseg.com.br/api/catalogo/fotos/${fotos[0].id}/visualizar`
          : null,
        fotoPerfil: perfis.usuario_id
          ? `https://api-ip3d.mbinfoseg.com.br/api/catalogo/usuarios/${perfis.usuario_id}/avatar`
          : null,
        data: dataFormatada


      };
    });






    return res.json({ projetos: resultado });


  } catch (e) {
    return res.status(500).json({ error: "erro catálogo" });
  }
});


// =========================
// SITE-CONFIG
// =========================
app.get("/thumbnail/:id", async (req, res) => {
  try {
    const imagem = await axios.get(
      `https://api-ip3d.mbinfoseg.com.br/api/catalogo/fotos/${req.params.id}/visualizar`,
      {
        responseType: "arraybuffer"
      }
    );

    const buffer = await sharp(imagem.data)
      .rotate()
      .resize({
        width: 1000,
        withoutEnlargement: true,
        fit: "inside"
      })
      .jpeg({
        quality: 95,
        mozjpeg: true,
        chromaSubsampling: "4:4:4"
      })
      .toBuffer();

    res.set("Content-Type", "image/jpeg");
    res.send(buffer);

  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

app.get('/site-config', async (req, res) => {
  try {
    const page = req.query.page || 1;


    const api = await axios.get(
      `https://api-ip3d.mbinfoseg.com.br/api/site-config?page=${page}`
    )


    const dados = api.data


    return res.json({ dados });


  } catch (e) {
    return res.status(500).json({ error: "erro site-config" });
  }
});




// =========================
// DETALHE
// =========================
app.get('/catalogo/:id', async (req, res) => {
  try {
    const { id } = req.params;


    const cacheKey = `item_${id}`;
    if (cache.has(cacheKey)) {
      return res.json(cache.get(cacheKey));
    }


    const api = await axios.get(
      `https://api-ip3d.mbinfoseg.com.br/api/catalogo/${id}`
    );


    const data = api.data;


    const avatar = data.projeto.usuario_id
    const verAvatar = avatar ? `https://api-ip3d.mbinfoseg.com.br/api/catalogo/usuarios/${avatar}/avatar`
      : null


    const fotos = (data.fotos || []).map(f => ({
      ...f,
      url: `http://192.168.1.14:3002/thumbnail/${f.id}`


    }));


    const stl = data.projeto?.stl_id


    const downloadStl = stl
      ? `https://api-ip3d.mbinfoseg.com.br/api/catalogo/stl/${stl}/download`
      : null;




    const isoString = data.projeto.created_at;
    let dataFormatada = null;


    if (isoString) {
      const dataIndividual = new Date(isoString);
      if (!isNaN(dataIndividual)) {
        const formatoBrasil = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeZone: 'America/Sao_Paulo' });
        dataFormatada = formatoBrasil.format(dataIndividual);
      }
    }


    const response = {
      projeto: data.projeto,
      fotos,
      downloadStl,
      avatar: verAvatar,
      data: dataFormatada
    };




    cache.set(cacheKey, response);


    return res.json(response);


  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "erro detalhe" });
  }
});




app.get('/teste/:nome', async (req, res) => {
  try {
    const { nome } = req.params;

    // Requisição à API
    const api = await axios.get(`https://api-ip3d.mbinfoseg.com.br/api/catalogo`);
    const data = api.data;


    const projetos = data.projetos;

    const impressoes = projetos.filter(projeto => projeto.usuario_nome === nome);

    const detalhes = await Promise.all(
      impressoes.map(p =>
        axios.get(`https://api-ip3d.mbinfoseg.com.br/api/catalogo/${p.id}`)
      )
    );


    const resultado = impressoes.map((p, i) => {
      const fotos = detalhes[i].data.fotos || [];
      const perfis = detalhes[i].data.projeto || [];


      const isoString = detalhes[i].data.projeto.created_at;
      const data = new Date(isoString);


      const formatoBrasil = new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
        timeZone: 'America/Sao_Paulo'
      });


      const dataFormatada = formatoBrasil.format(data);


      return {
        ...p,
        thumbnailUrl: fotos[0]
          ? `https://api-ip3d.mbinfoseg.com.br/api/catalogo/fotos/${fotos[0].id}/visualizar`
          : null,
        fotoPerfil: perfis.usuario_id
          ? `https://api-ip3d.mbinfoseg.com.br/api/catalogo/usuarios/${perfis.usuario_id}/avatar`
          : null,
        data: dataFormatada


      };
    });


    const response = { dadosFiltrados: resultado };


    return res.json(response);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});




app.get('/alunos', async (req, res) => {
  try {

    const api = await axios.get(`https://api-ip3d.mbinfoseg.com.br/api/catalogo/filtros`);
    const data = api.data;

    const alunos = data.alunos;

    const nomesAlunos = alunos.map(aluno => aluno.nome);


    const response = { nomesAlunos };


    return (res.json(response));

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});






app.listen(3002, () => {
  console.log("Backend rodando na porta 3002");
});


