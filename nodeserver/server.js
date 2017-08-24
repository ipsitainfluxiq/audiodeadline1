/**
 * Created by debasis on 14/9/16.
 */
var express = require('express');
var app = express();
var port = process.env.PORT || 3007;
var request = require('request');
var cheerio = require('cheerio');
var mailer = require("nodemailer");
var http = require('http').Server(app);
var bodyParser = require('body-parser');
app.use(bodyParser.json({ parameterLimit: 10000000,
    limit: '90mb'}));
app.use(bodyParser.urlencoded({ parameterLimit: 10000000,
    limit: '90mb', extended: false}));
var datetimestamp='';
var filename='';
var EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter()
//emitter.setMaxListeners(100)
emitter.setMaxListeners(0)
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var mongodb = require('mongodb');
var db;
var url = 'mongodb://localhost:27017/audiodeadline';
var MongoClient = mongodb.MongoClient;
MongoClient.connect(url, function (err, database) {
    if (err) {
        console.log(err);

    }else{
        db=database;
console.log("connected");
    }});

app.get('/testing', function (req, resp) {
    console.log("hi");
    resp.send("success");
});

/*app.post('/signup',function(req,resp){
    console.log("Hell");
    var collection = db.collection('user');
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    collection.insert([{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
        password: hash,
        address: req.body.address,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        rsvp: req.body.rsvp,
        signupaffiliate: req.body.signupaffiliate,
        //added_time: Math.floor(Date.now() / 1000),
    }], function (err, result) {
        console.log("???????");
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'failed'}));
        } else {
            console.log("else part");
            console.log(req.body.email);
            var smtpTransport = mailer.createTransport("SMTP", {
                service: "Gmail",
                auth: {
                    user: "itplcc40@gmail.com",
                    pass: "DevelP7@"
                }
            });

            //var link=mzsadielink+'emailverify/'+result.ops[0]._id;
           // var link='http://localhost:4200/#/emailverify/'+result.ops[0]._id;
            var name=req.body.firstname+' '+req.body.lastname;
            var email=req.body.email;
           // var pass=req.body.password;
            var loginlink='http://'+req.body.username+'.audiodeadline.com/#/login';
            var mail = {
                from: "Admin <itplcc40@gmail.com>",
                to: req.body.email,
                //to: 'ipsita.influxiq@gmail.com',
                subject: 'Welcome to Audiodeadline.com',

                html: '<p>Hello,</p>'+'<p>Thank you for your interest in Audiodeadline.com. On behalf of our team and management, we would like you to know we are excited that you’re on board with us!</p>'+'<P>Below is your  login information. </p>'+'<p>Your Login Url:'+loginlink+'<p>User Name: '+email+'</p>'+'<p>Password: Password you put on time of registration (Hidden due to security) </p>'+'<P>We look forward to working closely with you. </P>'
            }
            smtpTransport.sendMail(mail, function (error, response) {
                // resp.send((response.message));
                console.log('send');
                smtpTransport.close();
            });
            //console.log(result);
            resp.send(JSON.stringify({'status':'success'}));
        }
    });

});*/

