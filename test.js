var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var fs = require("fs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//const users=[];
app.get('/listAllUsers',(req,res)=>{
  fs.readFile('./users.json', 'utf-8', function(err, data) {
    if (err) throw err

    var arrayOfObjects = JSON.parse(data)
        res.send(arrayOfObjects);
});
});


app.post('/profile/addUser/',(req,res)=>{
  
var usersList=[];
var newUser;
console.log('New User created is '+JSON.stringify(newUser));

fs.readFile('./users.json', 'utf-8', function(err, data) {
    if (err) throw err
    usersList = JSON.parse(data);
  console.log('Data in the User\'s array is'+JSON.stringify(usersList));
  console.log('Data in the User\'s array is'+JSON.stringify);
  console.log(usersList.users.length);
  

  newUser={
            id:usersList.users.length+1,
            imageName:req.body.imageName,
            userName: req.body.userName,
            mobileNumber:req.body.mobileNumber,
            profession:req.body.profession,
            emailId:req.body.emailId
      };
  usersList.users.push(newUser);
  console.log('Finally the data in the USer DB is '+JSON.stringify(usersList));
  fs.writeFile('./users.json', JSON.stringify(usersList), 'utf-8', function(err) {
  if (err) throw err
  console.log('JSON File updated!')});
  }); 
  res.send('<html><body><h1>Data Inserted Sucessfully</h1>'
           //+req.body.imageName
           //+'<table border='1'>'+
         //  +'<tr><td>Id</td><td>imageName</td><td>userName</td><td>mobileNumber</td><td>profession</td></tr>'  
           //+'<table/>'+

           +'</body></html>');
   
});
    
     /* res.send(usersList);*/


app.get('/delete/:id',(req,res)=>{
  fs.readFile('./users.json', 'utf-8', function(err, data) {
  if (err) throw err
  var arrayOfObjects = JSON.parse(data)
  console.log(arrayOfObjects.users[(req.params.id)-1]);
arrayOfObjects.users.forEach(function(element) {
   if(element.id == req.params.id){
      //JSON.stringify(
      console.log('Got it'+element);
    }
 });
res.send(arrayOfObjects.users[(req.params.id)-1]);
});
});

app.post('/profile/upDateUser/',(req,res)=>{
   
   const email=req.body.email;
   
fs.readFile('./users.json', 'utf-8', function(err, data) {
  if (err) throw err

  var arrayOfObjects = JSON.parse(data);
  arrayOfObjects.users.forEach(function(element) {
   if(element.emailId === email){
      //JSON.stringify(
      console.log('Got it'+JSON.stringify(element));
      res.send('<html><body><h3>UPDATE THE VALUES TO CHANGE</h3><form action="http://127.0.0.1:3000/profile/upDateUserSucessfull/'+element.id+'" method="POST" id="onuform"><table boder="1">'
               +'<tr><td>Email Id:</td><td><input type="text" name="emailId" disabled value="'+element.emailId+'"</td></tr>'
               +'<tr><td>Image Name:</td><td><input type="text" name="imageName" value="'+element.imageName+'"</td></tr>'
               +'<tr><td>User Name:</td><td><input type="text" name="userName" value="'+element.userName+'"</td></tr>'
               +'<tr><td>Mobile Number:</td><td><input type="text" name="mobileNumber" value="'+element.mobileNumber+'"</td></tr>'
               +'<tr><td>Profession:</td><td><input type="text" name="profession" value="'+element.profession+'"</td></tr>'
               +'<tr><td><button type="submit" id="onuform" value="UPDATE"><strong>Submit</strong></button></tr></td>'
               +'<table></form></body></html>');}
      //else{res.send('<html><body><h2>Sorry no such registered mail Id Exist</h2></body></html>');}
 });
})

});

app.post('/profile/upDateUserSucessfull/:id',(req,res)=>{
 /* var i=0;
  res.send('Hello');

  var j;
 fs.readFile('./users.json', 'utf-8', function(err, data) {
 var arrayOfObjects = JSON.parse(data)
 //console.log(arrayOfObjects);
  arrayOfObjects.users.forEach(element){
   console.log();
   

  }

 })//readFile*/

res.send('Hello');
res.send('World');



});





const port=process.env.PORT || 3000;
app.listen(port,()=>console.log('Listening on Port '+ port+'...........'));

