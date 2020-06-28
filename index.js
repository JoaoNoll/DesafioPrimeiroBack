const express = require('express');

const server = express();

server.use(express.json());

const users = [];

function verifyData(req,res,next){

    const{email,name,age,phone} = req.body;

    if(!email){
        return res.json({
            error:'E-mail é obrigatório!'
        });
    } else if(!name){
        return res.json({
            error: 'Nome é obrigatório!'
        });
    }else if(!age){
        return res.json({
            error: 'Idade é obrigatório'
        });
    }

    next();

}




server.get('/',(req,res)=>{
    return res.json({
        result:'Bem-vindo a página de registro!'
    });
});



server.post('/users',(req,res)=>{
    const {email,name,age,phone} = req.body;
    const user = {
        email, 
        name, 
        age, 
        phone,
    } 

    const {id} = req.params;

    users.push(user);

    return res.json({user});
});

    server.get('/users',(req,res)=>{
        
        return res.json({users});
});

    
    server.put('/users/:id',verifyData,(req,res)=>{
        const {email,name,age,phone} = req.body;
        const {id} = req.params;

        const user = {
            email, 
            name, 
            age, 
            phone,
        }

        users[id] = user;

        return res.json({
            result:'Dados atualizados com sucesso!',
            user:user
        })
    });

    server.get('/users/:id', (req,res)=> {
        const {id} = req.params;
    
        return res.json({
            result:'Usuário encontrado com sucesso!',
            user: users[id]
        });
    });


    server.listen(3000);