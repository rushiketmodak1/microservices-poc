export default function PaymentTable({
  payments
}) {

  return (
    <table>

      <thead>
        <tr>
          <th>Payment Id</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>

        {
          payments.map(payment => (
            <tr key={payment._id}>
              <td>{payment._id}</td>
              <td>₹{payment.amount}</td>
              <td>{payment.status}</td>
            </tr>
          ))
        }

      </tbody>

    </table>
  );
}