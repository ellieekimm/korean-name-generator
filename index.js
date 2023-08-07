import namer from "korean-name-generator"
import express from "express";
import bodyParser from "body-parser";
const port = 3000;
var app = express();
app.use(express.static("public"));
var nameList = [];
app.use(bodyParser.urlencoded({ extended: true }));
import say from "say";
var name = "";

app.get("/", (req, res) =>{
    res.render("main.ejs");
});

app.get("/male", (req, res) =>{
    name = namer.generate(true);
    res.render("index.ejs", {
        name: name,
        nameList: nameList,
    })
    app.post("/newname", (req, res) =>{
        name = namer.generate(true);
        res.render("index.ejs", {
            name: name,
            nameList: nameList,
        })
    })
    app.post("/like", (req, res) =>{
        const likedName = req.body["name"];
        console.log(likedName);
        nameList.push(likedName);
        res.render("index.ejs", {
            name: likedName,
            nameList: nameList,
        })
    }) 
});

app.get("/female", (req, res) =>{
    name = namer.generate(false);
    res.render("index.ejs", {
        name: name,
        nameList: nameList,
    })

    app.post("/newname", (req, res) =>{
        name = namer.generate(false);
        res.render("index.ejs", {
            name: name,
            nameList: nameList,
        })
    })
    app.post("/like", (req, res) =>{
        const likedName = req.body["name"];
        var found = false;
        for (var i = 0; i < nameList.length; i++){
            if (likedName === nameList[i]){
                found = true;
            }
        }
        if (!found){
            nameList.push(likedName);
        }
        res.render("index.ejs", {
            name: likedName,
            nameList: nameList,
        })
    })
});

app.post("/return", (req, res) =>{
    res.render("main.ejs");
})

app.get("/sound", (req, res) =>{
    say.speak(name, "Yuna");
})   

app.listen(port, () =>{
    console.log("Listening on port " + port);
});



