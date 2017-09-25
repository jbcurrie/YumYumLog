
// Import the model (burger.js) to use its database functions.
var db = require("../models");
var passport = require("passport");
//require authentication for any route; make sure username is in the route parameter
var application = application = require('./application');

module.exports = function(app) {
    //get the tracks user actually has, display in json
    app.get("/getTracks/:UserId",application.IsAuthenticated,function(req,res) {
        //req.body.goal is in the request for userTracks, not userInputs
        debugger;
            //render the userInputs with the handlebars obj for all current tracks
            db.goal.findAll({
                where: {UserId : req.params.UserId}
            }).then(function(dbGoal) {

                res.json(dbgoal)

                // var hbsObj = {
                //     goals : dbGoal
                // }
                // console.log(hbsObj.goals)
                // res.render("userTracks", hbsObj)
            })
        }



    })

    //get the webpage
    // app.get("/userInputs/search", function(req,res) {
    //     res.render("userInputs")
    // })
  
    
      // search for food by category
    app.get("/search/:UserId", function(req, res) {   
        //if the query 'q' is included look for food 
        if (req.query.q) {
            console.log(req.query.q);
            db.food.findAll({
                where: { 
                    item: {
                        $like: req.query.q
                    }
                }
            })
            .then(function(dbfood) {
                var hbsObj = {
                    choice : dbfood
                }
                // console.log(JSON.stringify(hbsObj));
                res.render("userInputs",hbsObj)
            });
        //if the query is category, return an object of the category to use for the food search
        } else if (req.query.category) {
            console.log(req.query.category)
            db.food.findAll({
                where: { 
                    category: req.query.category
                }
            }).then(function(dbfood) {
                // res.json(dbfood)
                var hbsObj = {
                    foods: dbfood
                }
                res.render("userInputs",hbsObj)
            });
        }
    });
    //post a new goal
    app.post("/addTrack/:username",application.IsAuthenticated, function(req,res) {
        // /createTrack/:id/:category/:goal/:week
        debugger;
        //find all tracks for this user, pass them to an object...
            //then, if this user is trying to create a track that exists, return a message string saying, ''track exists
            //if the track doesn't exists. create it
            db.goal.create({
                category: req.body.category,
                goal: req.body.goal,
                week: req.body.week,
                UserId: req.body.UserId
            }).then(function(dbGoal) {   
        //     debugger;
        //update the track with the current week
            // db.sequelize.query('UPDATE goals SET timelineId=WEEK(CURDATE()), week=WEEK(CURDATE()) WHERE id=?', {replacements: [dbGoal.id], type: db.sequelize.QueryTypes.UPDATE},{ model: db.goal }).then(function(result) {
            //     console.log("----db.sequelise.query data----")
            //     console.log(result)  
            // })
            // console.log("----db.goal.create data----")
            res.json(dbGoal);
        })
    })
    //log food entry
    app.post("/logFood/:id/:item/:count/:week/:goalId",function(req,res) {
        db.log.create({
            item: req.params.item,
            count: req.params.count,
            week: req.params.week,
            UserId: req.params.id,
            goalId: req.params.goalId
        }).then(function(dbGoal) { 
            res.json(dbGoal);
        })
    })
    //find all goals, sum the associated log counts, store as count in goals
}
//export routes for server.js to use
// module.exports = router;
