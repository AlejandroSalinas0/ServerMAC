exports.tiempohumano = function () {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = ("0"+ date_ob.getMinutes()).slice(-2);
    let seconds = ("0"+ date_ob.getSeconds()).slice(-2);
    let fecha=(year + "-" + month + "-" + date + " " + hours + ":"   + minutes + ":" + seconds);
    return fecha;
  }; 