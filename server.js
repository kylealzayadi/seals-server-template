
require("dotenv").load();

var express = require('express');
var bodyParser = require('body-parser');
var middleWare = require('./_middleware/hash');
var cors = require('cors');
var mongoose = require('mongoose');

var app = new express();


mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });

var journalSchema = new mongoose.Schema({
    title: String,
    content: String,
});
var Journal = mongoose.model('Journal', journalSchema);




app.use(cors())


app.use(bodyParser.json());

app.get('', function (req, res) {
    res.send('ok');
})

app.get('/chicken', function (req, res) {

    var journal = [
        {
            title: "Rob said Tucux fell down the stairs.",
            content:
                'Today, Tucux fell down the stairs. I felt very sad. This is because Tucux goes to my school and I went to SCLA with him',
        },
        {
            title:
                'Second Journal Entry',
            content:
                'Second Journal entry is about...the struggle that was once pushing form values to array',
        }
    ]
   
    Journal.find(function(err, docs) {
        res.send(docs);
    })

})
app.post('/beef', function (req, res) {
    var data = req.body;

    var new_journal = new Journal(data);

    console.log('hi')
    new_journal.save(function (err, data) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(data)
        }
    })

    console.log(new_journal)
    
})


app.post('/getJournal', function(req, res) {
    var id = req.body.id

    Journal.findById(id, function (err, result) {
        if(err){
            res.status(500).send(err);
        }else{
            res.send(result);
        }
    });

})

var port = 3000;
app.listen(port, function () {
    console.log('listening on port', port);
})