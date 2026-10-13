const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Inicializa o banco de dados
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error('Erro ao conectar ao banco:', err.message);
    else console.log('Conectado ao banco de dados SQLite.');
});

// Cria as tabelas necessárias do banco
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        cpf TEXT UNIQUE,
        email TEXT,
        password TEXT,
        phone TEXT DEFAULT '',
        address TEXT DEFAULT '',
        city TEXT DEFAULT '',
        state TEXT DEFAULT '',
        country TEXT DEFAULT '',
        account_balance REAL DEFAULT 2500.00
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        description TEXT,
        amount REAL,
        type TEXT,
        date TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
});

// ROTAS PARA NAVEGAR ENTRE AS PÁGINAS SEPARADAS
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});
app.get('/nossos-servicos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'servicos.html'));
});
app.get('/todos-servicos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'todos-servicos.html'));
});
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Rota de Cadastro no Banco de Dados
app.post('/api/register', (req, res) => {
    const { name, cpf, email, password, phone, address, city, state, country } = req.body;
    const query = `INSERT INTO users (name, cpf, email, password, phone, address, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [name, cpf, email, password, phone || '', address || '', city || '', state || '', country || ''], function(err) {
        if (err) return res.status(400).json({ success: false, message: 'CPF já cadastrado ou dados inválidos.' });
        
        const userId = this.lastID;
        const transQuery = `INSERT INTO transactions (user_id, description, amount, type, date) VALUES (?, ?, ?, ?, ?)`;
        db.run(transQuery, [userId, 'Depósito Inicial', 2500.00, 'income', '2026-03-10']);
        db.run(transQuery, [userId, 'Compra no Crédito - Mercado', -150.50, 'expense', '2026-03-11']);
        db.run(transQuery, [userId, 'Transferência PIX Recebida', 120.00, 'income', '2026-03-11']);

        res.json({ success: true, message: 'Conta criada com sucesso!' });
    });
});

// Rota de Login no Banco de Dados
app.post('/api/login', (req, res) => {
    const { cpf, password } = req.body;
    const query = `SELECT id, name FROM users WHERE cpf = ? AND password = ?`;

    db.get(query, [cpf, password], (err, user) => {
        if (err || !user) return res.status(401).json({ success: false, message: 'CPF ou senha incorretos.' });
        res.json({ success: true, user });
    });
});

// Rota para buscar dados do Dashboard
app.get('/api/dashboard/:userId', (req, res) => {
    const userId = req.params.userId;
    db.get(`SELECT name, email, phone, address, city, state, country, account_balance FROM users WHERE id = ?`, [userId], (err, user) => {
        if (err || !user) return res.status(404).json({ message: 'Usuário não encontrado.' });
        db.all(`SELECT description, amount, type, date FROM transactions WHERE user_id = ? ORDER BY id DESC`, [userId], (err, transactions) => {
            res.json({ 
                name: user.name, 
                email: user.email, 
                phone: user.phone,
                address: user.address,
                city: user.city,
                state: user.state,
                country: user.country,
                balance: user.account_balance, 
                transactions: transactions 
            });
        });
    });
});

// Rota para alterar dados do perfil
app.post('/api/update-profile', (req, res) => {
    const { userId, name, email, phone, address, city, state, country, password } = req.body;
    
    if (password && password.trim() !== "") {
        const query = `UPDATE users SET name = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, country = ?, password = ? WHERE id = ?`;
        db.run(query, [name, email, phone, address, city, state, country, password, userId], function(err) {
            if (err) return res.json({ success: false, message: 'Erro ao atualizar dados.' });
            res.json({ success: true, message: 'Todos os seus dados e senha foram alterados!' });
        });
    } else {
        const query = `UPDATE users SET name = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, country = ? WHERE id = ?`;
        db.run(query, [name, email, phone, address, city, state, country, userId], function(err) {
            if (err) return res.json({ success: false, message: 'Erro ao atualizar dados.' });
            res.json({ success: true, message: 'Dados cadastrais alterados com sucesso!' });
        });
    }
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));