/*app.post('/signup',function(req,resp){

    var collection = db.collection('user');
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');

    collection.find({email:req.body.email}).toArray(function(err,items){
        if(items.length==0){
            collection.insert([{
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone,
                email: req.body.email,
                username: req.body.username,
                password: hash,
                address: req.body.address,
                address2: req.body.address2,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                rsvp: req.body.rsvp,
                signupaffiliate: req.body.signupaffiliate,
                //added_time: Math.floor(Date.now() / 1000),
            }], function (err, result) {
                console.log("???????");
                if (err) {
                    console.log('error'+err);
                    resp.send(JSON.stringify({'status':'failed'}));
                } else {
                    console.log("else part");
                    console.log(req.body.email);
                    var smtpTransport = mailer.createTransport("SMTP", {
                        service: "Gmail",
                        auth: {
                            user: "itplcc40@gmail.com",
                            pass: "DevelP7@"
                        }
                    });
                    //var link=mzsadielink+'emailverify/'+result.ops[0]._id;
                    // var link='http://localhost:4200/#/emailverify/'+result.ops[0]._id;
                    var name=req.body.firstname+' '+req.body.lastname;
                    var email=req.body.email;
                    // var pass=req.body.password;
                    var loginlink='http://'+req.body.username+'.audiodeadline.com/#/login';
                    var mail = {
                        from: "Admin <itplcc40@gmail.com>",
                        to: req.body.email,
                        //to: 'ipsita.influxiq@gmail.com',
                        subject: 'Welcome to Audiodeadline.com',

                        html: '<p>Hello,</p>'+'<p>Thank you for your interest in Audiodeadline.com. On behalf of our team and management, we would like you to know we are excited that you’re on board with us!</p>'+'<P>Below is your  login information. </p>'+'<p>Your Login Url:'+loginlink+'<p>User Name: '+email+'</p>'+'<p>Password: Password you put on time of registration (Hidden due to security) </p>'+'<P>We look forward to working closely with you. </P>'
                    }
                    smtpTransport.sendMail(mail, function (error, response) {
                        // resp.send((response.message));
                        console.log('send');
                        smtpTransport.close();
                    });
                    //console.log(result);
                    resp.send(JSON.stringify({'status':'success'}));
                }
            });
        }
        if(items.length>0){
            resp.send(JSON.stringify({'status':'error','msg':'Emailid already exist..!'}));
            return;
        }
    });

});*/

app.post('/signup',function(req,resp){
console.log(req.body.parent);
    var collection = db.collection('user');
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');

    collection.find({email:req.body.email}).toArray(function(err,items){
        if(items.length==0) {
             collection.find({username: req.body.username}).toArray(function(err,items){
             if(items.length==0){
             collection.insert([{
             firstname: req.body.firstname,
             lastname: req.body.lastname,
             phone: req.body.phone,
             email: req.body.email,
             username: req.body.username,
             password: hash,
             address: req.body.address,
             address2: req.body.address2,
             city: req.body.city,
             state: req.body.state,
             zip: req.body.zip,
             rsvp: req.body.rsvp,
             signupaffiliate: req.body.signupaffiliate,
             parent: req.body.parent
             //added_time: Math.floor(Date.now() / 1000),
             }], function (err, result) {
             console.log("???????");
             if (err) {
             console.log('error'+err);
             resp.send(JSON.stringify({'status':'failed'}));
             } else {
             console.log("else part");
             console.log(req.body.email);
             var smtpTransport = mailer.createTransport("SMTP", {
             service: "Gmail",
             auth: {
             user: "itplcc40@gmail.com",
             pass: "DevelP7@"
             }
             });

             var name=req.body.firstname+' '+req.body.lastname;
             var email=req.body.email;
             // var pass=req.body.password;
             var loginlink='http://'+req.body.username+'.audiodeadline.com/#/login';
             var mail = {
             from: "Admin <itplcc40@gmail.com>",
             to: req.body.email,

             subject: 'Welcome to Audiodeadline.com',

             html: '<p>Hello,</p>'+'<p>Thank you for your interest in Audiodeadline.com. On behalf of our team and management, we would like you to know we are excited that you’re on board with us!</p>'+'<P>Below is your  login information. </p>'+'<p>Your Login Url:'+loginlink+'<p>User Name: '+email+'</p>'+'<p>Password: Password you put on time of registration (Hidden due to security) </p>'+'<P>We look forward to working closely with you. </P>'
             }
             smtpTransport.sendMail(mail, function (error, response) {
             console.log('send');
             smtpTransport.close();
             });
             resp.send(JSON.stringify({'status':'success'}));
             }
             });
             }

             if(items.length>0){
             resp.send(JSON.stringify({'status':'error','msg':'Username already exist..!'}));
             return;
             }
             });
        }
        if(items.length>0){
            resp.send(JSON.stringify({'status':'error','msg':'Email id already exist..!'}));
            return;
        }
});
});


