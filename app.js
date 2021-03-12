//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");



const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){
    let name = req.body.name;
    let email = req.body.email;
    
    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME:name,
                }
            }
        ]
    };

app.post("/tryagain", function(req, res){
    res.redirect("/")
})
let jsonData = JSON.stringify(data);

const url = "https://us1.api.mailchimp.com/3.0/lists/96f02d581b";

const options = {
    method:"POST",
    auth: "jpskonee:fa0a38c8bbbe9256f4b9c2cc0108fece-us1"
}

const request = https.request(url, options, function(response){

    if (response.statusCode == 200){
       res.sendFile(__dirname + "/success.html")
    } else {
        res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
});

request.write(jsonData);
request.end();

});

 


app.listen(process.env.PORT || 3000, function(){
    console.log("Server up and running at port 3000");
})

