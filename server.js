const express= require("express")
const app=express()
const {PORT, MONGODB_URL} = require("./config");
const {connect} =require("mongoose")
const noteRoute =require("./routes/noteRoute")
const path =require("path");
const { engine,registerHelper } = require("express-handlebars");
const NOTE_SCHEMA=require("./models/note_schema")
const methodOverride=require("method-override")


//?===========DB Connection============
let connectDB=async()=>{
    try{
        await connect(MONGODB_URL)
        console.log("DB Connected");
    }catch(err){
        console.log(err);
    }
}
connectDB();

//?================MIDDLEWARES ===================
app.engine("handlebars",engine())
app.set("view engine", "handlebars")
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))




app.get("/",async(req,res)=>{
    let payload=await NOTE_SCHEMA.find({}).lean();
    res.render("home",{title:"HOME PAGE", payload})
})

//!call router path
app.use("/note",noteRoute)


app.get("/",(req,res)=>{
    res.render("home",{title:"HOME PAGE"})
})

//listen a port
app.listen(PORT || 5000,err=>{
    if (err) throw err;
    console.log("app is running on port number",PORT);
}) 



//!dotenv: very Important module
//?Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env . Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
