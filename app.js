import express from 'express'
import cors from 'cors'
import sql from './database.js';
import { CriarHash } from './util.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.post('/criarconta', async (req, res) => {
    try {
      const { email, senha } = req.body;

      const hash = await CriarHash(senha, 10);

      // Verifica se o email já existe
      const tentativa = await sql`SELECT usuario_id FROM usuarios WHERE email = ${email}`;
      if (tentativa.length > 0) {
        return res.status(409).json('Email já cadastrado');
      }
      
      // Insere o novo usuário
      await sql`
        INSERT INTO usuarios (email, senha)
        VALUES (${email}, ${hash})
      `;
  
      return res.status(201).json('Cadastrado com sucesso!');
    }
    
    catch (error) {
      console.error('Erro inesperado:', error);
      return res.status(500).json('Ocorreu um erro inesperado');
    }
  });

app.listen(3000, () =>{
    console.log('API está no ar!')
})
