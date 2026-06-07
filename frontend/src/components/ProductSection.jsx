import { useState } from "react";
import ProductTable from "./ProductTable";

export default function ProductSection({
  products,
  createProduct
}) {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const submit = async () => {

    await createProduct({
      name,
      price: Number(price)
    });

    setName("");
    setPrice("");
  };

  return (
    <div className="card">

      <h2>Products</h2>

      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
      />

      <button onClick={submit}>
        Create Product
      </button>

      <ProductTable
        products={products}
      />

    </div>
  );
}