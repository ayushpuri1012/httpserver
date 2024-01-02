const express = require("express");
const app = express();

var users = [{
    name: "ayush",
    kidneys: [{
        healthy: false
    }]
}];

app.use(express.json());


//query parameters

app.get("/", function(req, res) {
    const apKidneys = users[0].kidneys;
    const numberOfKidneys = apKidneys.length;

    let numberOfHealthyKidneys = 0;
    for(let i=0; i<apKidneys.length; i++) {
        if(apKidneys[i].healthy) {
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }

    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

    res.json({
        numberOfKidneys, numberOfHealthyKidneys, numberOfUnhealthyKidneys
    });
})

app.post("/", function(req, res) {
    const isHealthy  = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    });
    res.json({
        msg: "Done"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    });
})

app.put("/", function(req, res) {
    for(let i=0; i<users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})


// removing all the unhealthy kidneys
app.delete("/", function(req, res) {
    if(isThereAtleastOneUnhealthyKidney()) {
        const newKidneys = [];
        for(let i=0; i<users[0].kidneys.length; i++) {
            if(users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({msg: "done"});
    } else {
        res.status(411).json({
            msg: "you have no bad kidneys"
        });
    }
})

function isThereAtleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for(let i=0; i<users[0].kidneys.length; i++) {
        if(!users[0].kidneys[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;
}

app.listen(3000);

