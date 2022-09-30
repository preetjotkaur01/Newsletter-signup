const express= require("express");
const app= express();
const request=require("request"); 
const https = require("https");
const bodyParser= require("body-parser");
const { urlencoded, json } = require("body-parser");
const { post } = require("request");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req , res){
     res.sendFile(__dirname +"/signup.html");
});

app.post("/",function(req,res){
    var firstn = req.body.Fname;
    var lastn= req.body.lname;
    var email= req.body.email;

    var data = {
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_field:{
                    FNAME:firstn,
                    LNAME:lastn
                }

            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var url = "https:us17.api.mailchimp.com/3.0/lists/1bce33b27f";

    const options={
        method:"POST",
        auth:"preet:7fd94fe0294e7b3a822680a95a089bb3-us17"
        
    };
        const request= https.request(url , options , function(response){
           
            if (response.statusCode===200)
            {
                res.sendFile(__dirname +"/success.html");
            }
            else
            {
                res.sendFile(__dirname + "/failure.html");
            }

            response.on("data",function(data){
                console.log(JSON.parse(data));
            })
    })
    request.write(jsonData);
    request.end();

});
app.listen(process.env.PORT|| 3000,function(){
    console.log("server is working");
});

//7fd94fe0294e7b3a822680a95a089bb3-us17
//1bce33b27f