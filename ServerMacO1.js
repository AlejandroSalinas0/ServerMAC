const fs = require('fs');
const express = require('express');
// create new router
const router = express.Router();
const net = require('net');
const { Socket } = require('dgram');
const port = 8077
//const host = '10.10.20.77'; //lasec_invitados
const host = '10.86.10.220';  //SF-Hardware
var contador = 0;
var dataex = fs.readFileSync('Database.json')
var database = JSON.parse(dataex)
//var datoInput='';
//const readline = require('readline-sync');

//let datoInput = readline.question("Ingrese comando TCP:     \r\n");

//console.log("Hi " + name + ", nice to meet you.");


const server = net.createServer();
server.listen(port, host, () => {
    //console.log('TCP Server is running on port ' + port + '.');
});
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
let fecha=(year + "-" + month + "-" + date + " " + hours + ":"   + minutes + ":" + seconds);
console.log(fecha);

// var n = datoInput.includes("MAC:");
//         if(n == true){
//             console.log('MAC encontrada')
//             //sock.write('Starting_Config');
//             const str=datoInput.toString();
//             //const mac=str.split('');
//             mac=str.slice(6, 23)
//             //console.log(str.slice(4, 16));
//             console.log('MAC RECONOCIDA: '+mac)
//             let found = database.find(function (item) {
//                 return item.MAC === mac;
//             });
//             console.log(JSON.stringify(found));
//             if (found==null){
//                 console.log('proceso cancelado porque no se encontro MAC en base de datos pero agregando MAC a base de datos unicamente');
//                 console.log('Nueva entrada');
//                 let itemIds = database.map(item => item.ID);
//                 //console.log('IDS'+itemIds)
//                 let itemIps = database.map(item => item.IP);
                
//                 let orderNums = database.map(item => item.Operacion);
//                 // create new id (basically +1 of last item object)
//                 let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
//                 let newIp = itemIps.length > 0 ? Math.max.apply(Math, itemIps) + 1 : 160;// create new order number (basically +1 of last item object)
//                 let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;
//                 console.log('IpS'+newIp)// get orderNums from data array
//                 // create an object of new Item
//                 let newItem = {
//                     ID: newId, //generado arriba 
//                     MAC: mac, // generated in above step
//                     SN:'',
//                     IP: newIp, // value of `title` get from POST req
//                     Log: 'Este dispositivo fue registrado con la mac pero la programacion no se llevo a cabo, porque no tenia SN',
//                     Operacion: newOrderNum, // generated in above step
//                     //Completed: true, // default value is set to false
//                     DispositivoRegistrado: new Date() // new date object    
//                 };
//                 console.log(newItem);
//                 console.log('Empezando configuracion inicial')
//                 //EMPIEZA LA CONFIGURACION


//                 // push new item object to data array of items
//                 database.push(newItem);
//                 //saveUserData(database);
//                 console.log(database);
//                 const stringifyData = JSON.stringify(database)
//                 fs.writeFileSync('Database.json', stringifyData)
//             }
//             else {
//                 console.log('found');
//                 if (found.SN==null){
//                 console.log('Mac en la base de datos pero no tiene SN asignado, MAC: ' +found.MAC);
//                 }
//                 else {
//                     console.log('MAC y SN encontrados, empezando programacion inicial, SN: ' +found.SN);
//                 }

//             }
//             //console.log('found: '+json.found)
            
