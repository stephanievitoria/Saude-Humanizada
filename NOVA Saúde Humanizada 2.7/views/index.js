const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const { Client } = require('pg');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://ztosiscxgayzpicfkuwg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0b3Npc2N4Z2F5enBpY2ZrdXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY1Nzk0MTQsImV4cCI6MjAzMjE1NTQxNH0.JqtACiWfp3x0MSiLMbPM3K6SSRYrKgZNRQjlnWXy7Jo';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const db = new Client({
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    port: 5432,
    database: 'postgres',
    user: 'postgres.ztosiscxgayzpicfkuwg',
    password: 'Projeto_Mack123'
});

db.connect().catch(err => console.error('Erro ao conectar no banco de dados:', err.stack));

const app = express();
const port = 3000;

app.set('views', __dirname);
app.set('view engine', 'ejs');
app.use(express.static('Saude/views'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/cadastre', (req, res) => {
    res.render('cadastre');
});

app.get('/sobre', (req, res) => {
    res.render('sobre');
});

app.get('/medicamentos', async (req, res) => {
    const data1 = await getDataFromDoencas();
    const data2 = await getDataFromRemédios();    
    res.render('medicamentos', {data1,data2});
});

app.get('/dietas', async (req, res) => {
    const data5 = await getDataFromDietas();
    res.render('dietas',{data5});
});

app.get('/naturais', async (req, res) => {
    const data3 = await getDataFromDoençasNaturais();
    const data4 = await getDataFromRemédiosNaturais();
    res.render('naturais', {data3, data4});
});

async function getDataFromDoencas() {
    try {
        const { rows } = await db.query('SELECT * FROM doencas');
        return rows;
    } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
        return [];
    }
}

async function getDataFromRemédios() {
    try {
        const { rows } = await db.query('SELECT * FROM remédios');
        return rows;
    } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
        return [];
    }
}

async function getDataFromDoençasNaturais() {
    try {
        const { rows } = await db.query('SELECT * FROM doencasnaturais');
        return rows;
    } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
        return [];
    }
}

async function getDataFromRemédiosNaturais() {
    try {
        const { rows } = await db.query('SELECT * FROM remediosnaturais');
        return rows;
    } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
        return [];
    }
}

async function getDataFromDietas() {
    try {
        const { rows } = await db.query('SELECT * FROM dietas');
        return rows;
    } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
        return [];
    }
}

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});