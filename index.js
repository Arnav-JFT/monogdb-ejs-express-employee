const express = require("express")
const path = require('path')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
const ejs = require('ejs')
var bodyParser = require('body-parser')
const employee = require("./models/model")

mongoose.connect("mongodb+srv://as:KrXQc5nCIA8xkPgD@emp.kcdpnga.mongodb.net/emp?retryWrites=true&w=majority",{
  useNewUrlParser:true
},()=>{
  console.log("Db connected")
})



app.use(express.static(path.join(__dirname, 'views')));

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(cors())

app.set('template-engine',ejs)


let obj = {
  id:"",
  name:"",
  job:"",
  salary:""
}

// // get data
app.get('/',async(req,res)=>{ 
    employee.find({},(err,result)=>{
      if(err){
        console.log(err)
        res.send(err)
      }
      else{
        console.log(result);
        res.render("index.ejs",{user:result,obj})
      }
    })
})


//post data
app.post("/postData" , async(req,res)=>{
    const {name , job , salary} = req.body
    clearFunction()

    let emp = new employee({
      name,job,salary
    })
    try {
      await emp.save();
      res.redirect("/")
    } catch (error) {
      console.log(error)
      res.send(error)
    }
})

// delete
app.post('/delete/:id',async (req,res)=>{
    await employee.deleteOne({_id:req.params.id})
    res.redirect("/")
})
//edit api
app.post("/edit/:id",async(req,res)=>{

    const user = await employee.findOne({_id:req.params.id})
    obj = user
    res.redirect('/')
})

app.post("/update/:id",async(req,res)=>{

    const {name,job,salary} = req.body
    await employee.findByIdAndUpdate(req.params.id , req.body)
    clearFunction()
    res.redirect('/')
})

const clearFunction = ()=>{
  obj.name = "",
  obj.job = "",
  obj.salary = ""
}

app.listen(8080,()=>{
  console.log("server running at port 8080")
})
