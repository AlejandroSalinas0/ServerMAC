//var datoInput='';
//const readline = require('readline-sync');

//let datoInput = readline.question("Ingrese comando TCP:     \r\n");

//console.log("Hi " + name + ", nice to meet you.");

// const stringifyData2 = JSON.stringify(datamina);
// console.log(stringifyData2);

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
const fs = require('fs');
const express = require('express');
// create new router
const router = express.Router();
const net = require('net');
const { Socket } = require('dgram');
const port = 8077
const host = '10.10.20.77'; //lasec_invitados
//const host = '10.86.10.220';  //SF-Hardware
var contador = 0;
var dataex = fs.readFileSync('Database.json')
var database = JSON.parse(dataex)
var dataexm = fs.readFileSync('Mina.json')
var datamina = JSON.parse(dataexm)

var time = require('./Tiempo');
var SL = require('./Save-Load');
var programador =require('./Programador');
const modo_espera=true;
const reprogramacion=true;

const server = net.createServer();
server.listen(port, host, () => {
    //console.log('TCP Server is running on port ' + port + '.');
});
//console.log(time.tiempohumano());
// let data="OK_A";
let sock= '';
let found = database.find(function (item) {
     return item.MAC === "C4:AC:59:98:A9:F6";
 });
 let Mine = datamina.find(function (item) {
    return item.Index === "LASEC_API";
});
let data='OK_K';
let bandera=false;
console.log(programador.programa(data, sock, Mine, found, bandera));

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

    //sockets.push(sock);

    sock.on('data', function(data) {
        //sock.write('OK');
        console.log(data.toString());
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
            let Mine = datamina.find(function (item) {
                return item.Index === "LASEC_API";
            });
            //let mina = datamina.find(function (item) {
            //    return item.MAC === mac;
            //});
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
                    
                    // crea un nuevo objeto
                    let newItem = {
                        ID: newId, //generado arriba 
                        MAC: mac, // generated in above step
                        SN: null,
                        IP: "0.0.0.0", // value of `title` get from POST req
                        Operacion: newOrderNum,
                        Log: 'Fresh Start',
                        Completed: true, // default value is set to false
                        Mina: Mine.Mina,
                        DispositivoConfigurado: time.tiempohumano()
                    };
                    console.log('Datos insertados: '+newItem);
                    console.log('Database: '+database);
                    database.push(newItem);
                    SL.saveUserData(database);
                    // const stringifyData = JSON.stringify(database, null, 2);
                    // fs.writeFileSync('Database.json', stringifyData);
            }
            else {
                if (found.SN==null){
                //console.log('MAC pero sin SN');    
                    if (modo_espera==true) {        
                        console.log('Mac en la base de datos pero no tiene SN asignado, esperando asignacion de SN manual, MAC: ' +found.MAC);
                        const stringifyDatamina = JSON.stringify(datamina);
                        console.log('Datamina S:')
                        console.log(stringifyDatamina)
                    }    
                }
                else {
                    //console.log('SN null?'+found.SN)
                    if (found.Log=='Fresh Start'){

                    console.log('MAC y SN encontrados, empezando programacion inicial, SN found: ' +found.SN);
                    //let itemIds = database.map(item => item.ID);
                    //const stringifyDataminaB = JSON.stringify(datamina);
                    //console.log('Datamina B:')
                    //console.log(stringifyDataminaB.Mina)
                    
                    let itemIps = database.map(item => item.IP);
                    console.log("itemIps: "+itemIps)
                    let array=[];
                    let splits=[];
                    itemIps.forEach(element => { 
                    console.log('element: '+element)
                    splits=element.split('.');
                    array.push(splits[3]); 
                    });
                    
                    let orderNums = database.map(item => item.Operacion);
                    // create new id (basically +1 of last item object)
                    //let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
                    let newIp = array.length > 1 ? Math.max.apply(Math, array) + 1 : 171;// create new order number (basically +1 of last item object)
                    let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;
                    console.log('Generando valores nuevos')// get orderNums from data array
                    // create an object of new Item
                    //console.log('macos'+found.MAC);
                    let updated = {
                        ID: found.ID, //generado arriba 
                        MAC: found.MAC, // generated in above step
                        SN: found.SN,
                        IP: "0.0.0.0", // value of `title` get from POST req
                        Operacion: newOrderNum,
                        Log: 'Error durante la programacion',
                        Completed: false, // default value is set to false
                        Mina: datamina.Mina,
                        Fecha_De_Fallo: fecha   
                    };
                    ///INICIA PROGRAMACION INICIAL
                    //console.log(newIp);
                    programador.programa(data, sock, Mine, found, bandera);
                        let targetIndex = database.indexOf(found);
                        // replace object from data list with `updated` object
                        database.splice(targetIndex, 1, updated);
                    //saveUserData(database);
                        console.log("database: "+database);
                        const stringifyData = JSON.stringify(database, null, 2)
                        fs.writeFileSync('Database.json', stringifyData)
                        //console.log('Operacion 1 terminada con exito')
                    updated = {
                        ID: found.ID, //generado arriba 
                        MAC: found.MAC, // generated in above step
                        SN: found.SN,
                        IP: "192.168.0."+newIp, // value of `title` get from POST req
                        Log: 'Programacion inicial exitosa',
                        Operacion: newOrderNum, // generated in above step
                        Completed: true, // default value is set to false
                        Mina: datamina.Mina,
                        DispositivoConfigurado: fecha // new date object    
                    //};
                    }
                //     let targetIndex = database.indexOf(found);
                //     // replace object from data list with `updated` object
                //     database.splice(targetIndex, 1, updated);
                // //saveUserData(database);
                //     console.log("database: "+database);
                //     const stringifyData = JSON.stringify(database, null, 2)
                //     fs.writeFileSync('Database.json', stringifyData)
                //     //console.log('Operacion 1 terminada con exito')
                    }    
                    else {
                        if(reprogramacion==true){
                            console.log('Reprogramacion: Valores de esta MAC ya registrada anteriormente, programando de nuevo con valores en el registro')
                            const stringifyDataminaB = JSON.stringify(datamina);
                            console.log('Datamina B:')
                            console.log(stringifyDataminaB)
                            sock.write('Starting_Config');
                    console.log('Starting_config')
                    if(data.includes("OK_A")){
                        sock.write('-S'+datamina.AP);
                        console.log('-S'+datamina.AP);
                        }
                    else if(data.includes("OK_S")){
                        sock.write('-K'+datamina.Password);
                        console.log('-K'+datamina.Password);
                        }
                    else if(data.includes("OK_K")){
                        sock.write('-G'+datamina.Gateway);
                        console.log('-G'+datamina.Gateway);
                        }
                    else if(data.includes("OK_G")){
                        sock.write('-I'+datamina.Ip_server);
                        console.log('-I'+datamina.Ip_server);
                        }
                    else if(data.includes("OK_I")){
                        sock.write('-M'+datamina.Mask);
                        console.log('-M'+datamina.Mask);
                        }
                    else if(data.includes("OK_M")){
                        sock.write('-C'+found.IP);
                        console.log('-C'+found.IP);
                        }
                    else if (data.includes("OK_C")){
                        sock.write('Ready Network');
                        console.log('Ready Network');//
                        let targetIndex = database.indexOf(found);
                        // replace object from data list with `updated` object
                        database.splice(targetIndex, 1, updated);
                    //saveUserData(database);
                        console.log("database: "+database);
                        const stringifyData = JSON.stringify(database, null, 2)
                        fs.writeFileSync('Database.json', stringifyData)
                            updated = {
                                ID: found.ID, //generado arriba 
                                MAC: found.MAC, // generated in above step
                                SN: found.SN,
                                IP: found.IP, // value of `title` get from POST req
                                Log: 'Reprogramado',
                                Operacion: found.Operacion, // generated in above step
                                Completed: true, // default value is set to false
                                Mina: datamina.Mina,
                                DispositivoActualizado: fecha // new date object    
                            }
                            targetIndex = database.indexOf(found);
                            // replace object from data list with `updated` object
                            database.splice(targetIndex, 1, updated);
                            stringifyData = JSON.stringify(database, null, 2)
                            fs.writeFileSync('Database.json', stringifyData)
                        }
                    }
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
});

