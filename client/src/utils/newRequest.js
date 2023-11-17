import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:5000/²",
  withCredentials: true,
});

export default newRequest;