app.post('/contactus',function(req,resp){
    console.log("contactus");
    var collection = db.collection('contactus');
    collection.insert([{
        fullname: req.body.fullname,
        email: req.body.email,
        phoneno: req.body.phoneno,
        message: req.body.message,
        //added_time: Math.floor(Date.now() / 1000),
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'failed'}));
        } else {
            console.log(result);
            resp.send(JSON.stringify({'status':'success'}));
        }
    });

});

app.post('/userlogin', function (req, resp) {
    console.log("inside login");
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    var collection = db.collection('user');
    collection.find({ email:req.body.email }).toArray(function(err, items){
       // console.log("password from datatbase--> "+items[0].password);
        if(items.length==0){
            resp.send(JSON.stringify({'status':'error','msg':'Username invalid...'}));
            return;
        }
        if(items.length>0 && items[0].password!=hash){
            resp.send(JSON.stringify({'status':'error','msg':'Password Doesnot match'}));
            return;
        }
        if(items.length>0 && items[0].password==hash){
            /*      var collection = db.collection('login');
                collection.insert([{
                    emailid: req.body.email,
                    //time: Math.floor(Date.now() / 1000),
                }], function (err2, result2) {
                });*/
            console.log("matched password");
            resp.send(JSON.stringify({'status':'success','msg':items[0]}));
            return;
        }
    });
});


app.post('/allemail',function(req,resp){
    console.log("allemail details");
    var collection= db.collection('user');
    var email=req.body.email;
    console.log(email);
    //console.log(this.dataform.value.email);
    collection.find({email: email}).toArray(function(err, items){
        if(items.length==0){
            console.log("o");
            resp.send(JSON.stringify({'res':[]}));
        }
        if(items.length>0){
            console.log("has");
            //resp.send(JSON.stringify({'res':items.length}));
            resp.send(JSON.stringify({'res':items}));
        }
        });
});

app.get('/emaildetails',function(req,resp){
    console.log("??");
    var collection= db.collection('user');
    collection.find().toArray(function(err, items){
            resp.send(JSON.stringify(items));

        });
});

app.post('/dashboard',function(req,resp){
    var resitem = {};
    var collection = db.collection('user');
    var o_id = new mongodb.ObjectID(req.body._id);
    collection.find({_id:o_id}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
    // resp.send(JSON.stringify({'status':'error','id':0}));

});


app.post('/kendrick',function(req,resp){
    console.log("Hell");
    var collection = db.collection('tickets');
    collection.insert([{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        zipcode: req.body.zipcode,
        terms: req.body.terms,
        source: 'kendrick',
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'failed'}));
        } else {
            console.log("else part");
            //console.log(result);
            resp.send(JSON.stringify({'status':'success'}));
        }
    });

});

app.post('/usher',function(req,resp){
    console.log("Hell");
    var collection = db.collection('tickets');
    collection.insert([{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        zipcode: req.body.zipcode,
        terms: req.body.terms,
        source: 'usher',
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'failed'}));
        } else {
            console.log("else part");
            //console.log(result);
            resp.send(JSON.stringify({'status':'success'}));
        }
    });

});

app.post('/sevynstreeter',function(req,resp){
    console.log("Hell");
    var collection = db.collection('tickets');
    collection.insert([{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        zipcode: req.body.zipcode,
        terms: req.body.terms,
        source: 'sevynstreeter',
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'status':'failed'}));
        } else {
            console.log("else partttt");
            //console.log(result);
            resp.send(JSON.stringify({'status':'success'}));
        }
    });

});


