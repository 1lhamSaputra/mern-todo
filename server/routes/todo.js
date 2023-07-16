const router = require('express').Router();
const TodoItem = require('../models/todoItem');

// Rute Get untuk mendapatkan semua item Todo
router.route('/list').get((req, res)=>{
    TodoItem.find()
    .then((items)=> res.json(items))
    .catch((err)=>res.status(400).json(`Error ${err}`))
})

// Rute Post untuk menambahkan item To-Do baru
router.route('/add').post((req, res)=>{
    const description = req.body.description;
    const newItem = new TodoItem({description});

    newItem
    .save()
    .then(()=>res.json('Item To-Do berhasil ditambahkan'))
    .catch((err)=>res.status(400).json(`Error ${err}`))
});

// Rute Get untuk mendapatkan detail item To-Do berdasarkan ID
router.route('/:id').get((req,res)=>{
    TodoItem.findById(req.params.id)
    .then((item)=>res.json(item))
    .catch((err)=>res.status(400).json(`Error ${err}`))
});

// Rute Delete untuk menghapus item To-Do berdasarkan ID
router.route('/:id').delete((req, res)=>{
    TodoItem.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Item To-Do berhasil dihapus'))
    .catch((err)=>res.status(400).json(`Error ${err}`))
});

// Rute Post untuk memperbarui item To-Do berdasarkan ID
router.route('/update/:id').post((req, res)=>{
    TodoItem.findById(req.params.id)
    .then((item)=>{
        item.description = req.body.description;
        item.completed = req.body.completed;

        item
        .save()
        .then(()=> res.json('Item To-Do berhasil diperbarui'))
        .catch((err)=>res.status(400).json(`Error ${err}`))
    })
    .catch((err)=>res.status(400).json(`Error ${err}`))
})

module.exports = router;
