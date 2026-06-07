export default function OrderTable({
  orders
}) {

  return (
    <table>

      <thead>
        <tr>
          <th>Order Id</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>

        {
          orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>₹{order.amount}</td>
              <td>{order.paymentStatus}</td>
            </tr>
          ))
        }

      </tbody>

    </table>
  );
}