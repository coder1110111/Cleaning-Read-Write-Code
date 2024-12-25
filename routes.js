const fs=require("fs");

const requestHandler= (req,res)=>{
    if(req.url==='/'){
        res.setHeader("Content-Type","text/html");
        res.end(
            `
            <form action="/message" method="POST">
                <label>Name:</label>
                <input type="text" name="username"></input>
                <button type="submit">Add</button>
                </form>
                `
        )
    }   else{
            if(req.url=='/message'){
                res.setHeader("Content-Type","text/html");
                let datachunks=[];
                req.on('data',(chunks)=>{
                    console.log(chunks);
                    datachunks.push(chunks);
                })

                req.on('end',()=>{
                    let combinedbuffer=Buffer.concat(datachunks);
                    console.log(combinedbuffer.toString());
                    let value=combinedbuffer.toString().split("=")[1];
                    console.log(value);
                    
                    fs.writeFile('check.txt',value,(err)=>{
                        //if there is no error will go down;

                        res.statusCode=302  //This status code is shown when a page redirects you to another page
                        res.setHeader('location','/')  //This is the redirection page
                        res.end()      //This signifies that there will be no coming data and ends the response

                    })
                })
            }
            else{
                if(req.url=='/read'){
                    fs.readFile('check.txt',(err,data)=>{
                        console.log(data.toString());  //Data is returned as a Buffer hence we convert it to string
                        res.end(                        //Used to finally send a response to the client
                            `<h1>${data.toString()}</h1>`
                        );
                    })
                }
            }
    }    
}

const anotherfunction=()=>{
    console.log("Hello Everyone. This is function to demonstrate how module.exports work. It is an inbuilt server method");
}
//modulee.exports is used so that function in one file can be used in another file
//module.exports=requestHandler;    for basic if we want to export only one function

/*module.exports={            //This is used when we want to export more than one function
    requestHandler,
    anotherfunction
};*/

module.exports={                //This is used when we want a key value pair in main. We can directly call the key in main file after importing.
    mainfunction:requestHandler,
    check:anotherfunction
}

//we can also export above method as:
/*
module.exports.mainfunction=requestHandler;
module.exports.check=anotherfunction;
*/