//         }

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

    //sockets.push(sock);

    sock.on('data', function(data) {
        //sock.write('OK');
        var n = data.includes("MAC:");
        if(n == true){
            //console.log('MAC encontrada')
            //sock.write('Starting_Config');
            const str=data.toString();
            //const mac=str.split('');
            mac=str.slice(6, 23)
            //console.log(str.slice(4, 16));
            console.log('MAC RECONOCIDA: '+mac)
            let found = database.find(function (item) {
                return item.MAC === mac;
            });
            sock.write('OK');
            //console.log(JSON.stringify(found));
            //console.log('Found: '+found);
            if (found==null){
                    //console.log('MAC pero sin SN');    
                    console.log('Mac nueva, registrando nueva entrada MAC, entre valores de SN manualmente o con ayuda de la interfaz');
                    sock.write("FLASH");
                    let itemIds = database.map(item => item.ID);
                    let orderNums = database.map(item => item.Operacion);
                    // create new id (basically +1 of last item object)
                    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
                    let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;
                    //console.log('Poblando la configuracion con valores antiguos en el registro')// get orderNums from data array
                    // create an object of new Item
                    let date_ob = new Date();
                    let date = ("0" + date_ob.getDate()).slice(-2);
                    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                    let year = date_ob.getFullYear();
                    let hours = date_ob.getHours();
                    let minutes = date_ob.getMinutes();
                    let seconds = date_ob.getSeconds();
                    let fecha=(year + "-" + month + "-" + date + " " + hours + ":"   + minutes + ":" + seconds);
                    let newItem = {
                        ID: newId, //generado arriba 
                        MAC: mac, // generated in above step
                        SN: null,
                        IP: 0, // value of `title` get from POST req
                        Operacion: newOrderNum,
                        Log: 'Fresh Start',
                        Completed: true, // default value is set to false
                        Mina: 'Hardware',
                        DispositivoConfigurado: fecha
                    };
                    console.log('Datos insertados: '+newItem);
                    database.push(newItem);
                    //saveUserData(database);
                    console.log('Database: '+database);
                    const stringifyData = JSON.stringify(database);
                    fs.writeFileSync('Database.json', stringifyData);
            }
            else {
                if (found.SN==null){
                //console.log('MAC pero sin SN');    
                    console.log('Mac en la base de datos pero no tiene SN asignado, esperando asignacion de SN manual, MAC: ' +found.MAC);
                }
                else {
                    //console.log('SN null?'+found.SN)
                    if (found.Log=='Fresh Start'){
                    console.log('MAC y SN encontrados, empezando programacion inicial, SN found: ' +found.SN);
                    //let itemIds = database.map(item => item.ID);
                    let itemIps = database.map(item => item.IP);
                    let orderNums = database.map(item => item.Operacion);
                    // create new id (basically +1 of last item object)
                    //let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
                    let newIp = itemIps.length > 1 ? Math.max.apply(Math, itemIps) + 1 : 171;// create new order number (basically +1 of last item object)
                    let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;
                    console.log('Generando valores nuevos')// get orderNums from data array
                    // create an object of new Item
                    //console.log('macos'+found.MAC);
                    let updated = {
                        ID: found.ID, //generado arriba 
                        MAC: found.MAC, // generated in above step
                        SN: found.SN,
                        IP: 0, // value of `title` get from POST req
                        Operacion: newOrderNum,
                        Log: 'Error durante la programacion',
                        Completed: false, // default value is set to false
                        Mina: 'Hardware',
                        Fecha_De_Fallo: fecha   
                    };
                    ///INICIA PROGRAMACION INICIAL
                    sock.write('Starting_Config');
                    console.log('Starting_Config');
                    if(data.includes("OK_A")){
                        sock.write('-SSF-HARDWARE');
                        console.log('-SSF-HARDWARE');
                        }
                    else if(data.includes("OK_S")){
                        sock.write('KLasec123.');
                        console.log('KLasec123.');
                        }
                    else if(data.includes("OK_K")){
                        sock.write('G10.86.10.254');
                        console.log('G10.86.10.254');
                        }
                    else if(data.includes("OK_G")){
                        sock.write('-I10.86.10.1');
                        console.log('-I10.86.10.1');
                        }
                    else if(data.includes("OK_I")){
                        sock.write('M255.255.255.0');
                        console.log('M255.255.255.0');
                        }
                    else if(data.includes("OK_M")){
                        sock.write('-C10.86.10.170');
                        console.log('-C10.86.10.1');
                        }
                    else if (data.includes("OK_C")){
                        sock.write('Ready Network');
                        console.log('Ready Network');}//
                    console.log(newIp);
                    updated = {
                        ID: found.ID, //generado arriba 
                        MAC: found.MAC, // generated in above step
                        SN: found.SN,
                        IP: newIp, // value of `title` get from POST req
                        Log: 'Programacion inicial exitosa',
                        Operacion: newOrderNum, // generated in above step
                        Completed: true, // default value is set to false
                        Mina: "Hardware",
                        DispositivoConfigurado: new Date() // new date object    
                    //};
                    }
                    let targetIndex = database.indexOf(found);
                    // replace object from data list with `updated` object
                    database.splice(targetIndex, 1, updated);
                //saveUserData(database);
                    console.log(database);
                    const stringifyData = JSON.stringify(database)
                    fs.writeFileSync('Database.json', stringifyData)
                    //console.log('Operacion 1 terminada con exito')
                    }    
                    else {
                    console.log('Reprogramacion: Valores de esta MAC ya registrada anteriormente, programando de nuevo con valores en el registro')
                    console.log(JSON.stringify(found));
                    updated = {
                        ID: found.ID, //generado arriba 
                        MAC: found.MAC, // generated in above step
                        SN: found.SN,
                        IP: found.IP, // value of `title` get from POST req
                        Log: 'Reprogramado',
                        Operacion: found.Operacion, // generated in above step
                        Completed: true, // default value is set to false
                        Mina: found.Mina,
                        DispositivoActualizado: fecha // new date object    
                    }
                    let targetIndex = database.indexOf(found);
                    // replace object from data list with `updated` object
                    database.splice(targetIndex, 1, updated);
                    const stringifyData = JSON.stringify(database)
                    fs.writeFileSync('Database.json', stringifyData)
                    }
                }
            }
            //console.log('found: '+json.found)
            
        }
    }); 

    sock.on('error', function(err) {
        console.log(`Error: ${err}`);
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        // let index = sockets.findIndex(function(o) {
        //     return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        // })
        // if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort + '\r\n');
    });
// const saveUserData = (database) => {
// const stringifyData = JSON.stringify(database)
// fs.writeFileSync('Database.json', stringifyData)
   // }
});

