//Here we will write functions to call the API. 
//We will be using fetch and async functions. 

//const API_URL = "http://localhost:8080";
const API_URL2 = "https://secure-falls-24524.herokuapp.com";


//we can export this function by simply putting export at the beginning of the function. async allows us to call this function at any time
export async function listLogEntries() {
    const response = await fetch(`${API_URL2}/api/logs`);
    return response.json(); 
}

//This will be to create a LogEntry on our LogEntry Component. We will need to make a POST request.
export async function createLogEntry(entry) {
    const response = await fetch (`${API_URL2}/api/logs`, {  
        method: 'POST', 
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(entry)
    });
    return response.json();
}