app.get('/getusastates',function (req,resp) {


    var usastates=[
        {
            "name": "Alabama",
            "abbreviation": "AL"
        },
        {
            "name": "Alaska",
            "abbreviation": "AK"
        },
        {
            "name": "American Samoa",
            "abbreviation": "AS"
        },
        {
            "name": "Arizona",
            "abbreviation": "AZ"
        },
        {
            "name": "Arkansas",
            "abbreviation": "AR"
        },
        {
            "name": "California",
            "abbreviation": "CA"
        },
        {
            "name": "Colorado",
            "abbreviation": "CO"
        },
        {
            "name": "Connecticut",
            "abbreviation": "CT"
        },
        {
            "name": "Delaware",
            "abbreviation": "DE"
        },
        {
            "name": "District Of Columbia",
            "abbreviation": "DC"
        },
        {
            "name": "Federated States Of Micronesia",
            "abbreviation": "FM"
        },
        {
            "name": "Florida",
            "abbreviation": "FL"
        },
        {
            "name": "Georgia",
            "abbreviation": "GA"
        },
        {
            "name": "Guam",
            "abbreviation": "GU"
        },
        {
            "name": "Hawaii",
            "abbreviation": "HI"
        },
        {
            "name": "Idaho",
            "abbreviation": "ID"
        },
        {
            "name": "Illinois",
            "abbreviation": "IL"
        },
        {
            "name": "Indiana",
            "abbreviation": "IN"
        },
        {
            "name": "Iowa",
            "abbreviation": "IA"
        },
        {
            "name": "Kansas",
            "abbreviation": "KS"
        },
        {
            "name": "Kentucky",
            "abbreviation": "KY"
        },
        {
            "name": "Louisiana",
            "abbreviation": "LA"
        },
        {
            "name": "Maine",
            "abbreviation": "ME"
        },
        {
            "name": "Marshall Islands",
            "abbreviation": "MH"
        },
        {
            "name": "Maryland",
            "abbreviation": "MD"
        },
        {
            "name": "Massachusetts",
            "abbreviation": "MA"
        },
        {
            "name": "Michigan",
            "abbreviation": "MI"
        },
        {
            "name": "Minnesota",
            "abbreviation": "MN"
        },
        {
            "name": "Mississippi",
            "abbreviation": "MS"
        },
        {
            "name": "Missouri",
            "abbreviation": "MO"
        },
        {
            "name": "Montana",
            "abbreviation": "MT"
        },
        {
            "name": "Nebraska",
            "abbreviation": "NE"
        },
        {
            "name": "Nevada",
            "abbreviation": "NV"
        },
        {
            "name": "New Hampshire",
            "abbreviation": "NH"
        },
        {
            "name": "New Jersey",
            "abbreviation": "NJ"
        },
        {
            "name": "New Mexico",
            "abbreviation": "NM"
        },
        {
            "name": "New York",
            "abbreviation": "NY"
        },
        {
            "name": "North Carolina",
            "abbreviation": "NC"
        },
        {
            "name": "North Dakota",
            "abbreviation": "ND"
        },
        {
            "name": "Northern Mariana Islands",
            "abbreviation": "MP"
        },
        {
            "name": "Ohio",
            "abbreviation": "OH"
        },
        {
            "name": "Oklahoma",
            "abbreviation": "OK"
        },
        {
            "name": "Oregon",
            "abbreviation": "OR"
        },
        {
            "name": "Palau",
            "abbreviation": "PW"
        },
        {
            "name": "Pennsylvania",
            "abbreviation": "PA"
        },
        {
            "name": "Puerto Rico",
            "abbreviation": "PR"
        },
        {
            "name": "Rhode Island",
            "abbreviation": "RI"
        },
        {
            "name": "South Carolina",
            "abbreviation": "SC"
        },
        {
            "name": "South Dakota",
            "abbreviation": "SD"
        },
        {
            "name": "Tennessee",
            "abbreviation": "TN"
        },
        {
            "name": "Texas",
            "abbreviation": "TX"
        },
        {
            "name": "Utah",
            "abbreviation": "UT"
        },
        {
            "name": "Vermont",
            "abbreviation": "VT"
        },
        {
            "name": "Virgin Islands",
            "abbreviation": "VI"
        },
        {
            "name": "Virginia",
            "abbreviation": "VA"
        },
        {
            "name": "Washington",
            "abbreviation": "WA"
        },
        {
            "name": "West Virginia",
            "abbreviation": "WV"
        },
        {
            "name": "Wisconsin",
            "abbreviation": "WI"
        },
        {
            "name": "Wyoming",
            "abbreviation": "WY"
        }
    ];

    resp.send(usastates);

});



var server = app.listen(port, function () {

    var host = server.address().address
    var port = server.address().port
})