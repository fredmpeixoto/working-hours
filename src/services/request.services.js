import axios from "axios";

const headers = { headers: { 'Content-Type': 'application/json' } };

export default class RequestService {
    constructor() {
        axios.create({
            responseType: 'json'
        })
        axios.defaults.baseURL = 'http://localhost:3001/';
        axios.defaults.headers = headers;
    }

    async getAllData() {
        return await axios.get("users");
    }

    async getDataByUser(userId) {
        return await axios.get(`users/${userId}`);
    }

    updateWorkTime(userId, data) {
        return axios.patch(`users/${userId}`, data);
    }



}