const express = require('express')
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
var cors = require('cors');// import `items` from `routes` folder 
var port = 3000


app.listen(port, function () {
console.log('We are listening on port ' + port)
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//app.use(cors({Origin: 'http://localhost:3000'}));
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 205 // For legacy browser support
}

app.use(cors());

app.get('*', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, GET, POST, DELETE, OPTIONS"
    );
    req.header("Access-Control-Allow-Origin", "*");

    req.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    req.header(
      "Access-Control-Allow-Methods",
      "PUT, GET, POST, DELETE, OPTIONS"
    );
res.sendFile(path.join(__dirname, '/OriginalHtml.html'))
res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
//res.setHeader('Access-Control-Allow-Headers: Authorization');
})

app.post('/num', function (req, res) {
    req.header(
        "Access-Control-Allow-Methods",
        "PUT, GET, POST, DELETE, OPTIONS"
      );
    req.header(
        "Access-Control-Allow-Methods",
        "PUT, GET, POST, DELETE, OPTIONS"
    );
var num = req.body.value
console.log(num)
return res.end('done')
}
)