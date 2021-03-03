//Here we will write functions to call the API. 
//We will be using fetch and async functions. 

const API_URL = "http://localhost:8080";

async function listLogEntries() {
    const response = await fetch(`{API_URL}/api/logs`);
    
}