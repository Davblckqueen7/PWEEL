
const express = require('express');
const app = express();
const hbs = require('hbs');


const port = process.env.PORT || 3000;
//midlewire
app.use(express.static(__dirname + '/public'));
//
hbs.registerPartials(__dirname +'/views/parciales')
// Express HBS (sin modulo hbs)
app.set('view engine', 'hbs');

function traer_trabajos(){
    app.get('/trabajos',(req, res)=>{
        res.render('trabajos',{
        Cargo : 'No lo se',
        ID_vacante : '000000'
        });                 //renderiza inicio de sesion                     
      });// escuchar puerto 8008
      console.log('Traer de BD  ');
}


 
//puerto

app.listen(port, ()=> {
  console.log('Escuchando el puerto:  ', port);
});