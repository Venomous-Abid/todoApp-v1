const express = require("express");
const bodyParser = require("body-Parser");
const date = require(__dirname + "/date.js");

const app = express();

const items =["Buy Food","Cook Food","Eat Food"];
const workItems=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    //from Custom Date Module
    let day = date.getDate();
    console.log(day);
    res.render("List",{
        listTitle: day,
        newListItems: items
    });
});

app.post("/", function(req, res){
    console.log(req.body);
    const item = req.body.newitem;

    if (req.body.list == "Work"){
         workItems.push(item);
         res.redirect("/work");
    } else{
        items.push(item);
        res.redirect("/");
    }
});


app.get("/work", function(req,res){
    res.render("list", {
        listTitle:"Work List",
        newListItems: workItems
    });
});


app.post("/work", function(req, res){
    const item = req.body.newitem;
    workItems.push(item);
    res.redirect("/work");
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
})