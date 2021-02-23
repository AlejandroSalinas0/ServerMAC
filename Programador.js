exports.programa = function(data, sock, datamina, found, segmento, newIp) {                    
        var control='Iniciando';
        console.log("programador ejecutandose");
        if(data.includes("OK_A")){
            sock.write('-S'+datamina.AP);
            console.log('-S'+datamina.AP);
            control=('-K'+datamina.Password);
            }
        else if(data.includes("OK_S")){
            sock.write('-K'+datamina.Password);
            console.log('-K'+datamina.Password);
            control=('-K'+datamina.Password);
            }
        else if(data.includes("OK_K")){
            sock.write('-G'+datamina.Gateway);
            console.log('-G'+datamina.Gateway);
            control=('-G'+datamina.Gateway);
            }
        else if(data.includes("OK_G")){
            sock.write('-I'+datamina.Ip_server);
            console.log('-I'+datamina.Ip_server);
            control=('-I'+datamina.Ip_server);
            }
        else if(data.includes("OK_I")){
            sock.write('-M'+datamina.Mask);
            console.log('-M'+datamina.Mask);
            control=('-M'+datamina.Mask);
            }
        else if(data.includes("OK_M")){
            sock.write('-C'+segmento+newIp);
            console.log('-C'+segmento+newIp);
            control=("-C"+segmento+newIp);
            }
        else if (data.includes("OK_C")){
            //sock.write('Dummy text');
            sock.write('-E');
            console.log('Ready Network');
            control="Ready Network";
        }
    return control;    
    };