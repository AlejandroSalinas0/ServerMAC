const net = require('net');
const port = 8077;
//const host = '10.10.20.77';
const host = '10.86.10.220';
var contador = 0;

const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
});

let sockets = [];

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);

    sock.on('data', function(data) {
        // var n = data.includes("MAC");
        //     if(n == true){
        //     console.log('MAC encontrada')
        //     sock.write('Starting_Config');
        //     const str=data.toString();
        //     const mac=str.split('');
        //     console.log(mac.slice(3, 6));
        //     console.log('MAC RENOCONOCIDA: '+mac)
        //     }
        console.log('datos: '+data)
        sock.write('A1');
        // if((data.includes("MAC")) && (contador == 1)){
        //     sock.write('Starting_Config');
        //     console.log('Starting Config');
        //     console.log('Funcionando correctamente');
        //     //contador = contador + 1; 
        //     console.log('contador: '+contador);
        //     data='';
        // }
        // else if((data.includes("MAC")) && (contador == 2)){
        //     sock.write('-SSF-HARDWARE');
        //     console.log('-SSF-HARDWARE');
        //     //contador = contador + 1; 
        //     console.log('contador: '+contador);
        //     data='';
        // }
        // else if((data.includes("MAC")) && (contador == 3)){
        //     sock.write('-KLasec123.');
        //     console.log('-KLasec123.');
        //     //contador = contador + 1; 
        //     console.log('contador: '+contador);
        //     data='';
        // }
        // else if((data.includes("MAC")) && (contador == 4)){
        //     sock.write('-G10.86.10.254');
        //     console.log('-G10.86.10.254');
        //     //contador = contador + 1;
        //     console.log('contador: '+contador); 
        //     data='';
        // }
        // else if((data.includes("MAC")) && (contador == 5)){
        //     sock.write('-I10.86.10.1');
        //     console.log('-I10.86.10.1');
        //     //contador = contador + 1; 
        //     data='';
        // }
        // else if((data.includes("MAC")) && (contador == 6)){
        //     sock.write('-M255.255.255.0');
        //     console.log('-M255.255.255.0');
        //     //contador = contador + 1;
        //     data=''; 
        // }
        // else if((data.includes("MAC")) && (contador == 7)){
        //     sock.write('-C10.86.10.1');
        //     console.log('-C10.86.10.1');
        //     //contador = contador + 1; 
        //     data='';
        // }
        // else if((data.includes("MAC")) && (contador == 8)){
        //     sock.write('-E');
        //     console.log('Ready Network');
        //     //contador = contador + 1;
        //     sock.destroy();
        //     data=''; 
        //     contador=0;
        // }
        contador = contador + 1; 
        // if(data.includes("OK_A")){
        //     sock.write('-SSF-HARDWARE');
        //     console.log('-SSF-HARDWARE');
        // }
        // if(data.includes("OK_S")){
        //     sock.write('KLasec123.');
        //     console.log('KLasec123.');
        // }
        // if(data.includes("OK_K")){
        //     sock.write('G10.86.10.254');
        //     console.log('G10.86.10.254');
        // }
        // if(data.includes("OK_G")){
        //     sock.write('-I10.86.10.1');
        //     console.log('-I10.86.10.1');
        // }
        // if(data.includes("OK_I")){
        //     sock.write('M255.255.255.0');
        //     console.log('M255.255.255.0');
        // }
        // if(data.includes("OK_M")){
        //     sock.write('-C10.86.10.1');
        //     console.log('-C10.86.10.1');
        // }
        // if(data.includes("OK_C")){
        //     sock.write('Ready Network');
        //     console.log('Ready Network');
        // }
        

        //console.log('N '+n)
        //console.log('DATA ' + sock.remoteAddress+' '+ data);
        //const str=data.toString();
        //console.log('STR '+str);
        //const word=str.split('MAC:');
        //console.log('word ' + word);
        
        // Write the data back to all the connected, the client will receive it as data from the server
        //sockets.forEach(function(sock, index, array) {
            //sock.write('hola');
            //sock.write(sock.remoteAddress + ':' + sock.remotePort + " N1\r\n " + data + '\r\n');
            //sock.write('N1\r\n');
        //});
    }); 
    sock.on('error', function(err) {
        console.log(`Error: ${err}`);
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort + '\r\n');
    });
});