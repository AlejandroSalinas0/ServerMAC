const fs = require('fs');
const express = require('express');
// create new router
const router = express.Router();
const net = require('net');
const { Socket } = require('dgram');
const port = 8077
//const host = '10.10.20.77'; //lasec_invitados
const host = '10.86.10.220';  //SF-Hardware
//const host = "192.168.0.6";
var contador = 0;
var time = require('./Tiempo');
var SL = require('./Save-Load');
var programador =require('./Programador');
var gen =require('./Generadores');
var dataex = fs.readFileSync('Database.json')
var database = JSON.parse(dataex)
var dataexm = fs.readFileSync('Mina.json')
var datamina = JSON.parse(dataexm)
var controler=""
//var datoInput='';
//const readline = require('readline-sync');

//let datoInput = readline.question("Ingrese comando TCP:     \r\n");

//console.log("Hi " + name + ", nice to meet you.");
var bandera=false;
var bandera2=false;
const modo_espera=true;
const reprogramacion=true;
var orderNums='';
var newIp=''; 
var newOrderNum='';
let found='';
let mac='';
const server = net.createServer();
server.listen(port, host, () => {
    //console.log('TCP Server is running on port ' + port + '.');
});

console.log(time.tiempohumano());
server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

    //sockets.push(sock);

    sock.on('data', function(data) {
        if(found=!undefined){
            console.log("Found indefined"+found.Log);
        }
        dataex = fs.readFileSync('Database.json')
        database = JSON.parse(dataex)
        var n = data.includes("MAC:");
        //console.log("bandera1: "+bandera1+"bandera2: "+bandera2);
        if(n == true || bandera==true ||bandera2==true){
            const str=data.toString();
            mac=str.slice(6, 23)
            console.log('MAC RECONOCIDA: '+mac)
            found = database.find(function (item) {
                return item.MAC === mac;
            });
            let Mine = datamina.find(function (item) {
                return item.Index === "LASEC_API";
            });
            if (found==null && bandera==false){
                    console.log('MAC pero sin SN');    
                    console.log('Mac nueva, registrando nueva entrada MAC, entre valores de SN manualmente o con ayuda de la interfaz');
                    sock.write("FLASH");
                    let itemIds = database.map(item => item.ID);
                    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
                    //gen.generador(database);
                    let newItem = {
                        ID: newId, //generado arriba 
                        MAC: mac, // generated in above step
                        SN: null,
                        IP: "0.0.0.0", // value of `title` get from POST req
                        Operacion: newOrderNum,
                        Log: "Esperando SN",
                        Completed: true, // default value is set to false
                        Mina: Mine.Mina,
                        DispositivoConfigurado: time.tiempohumano()
                    };
                    console.log('Datos insertados: '+newItem);
                    database.push(newItem);
                    SL.saveUserData(database);
            }
            else {
                if (found.SN==null){
                console.log('MAC pero sin SN');    
                    if (modo_espera==true) {        
                        console.log('Mac en la base de datos pero no tiene SN asignado, esperando asignacion de SN manual, MAC: ' +found.MAC);
                        }
                    dataex = fs.readFileSync('Database.json')
                    database = JSON.parse(dataex)        
                }
                else {
                    console.log('SN + MAC');   
                    if (found.Log=="Esperando SN"){
                        console.log('MAC y SN encontrados, empezando programacion inicial, SN found: ' +found.SN);
                        bandera=true;
                        let newOrderNum=gen.generador(database)[1];
                        let updated = {
                            ID: found.ID, //generado arriba 
                            MAC: found.MAC, // generated in above step
                            SN: found.SN,
                            IP: "0.0.0.0", // value of `title` get from POST req
                            Operacion: newOrderNum,
                            Log: "Configuracion en proceso",
                            Completed: false, // default value is set to false
                            Mina: datamina.Mina,
                            Fecha_De_Fallo: time.tiempohumano()   
                            };
                            SL.updateUserData(database, found, updated);
                            console.log('Starting_Config');
                            sock.write('Starting_Config');
                            newOrderNum=gen.generador(database)[1];
                    }
                    if (found.Log=="Configuracion en proceso"){
                    let segmento="10.86.10.";
                    //let newIp=gen.generador(database)[0];
                    
                    let updated = {
                        ID: found.ID, //generado arriba 
                        MAC: found.MAC, // generated in above step
                        SN: found.SN,
                        IP: "0.0.0.0", // value of `title` get from POST req
                        Operacion: newOrderNum,
                        Log: "Configuracion en proceso",
                        Completed: false, // default value is set to false
                        Mina: datamina.Mina,
                        Fecha_De_Fallo: time.tiempohumano()   
                        };
                        SL.updateUserData(database, found, updated);
                    ///INICIA PROGRAMACION INICIAL
                        newOrderNum=gen.generador(database)[1];
                        let newIp=gen.generador(database)[0];
                        controler = programador.programa(data, sock, Mine, found, segmento, newIp);
                    if(controler=="Ready Network"){    
                            
                            updated = {
                            ID: found.ID, //generado arriba 
                            MAC: found.MAC, // generated in above step
                            SN: found.SN,
                            IP: "10.86.10."+newIp, // value of `title` get from POST req
                            Operacion: newOrderNum,
                            Log: 'Configuracion inicial exitosa',
                            Completed: true, // default value is set to false
                            Mina: Mine.Mina,
                            DispositivoConfigurado: time.tiempohumano() // new date object    
                        }
                        SL.updateUserData(database, found, updated);
                        bandera=false;
                        controler='';
                        found='';
                        mac='';
                        }
                    }  
                        if(reprogramacion==true){
                            if(found.Log=="Configuracion inicial exitosa" || found.Log=="Re-Configurado"){
                                console.log("reprogramando de nuevo");
                                let updated = {
                                    ID: found.ID, //generado arriba 
                                    MAC: found.MAC, // generated in above step
                                    SN: found.SN,
                                    IP: found.IP, // value of `title` get from POST req
                                    Operacion: found.Operacion,
                                    Log: "Re-Configuracion en proceso",
                                    Completed: false, // default value is set to false
                                    Mina: Mine.Mina,
                                    Fecha_De_Fallo: time.tiempohumano()   
                                    };
                        
                                SL.updateUserData(database, found, updated);
                            ///INICIA PROGRAMACION INICIAL
                                //controler = programador.programa(data, sock, Mine, found, bandera, newIp);
                                //console.log('controler: '+controler);
                                bandera2=true;
                                console.log('Reprogramacion: Valores de esta MAC ya registrada anteriormente, programando de nuevo con valores en el registro')
                                
                                //controler = programador.programa(data, sock, Mine, found, bandera, newIp);
                                //console.log(controler);
                                console.log(bandera2);
                                console.log('Starting_Config');
                                sock.write('Starting_Config');
                            }
                            if (found.Log=="Re-Configuracion en proceso"){
                                    console.log('debiera ser Re-confi en proceso:   '+found.Log);
                                    let segmento="";
                                    let updated = {
                                        ID: found.ID, //generado arriba 
                                        MAC: found.MAC, // generated in above step
                                        SN: found.SN,
                                        IP: found.IP, // value of `title` get from POST req
                                        Operacion: found.Operacion,
                                        Log: "Re-Configuracion en proceso",
                                        Completed: false, // default value is set to false
                                        Mina: Mine.Mina,
                                        Fecha_De_Fallo: time.tiempohumano()   
                                        };
                                        SL.updateUserData(database, found, updated);
                                    ///INICIA PROGRAMACION INICIAL
                                        controler = programador.programa(data, sock, Mine, found, segmento, found.IP);
                                        console.log('controler: '+controler);
                                        console.log(newIp);
                                if(controler=="Ready Network"){
                                        updated = {
                                            ID: found.ID, //generado arriba 
                                            MAC: found.MAC, // generated in above step
                                            SN: found.SN,
                                            IP: found.IP, // value of `title` get from POST req
                                            Operacion: found.Operacion, // generated in above step
                                            Log: 'Re-Configurado',
                                            Completed: true, // default value is set to false
                                            Mina: Mine.Mina,
                                            DispositivoActualizado: time.tiempohumano() // new date object    
                                        }
                                        SL.updateUserData(database, found, updated);
                                        console.log(bandera2, controler, updated, mac);
                                        bandera2=false;
                                        controler='';
                                        found='';
                                        mac='';
                                        console.log('borrando banderas de reprogramacion');
                                        console.log(bandera2, controler, found, mac);
                                }    
                            }
                        }
                }
            }
        }
    sock.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
    
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort + '\r\n');
    });
    });
});

//Server mac estable version 3 reconfiguracion y configuracion funcionando probar generadores de Ip y de Orden
//tal vez tenga problemas para manejar varios clientes a la vez debido que guarda la mac y todo eso en el cache
// Por hacer: Multicliente, Ip 170-255 255-0 0-255, Configuraciones interrumpidas enviar All over again para reiniciar
// Organizar codigo

//Server mac estable version 4 probar generadores especialmente el de Orden cuenta demasiadas
// Por hacer: Multicliente, Ip 170-255 255-0 0-255, Configuraciones interrumpidas enviar All over again para reiniciar
// Organizar codigo