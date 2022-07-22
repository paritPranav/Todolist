const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const app= express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
let curday;
let curdate;

//DB connection
mongoose.connect('mongodb+srv://pranav:pranav123@cluster0.e9dl2.mongodb.net/TodolistDB?retryWrites=true&w=majority')

//New item schema
const itemschema=new mongoose.Schema({
    Task:String
});
const items =mongoose.model("items",itemschema);

// const item1=new items({
//     Task:"Good morning"
// })
// const item2=new items({
//     Task:"Good night" 
// })
// const defaultitems=[item1 , item2];
// // items.insertMany(defaultitems);


// const listschema=new mongoose.Schema({

//     name:String,
//     items:[itemschema]
// })

// const List = mongoose.model("lists",listschema);

// app.get("/:customName", function(req,res){
// const custName=req.params.customName;
// List.find({name:custName},function(err,result){
//     if(err){
//         console.log(err);
//     }else if(result!="") {
//         res.render("index",{title:day Day:day,date:currdate,newWork:result.items});
//     }else{
//         const list=new List({
//             name:custName,
//             items:defaultitems
//         });
//         console.log("created new");
        
//         list.save();
//     }
// })


// })


app.post("/",(req,res)=>{
    const work=req.body.work;
    console.log(req.body);
    const newitem=new items({
        Task:work
    });
    newitem.save();
    res.redirect("/");
});

app.post("/delete",(req,res)=>{
     const dlwork=req.body;
     console.log(dlwork);
    items.deleteOne(

        {name:"kiwi"},
        function(err){
            if(err){
                console.log(err);
            }else{
                console.log("Deleted");
            }
        }
    );
    
    res.redirect("/")
})
var workarr=[];
app.get("/",(req,res)=>{

    // res.sendFile(__dirname+"/index.html");
    var date=new Date();
    var currdate=date.getDate()+"/ "+date.getMonth()+"/ "+date.getFullYear();
    curday=date.getDay();
    
    
    switch (curday) {
        case 0:
            day="Sunday";
            break;
        
        case 1:
            day="Monday";
            break;

        case 2:
            day="Tuesday";
            break;

        case 3:
            day="wednesDay";
            break;

        case 4:
            day="ThursDay";
            break;

        case 5:
            day="Friday";
            break;
 
        case 6:
            day="Saturday";
            break;

        default:
            break;
    }

    items.find({},function(err,result){
        if(err)
        {
            console.log(err);
        }else{
            
            console.log("Getting data.....")
            res.render("index",{title:"TODO LIST",Day:curday,date:curdate,newWork:result});
        }
    })
    


})



app.listen(process.env.PORT||3000,()=>{
    console.log("Server started on prot 3000");
})







    // var serverDateStr = date.toLocaleString("en-US", {
    //     year: 'numeric',
    //     month: 'numeric',
    //     day: 'numeric',
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     second: 'numeric'
    //   });


    // if(date.getDay()==6 ){
    //     res.send("its saturday <br>"+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear());
        
    // }else{

    //     res.send("ohh sorry its not saturday");
    // }


//     items.insertMany([item1,item2],function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Added");
//     }
// })
// items.deleteMany({name:"Welcome to do list"},function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Deleted");
//     }
// }

// )