import { get } from "../config/db.js";

const BASE_URL ='http://192.168.31.68/api/';

export async function getDataByType(type) {

    const url = `${BASE_URL}${type}`;

    try {
        // Fetch data from the API endpoint
        console.log('Fetching data from API...');
        const response = await fetch(url);
        if (!response.ok) throw new Error(`❌ API error: ${response.status} ${response.statusText}`);
        const data = await response.json();
        console.log(`Data fetched from API for type ${type}`, data);
       return data;
    } catch (error) {
        // Fetch data from lcal storage if the API call fails
        console.error('Error fetching data:', error);
        console.warn('⚠️ Fetch failed, using local data:', error.message);
        return get(type);
    }
}
