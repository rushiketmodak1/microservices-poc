import { useState } from "react";
import OrderTable from "./OrderTable";

export default function OrderSection({
  users,
  products,
  orders,
  createOrder
}) {

  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");

  const submit = async () => {

    await createOrder({
      userId,
      productId
    });

    setUserId("");
    setProductId("");
  };

  return (
    <div className="card">

      <h2>Create Order</h2>

      <select
        value={userId}
        onChange={(e) =>
          setUserId(e.target.value)
        }
      >
        <option value="">
          Select User
        </option>

        {
          users.map(user => (
            <option
              key={user._id}
              value={user._id}
            >
              {user.name}
            </option>
          ))
        }
      </select>

      <select
        value={productId}
        onChange={(e) =>
          setProductId(e.target.value)
        }
      >
        <option value="">
          Select Product
        </option>

        {
          products.map(product => (
            <option
              key={product._id}
              value={product._id}
            >
              {product.name}
            </option>
          ))
        }
      </select>

      <button onClick={submit}>
        Create Order
      </button>

      <OrderTable orders={orders}/>
    </div>
  );
}