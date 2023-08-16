// FETCH API

// Try all the following by copy-pasting them in browser's (firefox) console.
// The following url will be used to get html responses: "https://httpbin.org/"
// Note: fetch() returns a promise. It rejects only with network errors and not with http errors like 404.
// Therefore we need to check for html response code before we act on the response data.

fetch("https://httpbin.org/uuid")
.then(response => response.json())
.then(data => console.log(data));



// Handling HTTP errors

fetch("https://httpbin.org/404")
.then(function(response) {
    console.log(response)
    if (!response.ok) {
        console.log("Response not okay");
        // we can throw an error
        throw new Error('HTTP error, status = ' + response.status);
    }
    return response.json();
    })
    .then(function(data) {
        console.log('Got data', data);
    })
    .catch(function(error) {
        //we can catch and do something
        console.log("In catch", error);
    })



// Handling network errors  

fetch("httpsxxx://httpbin.org/404") // Completely messed up url to get network error  
.then(function(response) {
    console.log(response)
    if (!response.ok) {
        console.log("Response not okay");
        // we can throw an error
        throw new Error('HTTP error, status = ' + response.status);
    }
    return response.json();
    })
    .then(function(data) {
        console.log('Got data', data);
    })
    .catch(function(error) {
        //we can catch and do something
        console.log("In catch", error);
    })



// Sending json data with fetch

data = { "name": "Ganesh", "city": "Bengaluru"};

fetch("https://httpbin.org/post", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
.then(response => response.json())  // Ideally we should check response status and then only handle the data received.
.then(data => {
    console.log('Success:', data);
})
.catch((error) => {
    console.error("Error:", error);
})



// Form submission using fetch()
// my_form.html is the html file necessary for this code  
// Not working even on browser

form = new FormData(document.getElementById('my-form'));

fetch('https://httpbin.org/post', {
    method: 'POST',
    body: FormData
});


// Uploading files using fetch()
// my_file.html is the html file necessary for this code 
// Not working even on browser

formData = new FormData(document.getElementById('my-form'));

fetch('https://httpbin.org/put', {
    method: 'PUT',
    body: formData
})
.then(response => response.json())
.then(result => {
    console.log("Success:", result);
})
.catch(error => {
    console.log('Error:', error);
});



// Downloading file using fetch()

fetch("https://httpbin.org/image/jpeg")
.then((response) => {
    console.log('Got it')
    return response.blob();
}).then((myBlob) => {
    console.log(myBlob)
}).catch(error => {
    console.log('Error: ', + error.messsage);
})



// Send a request object which has headers
myHeaders = new Headers();
myHeaders = {'Content-Type': 'application/json'}

const myRequest = new Request("https://httpbin.org/post", {
    method: 'post',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
});


// Await in fetch()

response = await fetch("https://httpbin.org/uuid");
data = await response.json()
console.log(data)