const net = require('net');
//const port = 8077;
//const host = '10.10.20.77';
//const host = '10.86.10.220';
//var contador = 0;
const readline = require('readline-sync');
var data = [
    { id: 1, MAC: 'Dispositivo A', IP:'192.168.1.12', GPIOS:1, Operacion: 1, completed: true, createdOn: new Date() },
    { id: 2, MAC: 'Dispositivo B', IP:'192.168.1.13', GPIOS:1, Operacion: 2, completed: true, createdOn: new Date() },
    { id: 3, MAC: 'Dispositivo C', IP:'192.168.1.14', GPIOS:2, Operacion: 3, completed: true, createdOn: new Date() },
    { id: 4, MAC: 'Dispositivo D', IP:'192.168.1.15', GPIOS:1, Operacion: 4, completed: false, createdOn: new Date() },
    { id: 5, MAC: 'Dispositivo E', IP:'192.168.1.16', GPIOS:0, Operacion: 5, completed: false, createdOn: new Date() },
];

let itemIps = data.map(item => item.IP);
//let sockets = [];
//let datoInput = readline.question("Ingrese comando TCP:     \r\n");
//console.log(itemIps)

//const date=datoInput.split('.');
//let date = (datoInput).slice(9);
//console.log(date[3]);
let array=[];
let splits=[];
//const arr = ['cat', 'dog', 'fish']; 
itemIps.forEach(element => { 
splits=element.split('.');
//console.log(splits[3]);
array.push(splits[3]); 
  });
let newIp = array.length > 1 ? Math.max.apply(Math, array) + 1 : 171;   
console.log(array);
console.log(newIp);


// server.on('connection', function(sock) {
//     console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
//     //sockets.push(sock);
//     //console.log('datos: '+data)
//     // //sock.write(sock.remoteAddress + ':' + sock.remotePort + " N1\r\n " + data + '\r\n');
//     //sock.write("ACK" + '\r\n');

//     sock.on('data', function(data) {
        
//     }); 
//     sock.on('error', function(err) {
//         console.log(`Error: ${err}`);
//     });

//     // Add a 'close' event handler to this instance of socket
//     sock.on('close', function(data) {
//         let index = sockets.findIndex(function(o) {
//             return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
//         })
//         if (index !== -1) sockets.splice(index, 1);
//         console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort + '\r\n');
//     });
// });