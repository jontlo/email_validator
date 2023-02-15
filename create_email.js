// create_email.js

/*  
    Citation for create_email.js
    Date Last Modified: 15 February 2023
    Adapted from: nodejs-starter-app
    Source URLs: 
    https://github.com/osu-cs340-ecampus/nodejs-starter-app accessed 30 January 2023
    https://www.w3schools.com/js/js_htmldom_nodes.asp accessed 15 February 2023
*/

// Get the email form, and div on which to append error message
let inputEmailForm = document.getElementById('sign-up-form');
let errorMessage = document.getElementById('message-div');

// Listener for submit button
inputEmailForm.addEventListener("submit", function(e) 
{
    e.preventDefault();

    // Clear existing error message if displayed
    const messageNode = document.getElementById("error-message");
    if (messageNode){
        errorMessage.removeChild(document.getElementById("error-message"));
    };

    // Get form fields 
    let emailAddress = document.getElementById("input-email");

    // Get values from form fields
    let emailValue = emailAddress.value;

    // Put data to send in a javascript object
    let data = {
        email: emailValue,
    };

    // Setup request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:8100/sign-up", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            // Display response message
            appendMessage(xhttp.response);

            // Clear the input fields
            emailAddress.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200)
        {
            // Print an error if input was invalid
            appendMessage(xhttp.response);
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// Display the success or error message to the user
appendMessage = (data) => {
    parsedData = JSON.parse(data)
    const para = document.createElement("p");
    para.setAttribute("id", "error-message");
    const node = document.createTextNode(parsedData.message);
    para.appendChild(node);

    const element = document.getElementById("message-div");
    element.appendChild(para);
}