const express =require('express');
const app =express();
var mysql = require('mysql');
const bodyparser =require('body-parser');
app.set('view engine','ejs')

app.use(bodyparser.urlencoded({extended:false}));
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"todo"
})
con.connect((err)=>{
    if(err) throw err;
    console.log("connected successfully to port http://localhost:3000 :)");
})
app.get("/",(req,res)=>{
    let option={weekly :'long',year:'numeric',month:'long',day:'numeric'};
    let today=new Date();
    let day=today.toLocaleDateString("en-us",option);
    var Query="SELECT * FROM task ";
    
    
    con.query(Query,function(error,data){
        if(error){
            throw error;
        }else{
            res.render("index",{name:data,day:day});
        }
        
    })
})
app.post("/add",(req,res)=>{
    var name=req.body.notes;
    
    
        var sql = "INSERT INTO task (id , task ) VALUES ?";
        var values=[[,name]];
        con.query(sql,[values], function (err, result) {
            if (err) throw err;
            console.log("Task Added");
            res.redirect("/");
         });
   
    
});
app.post("/delete",(req,res)=>{
    if(!req.body.checkbox){
        res.redirect("/");
    }
    else{
        if(req.body.notes==""){
            var sql = "DELETE FROM task WHERE id="+req.body.checkbox+"";
            con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Task Deleted");
            res.redirect("/");
            });
        }
        else{
            var sql = "UPDATE task SET task='"+req.body.notes+"' WHERE id="+req.body.checkbox+"";
            con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Task Deleted");
            res.redirect("/");
            });
        }
    }
})
app.listen(3000);