var express = require('express');
var router = express.Router();
var app = express(); // define our app using express
var bodyParser = require("body-parser") // define our app using body-parser


// Set up Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/pahlawan';
mongoose.connect(mongoDB, {
    useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Logging
router.use((req, res, next) => {
    // do logging if there is something request
    console.log('Someone request something on your API.');
    next(); // make sure we go to the next routes and don't stop here
});


// Send welcome response from our api server
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome To Simple Api Pahlawan Nasional!' });
});

// Set require schema from pahlawan.js
var Pahlawan = require('./pahlawan.js');

// set router for our api
router.route('/pahlawan')

    // create a pahlawan model with method POST with url http://localhost:3000/api/pahlawan)
    .post((req, res) => {

        var pahlawan = new Pahlawan(); // create a new instance of the Pahlawan
        pahlawan.name = req.body.name; // set the pahlawan name (from input request)
        pahlawan.area = req.body.area;
        pahlawan.die = req.body.die;
        pahlawan.senjata = req.body.senjata;

        // save pahlawan and check errors
        pahlawan.save((err) => {
            if (err)
                res.send(err);

            res.json({ message: 'Pahlawan created!' });
        });

    })

    .get((req, res) => {
        Pahlawan.find((err, pahlawan) => {
            if (err)
                res.send(err);

            res.json(pahlawan);
        });
    });


// on routes with style url /pahlawan/:pahlawan_id
// ----------------------------------------------------
router.route('/pahlawan/:pahlawan_id')

    // get Pahlawan id with GET method http://localhost:8080/api/pahlawan/:pahlawan_id)
    .get((req, res) => {
        Pahlawan.findById(req.params.pahlawan_id, (err, pahlawan) => {
            if (err)
                res.send(err);
            res.json(pahlawan);
        });
    })

    .put((req, res) => {
        Pahlawan.findById(req.params.pahlawan_id, (err, pahlawan) => {

            if (err)
                res.send(err);

            pahlawan.name = req.body.name;
            pahlawan.save((err) => {
                if (err)
                    res.send(err);

                res.json({ message: 'Pahlawan updated!' });
            });

        });
    })

    // delete the pahlawan with id
    .delete((req, res) => {
        Pahlawan.remove({
            _id: req.params.pahlawan_id
        }, (err, pahlawan) => {
            if (err)
                res.send(err);

            res.json({ message: 'Pahlawan deleted' });
        });
    });


// Add function Access-Control-Allow-Origin
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})


// Styling Home Page Our RestApi for Documentation

/* GET home page. */
app.get('/', (req, res) => {
    res.render('pages/index');
});

// About page 
app.get('/about', (req, res) => {
    res.render('pages/about');
});

// Views directory for api use project_folder/views
app.set('view engine', 'ejs');

// specify view engine and also to use it you need to install like npm install --save ejs
app.set('view engine', 'ejs');

app.use('/api', router);


// Set port our api server. 
app.listen(3000, () => {
    console.log("our API running on localhost:3000")
})

module.exports = app; // for testing

// Not required code but i cannot delete it because feel love with this code. 
// const MongoClient = require("mongodb").MongoClient

// var db

// MongoClient.connect('mongodb://localhost:27017/pahlawanNasional', (err, database) => {
//   if (err) return console.log(err)
//   db = database
//   app.listen(process.env.PORT || 3000, () => {
//     console.log('listening on 3000')
//   })
// })


//const insert = require("./insert.js")

// var db
// const url = "mongodb://localhost:27017/pahlawanNasional"
// MongoClient.connect(url, (err, db) => {
//     console.log("Connected to mongodb server")
//     // insert(db)
//     db = database
//     var collection = db.collection('pahlawan');

//     // db.close()
// })



// Add bodyyParse.json for receive POST method from json
// app.use(bodyParser.json())

// let listPahlawan = db.getCollection("pahlawan")

// Add dummy data listPahlawan
// let listPahlawan = [

//     {
//         id: 1,
//         firstName: "Pangeran",
//         lastName: "Diponegoro",
//         die: 70,
//         area: "Yogyakarta",
//         senjata: "keris"
//     },
//     {
//         id: 2,
//         firstName: "Sultan",
//         lastName: "Hasanuddin",
//         die: "39",
//         area: "Makassar",        
//         senjata: "Badik"
//     },
//     {
//         id: 3,
//         firstName: "Tuanku",
//         lastName: "Imam Bonjol",
//         die: 92,
//         area: "Padang",
//         senjata: "Meriam"

//     },
//     {
//         id: 4,
//         firstName: "Jendral",
//         lastName: "Sudirman",
//         die: 34,
//         area: "Purbalingga",
//         senjata: "Senapan Api"
//     },
//     {
//         id: "5",
//         firstName: "Bung",
//         lastName: "Tomo",
//         die: 61,
//         area: "Surabaya",
//         senjata: "Bambu Runcing"
//     },
//     {
//         id: 6,
//         firstName: "Cut Nyak",
//         lastName: "Dhien",
//         die: 60,
//         area: "Aceh",
//         senjata: "rencong"
//     },
//     {
//         id: 7,
//         firstName: "Raden",
//         lastName: "Fatahillah",
//         die: "unknown",
//         area: "Jayakarta",
//         senjata: "meriam"
//     },
// ]


// function add pahlawan to listPahlawan
// const addPahlawanToList = (collection, item) => {
//   collection.push(item)
//   return collection // updated collection
// }

// function add pahlawan to listPahlawan
// app.post("/api/pahlawan", (req, res) => {
//   const newPahlawan = req.body
//   const newListPahlawan = addPahlawanToList(listPahlawan, newPahlawan) // store updated collection to new variable
//   listPahlawan = newListPahlawan // replace current collection with the new collection
//   res.send(listPahlawan) // send the updated collection
// })

// Send response ListpPahlawan from endpoint /api/pahlawan 
// app.get("/api/pahlawan", (req, res) => {
//   res.send(listPahlawan)
// })

// app.get('/api/pahlawan', (req, res) => {
//   var result = db.collection('pahlawan.firstName').find()
//   console.log(result)
//   res.send(result)
// })