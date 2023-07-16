// Import dependensi
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// import model dan rute
const TodoItem = require('./models/todoItem');
const todoRouter = require('./routes/todo');

// Inisialisasi Express.js
const app = express();
const port = process.env.PORT || 3040;

// Gunakan middleware cors
app.use(cors());
app.use(express.json());

// Setup koneksi ke database MongoDB
const uri = 'mongodb://localhost:27017/todo-list-db';
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('Koneksi ke database MongoDB berhasil');
});

// definisikan rute API
app.use('/todo', todoRouter);

// jalankan server
app.listen(port, ()=>{
    console.log(`server berjalan di http://localhost:${port}`);
})
