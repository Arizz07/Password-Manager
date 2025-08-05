import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import router from "./routes/passwordroute.js"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

let conn  = mongoose.connect('mongodb://127.0.0.1:27017/passDb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=> console.log("Mongo Connected"))
.catch((err)=> console.error("Connection Error",err))

app.get('/',(req,res)=>{
    res.send("hello Boys")
})

app.use('/api/password',router)



app.listen(port,()=>{
    console.log(`server rrunning at ${port}`)
})