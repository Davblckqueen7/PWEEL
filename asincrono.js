const fs = require('fs');
console.log('Primera linea de codigo');

fs.writeFile('./texto','linea uno',(err)=>{
if(err){
    console.log(err);
}
console.log('archivo creado');
});

console.log('Ultima linea de codigo');
