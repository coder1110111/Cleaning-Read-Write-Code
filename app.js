const http=require("http");
const routes=require("./routes")        //Here we send the address of the file relative to the main file
//routes.anotherfunction();               //This is used when we send multiple function in normal format

routes.check();                         //This is used with key value pair
const server=http.createServer(routes.mainfunction)
server.listen(3000,()=>{
    console.log("Server is Running");
})