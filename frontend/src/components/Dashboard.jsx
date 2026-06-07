import { useEffect, useState } from "react";

import {
  getUsers,
  createUser,
  getProducts,
  createProduct,
  getOrders,
  createOrder,
  getPayments
} from "../api";

import UserSection from "./UserSection";
import ProductSection from "./ProductSection";
import OrderSection from "./OrderSection";
import PaymentSection from "./PaymentSection";

export default function Dashboard() {

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);

  const loadAll = async () => {

    const [
      usersRes,
      productsRes,
      ordersRes,
      paymentsRes
    ] = await Promise.all([
      getUsers(),
      getProducts(),
      getOrders(),
      getPayments()
    ]);

    setUsers(usersRes.data);
    setProducts(productsRes.data);
    setOrders(ordersRes.data);
    setPayments(paymentsRes.data);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const addUser = async (data) => {
    await createUser(data);
    loadAll();
  };

  const addProduct = async (data) => {
    await createProduct(data);
    loadAll();
  };

  const addOrder = async (data) => {
    await createOrder(data);
    loadAll();
  };

  return (
    <div className="container">

      <h1 className="title">
        Microservices Demo Dashboard
      </h1>

      <div className="grid">

        <UserSection
          users={users}
          createUser={addUser}
        />

        <ProductSection
          products={products}
          createProduct={addProduct}
        />

        <OrderSection
          users={users}
          products={products}
          orders={orders}
          createOrder={addOrder}
        />

        <PaymentSection
          payments={payments}
        />

      </div>

    </div>
  );
}