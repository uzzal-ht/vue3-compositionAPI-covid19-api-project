import axios from "axios";

export const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com" 
});


export const clientCovid = axios.create({
    baseURL: "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1",
    headers: {
        'X-RapidAPI-Key': 'e35abd7675mshc50771c67460e26p1164ddjsn0c4763676b80',
        'X-RapidAPI-Host': 'covid-19-coronavirus-statistics.p.rapidapi.com'
    }
});