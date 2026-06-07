import PaymentTable from "./PaymentTable";

export default function PaymentSection({
  payments
}) {

  return (
    <div className="card">

      <h2>Payments</h2>

      <PaymentTable
        payments={payments}
      />

    </div>
  );
}