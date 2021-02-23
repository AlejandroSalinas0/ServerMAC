exports.generador = function(database){
let itemIps = database.map(item => item.IP);
let array=[];
let splits=[];
itemIps.forEach(element => { 
splits=element.split('.');
array.push(splits[3]); 
});
orderNums = database.map(item => item.Operacion);
newIp = array.length > 1 ? Math.max.apply(Math, array) + 1 : 171;// create new order number (basically +1 of last item object)
if(newIp==1){
    newIp=170;    
}
if(newIp>255){
    newIp=20
}
newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;
return [newIp, newOrderNum];
}