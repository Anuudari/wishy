import axios from "axios";

const instance = axios.create({
  baseURL: "http://26.197.229.12:8000/",
  timeout: 1000,
});
export const login = async ({ phone, password }) => {
  return instance.post("login", {
    phonenumber: phone,
    password: password,
  });
};
