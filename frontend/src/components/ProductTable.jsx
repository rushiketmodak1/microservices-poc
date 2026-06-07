export default function ProductTable({
  products
}) {

  return (
    <table>

      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>

        {
          products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
            </tr>
          ))
        }

      </tbody>

    </table>
  );
}