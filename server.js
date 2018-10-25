const express=require('express');
const server=express();
const db=require('./db');
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.set("view engine","hbs");
//server.set('views',__dirname+ "/views");

server.get('/', function(req,res){
    db.getAllpersons()
    .then((persons)=>{
        res.render('persons',{persons})
    })
    .catch((err)=>{
        res.send(err);
    })
})

server.get('/add',(req,res)=>{
    res.render('persons_add')
})

server.post('/add',(req,res)=>{
   db.addNewPerson(req.body.name, req.body.age, req.body.city)
    .then(()=>{
        res.redirect('/')
    })
    .catch((err)=>{
        res.send(err)
    })
   
})
server.listen(4445);