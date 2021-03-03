//Here we will write functions to call the API. 
//We will be using fetch and async functions. 

const API_URL = "http://localhost:8080";


//we can export this function by simply putting export at the beginning of the function. async allows us to call this function at any time
export async function listLogEntries() {
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json(); 
}