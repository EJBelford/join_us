/*--*----1----*----2----*----3----*----4----*----5----*----6----*----7----*----8
================================================================================
                          Classification: UNCLASSIFIED
================================================================================
                      Copyright, Booz Allen Hamilton, 2022
                        Unpublished, All Rights Reserved
================================================================================
----*----|----*----|----*----|----*----|----*----|----*----|----*----|----*---*/

var   express    = require('express');
var   bodyParser = require('body-parser'); 
var   app        = express(); 

/* https://www.npmjs.com/package/mysql2 */
const mysql = require('mysql2'); 

app.set('view engine', 'ejs'); 

app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'R2D2!$Badd',
    database: 'join_us'
}); 

const q3 = 'SELECT COUNT(*) AS userCnt FROM join_us.users'; 
const q5 = 'INSERT INTO users SET ?';

var userCnt = 0;

//--+----1----+----2----+----3----+----4----+----5
// HOME
//--+----1----+----2----+----3----+----4----+----5

app.get("/", function(req, res) { 
//    console.log(req);
// Find count of users in DB. 
    connection.query(q3, function(err, results) {
        if (err) throw err;
        userCnt = results[0].userCnt; 

// Respond with the count. 
        res.render("home", {userCnt: userCnt});
//        res.send("We have "  + userCnt + " users in the database."); 
    });
}); 

//--+----1----+----2----+----3----+----4----+----5
// REGISTER
//--+----1----+----2----+----3----+----4----+----5
    
app.post("/register", function(req, res) { 
    console.log('POST request sent to /REGISTER'); 
    console.log('Email is ' + req.body.email); 

    var email = { 
        email: req.body.email 
    }; 

    connection.query(q5, email, function(err, results) {
        if (err) throw err;
        console.log(results);
        res.redirect("/");
    });
}); 
        
//--+----1----+----2----+----3----+----4----+----5
// JOKE
//--+----1----+----2----+----3----+----4----+----5
    
app.get("/joke", function(req, res) { 
    res.send("Knock, knock...");
}); 
        
app.get("/ramdon_num", function(req, res) { 
    var num = Math.floor(Math.random() * 100) + 1;
    res.send("Your lucky number is: " + num);
}); 
            
app.get("/exit", function(req, res) { 
    res.send("Closing database connection."); 
    connection.end(); 
}); 
            
app.listen(3000, function () {
    console.log('App listening on port 3000.'); 
}); 

