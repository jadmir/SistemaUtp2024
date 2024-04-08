import axios from "axios";

console.log("pasando por aca");

const utpService = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export default utpService;
