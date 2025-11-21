import axios from 'axios';

const SERVER_URL = "http://51.20.128.12/api";

const registerUser = (data) => {
  return axios.post(`${SERVER_URL}/register`, data);
};

const loginUser = (data) => {
  return axios.post(`${SERVER_URL}/login`, data);
};

const authServices = {
  registerUser,
  loginUser
};

export default authServices;
