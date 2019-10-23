'use strict';
const Joi= require('@hapi/joi');
const Hapi = require('@hapi/hapi');
const server= new Hapi.Server({
    host: 'localhost',
    port: 3101,
});

server.route([
    {
        method: 'GET',
        path: '/hello',
        handler: (request,h) => {
            return {msg:'I am Rooot Hello'};
        },
    },
    {
        method: 'POST',
        path: '/persegi',
        config:{
            validate:{
                payload:{
                    panjang: Joi.number().min(1).required(),
                    lebar: Joi.number().min(1).required()
                }
            }
        },
        handler: (request,h) => {
            console.log(request.payload); //cek parameter inputan form
            let panjangRequest = request.payload.panjang; // konversi string ke numbur
            let lebarRequest= request.payload.lebar;
            let hasil = parseInt(panjangRequest)*parseInt(lebarRequest) // bikin variabel penampung nilai luas
            const data= {data:'persegi', ...request.payload,hasilPerhitungan:hasil} // bikin respon berbentuk json
            return h.response(data).code(200) // return out put berupa json
        },
    },
    {
        method: 'POST',
        path: '/ganjilGenap',
        config:{
            validate:{
                payload:{
                    angka: Joi.number().min(1).required()
                }
            }
        },
        handler: (request, h) => {
            console.log(request.payload); //cek parameter inputan form
            let angkaRequest = request.payload.angka;
            let hasil=0;
            if(parseInt(angkaRequest) % 2 === 1){
                hasil= 'Bilangan Ganjil';
            }else{
                hasil = 'Bilangan Genap';
            }
            const data= {data:'ANGKA', ...request.payload, hasilPerhitungan:hasil} // bikin respon berbentuk json
            return h.response(data).code(200) // return out put berupa json
        },
    },
    {
        method: 'POST',
        path: '/abc1',
   
        handler: (request,h) => {
            console.log(request.payload); //cek parameter inputan form
 
            const data= {data:'persegi'} // bikin respon berbentuk json
            return h.response(data).code(200) // return out put berupa json
        },
    },
]);

const main = async() => {
    await server.register(require('./src/routes/users'));
    await server.start()
    
};
main().then(() =>{
    console.log('Server running at: ',server.info.uri);
}).catch(err => {
    console.log(err)
    process.exit(1)
})