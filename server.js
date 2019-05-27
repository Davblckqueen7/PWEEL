
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

app.get('/',(req, res)=>{
    res.render('home',{
        Nombre_Pagina :'Daniel'   //Vaiable para pagina dinamica
    });                     //renderiza home
  }); 
  

 app.get('/inicio_de_sesion',(req, res)=>{
    res.render('inicio_de_sesion',{
        Nombre_Pagina :'Daniel'   //Vaiable para pagina dinamica
    });                 //renderiza inicio de sesion                     
 });

 app.get('/vacantes',(req, res)=>{
  res.render('vacantes',{
      Nombre_Pagina :'Daniel'   //Vaiable para pagina dinamica
  });                 //renderiza inicio de sesion                     
});// escuchar puerto 8008
 

app.get('/trabajos',(req, res)=>{
  res.render('trabajos',{
      Nombre_Pagina :'Daniel',   //Vaiable para pagina dinamica
    ID_vacante : '154645'
  });                 //renderiza inicio de sesion                     
});// escuchar puerto 8008
 
//puerto

app.listen(port, ()=> {
  console.log('Escuchando el puerto:  ', port);
});