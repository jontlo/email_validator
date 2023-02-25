// email_validdator.js
/*  
    Citation for email_validdator.js
    Date Last Modified: 15 February 2023
    Source URLs: 
    https://github.com/osu-cs340-ecampus/nodejs-starter-app accessed 30 January 2023
    https://stackoverflow.com/questions/52456065/how-to-format-and-validate-email-node-js accessed 14 February 2023
*/

// SETUP
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// Allow Cross Origin request
const cors = require('cors');
app.use(cors());

// Designate port to run application
PORT = 8100

app.listen(PORT, () => {
    console.log("Server started on localhost:8100")
})

// POST - ROUTE TO VALIDATE EMAIL ADDRESS ON /SIGN-UP
app.post('/sign-up', async function(req, res, next){   
    const email = req.body.email;;


        const valid = await isEmailValid(email);
    
        // Check validity and send back return_validity object
        if (valid.valid) return res.send(valid);
        
        // If invalid email address, still send success status alongside response object
        return res.status(200).send(valid);
});

// RegEx for acceptable characters
var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

// Email validator function for checks not covered by RegEx
async function isEmailValid(email) {

    // Create return object
    var return_validity = {
        valid: false,
        message: ''
    };

    // Check if email left blank
    if (!email){
        return_validity.valid = false;
        return_validity.message = "Error! Email field is blank. Try again."
        return return_validity;
    };

    // Check length of email
    if(email.length>254){
        return_validity.valid = false;
        return_validity.message = "Error! Email length is too long. Try again."
        return return_validity;
    };

    // Use email RegEx to check if characters are valid
    var valid = emailRegex.test(email);
    if(!valid){
        return_validity.valid = false;
        return_validity.message = "Error! Email has invalid characters. Try again."
        return return_validity;
    };

    // Check length of email username
    var parts = email.split("@");
    if(parts[0].length>64){
        return_validity.valid = false;
        return_validity.message = "Error! Email length is too long. Try again."
        return return_validity;
    };

    // Check length of domain parts
    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; })){
        return_validity.valid = false;
        return_validity.message = "Error! Email domain is invalid. Try again."
        return return_validity;
    };

    // Check email service provider
    var providers = ['gmail', 'yahoo', 'ymail', 'hotmail', 'outlook', 'aol', 'icloud']
    if (!providers.includes(domainParts[0])){
        return_validity.valid = false;
        return_validity.message = "Error! Email provider is not valid. Try again."
        return return_validity;
    };
    
    // Check domain extension
    var extensions = ['com', 'net', 'org', 'gov', 'co', 'edu', 'info']
    if (!extensions.includes(domainParts[1])){
        return_validity.valid = false;
        return_validity.message = "Error! Email domain extension is not valid. Try again."
        return return_validity;
    };

    // Successfully validated email address
    return_validity.valid = true;
    return_validity.message = "Success! Your email address was accepted.";
    return return_validity;
};
