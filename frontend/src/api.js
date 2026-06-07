import axios from "axios";

const API_URL = "http://localhost:8000";

export const getUsers = () =>
  axios.get(`${API_URL}/users`);

export const createUser = (data) =>
  axios.post(`${API_URL}/users`, data);

export const getProducts = () =>
  axios.get(`${API_URL}/products`);

export const createProduct = (data) =>
  axios.post(`${API_URL}/products`, data);

export const getOrders = () =>
  axios.get(`${API_URL}/orders`);

export const createOrder = (data) =>
  axios.post(`${API_URL}/orders`, data);

export const getPayments = () =>
  axios.get(`${API_URL}/payments`);