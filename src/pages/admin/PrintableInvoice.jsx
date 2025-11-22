import React from "react";

const PrintableInvoice = React.forwardRef(({ order }, ref) => {
  if (!order) return null;

  const {
    transactionId,
    buyer,
    buyeraddress,
    buyerphone,
    products,
    totalAmount,
    createdAt,
    paymentStatus,
    status,
  } = order;

  return (
    <div
      ref={ref}
      className="bg-white text-black p-10 shadow-2xl rounded-2xl border-4 border-blue-700"
      style={{
        width: "850px",
        fontFamily: "Inter, sans-serif",
        lineHeight: "1.7",
      }}
    >
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <header className="pb-6 border-b border-gray-300 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-wide text-blue-700">
            Taskeena
          </h1>
          <p className="text-sm text-gray-600 mt-1">Premium Online Store</p>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-gray-900">
            Invoice #{transactionId}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Date: {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </header>

      {/* Sections Container */}
      <section className="grid grid-cols-2 gap-6 py-8">
        {/* Billing Details */}
        <div className="p-5 rounded-xl bg-white border-2 border-blue-500 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-3 text-lg border-b pb-2">
            Billing Details
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Name:</span> {buyer?.name}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {buyerphone}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {buyeraddress}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-5 rounded-xl bg-white border-2 border-blue-500 shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-3 text-lg border-b pb-2">
            Order Summary
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Payment Status:</span>{" "}
              <span
                className={`font-semibold ${
                  paymentStatus === "Paid"
                    ? "text-green-600"
                    : paymentStatus === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {paymentStatus}
              </span>
            </p>

            <p>
              <span className="font-semibold">Order Status:</span>{" "}
              <span className="font-semibold text-blue-700">{status}</span>
            </p>

            <p className="font-semibold text-xl mt-4 text-gray-900">
              Total: Rs. {Number(totalAmount).toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* Product Table Section */}
      <section className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
          Purchased Items
        </h3>

        <table className="w-full text-sm table-auto border-collapse rounded-xl overflow-hidden shadow-2xl border-2 border-blue-700">
          <thead>
            <tr className="bg-blue-200 border-b-4 border-blue-700 text-gray-900">
              <th className="text-left py-3 px-3 font-semibold">Product</th>
              <th className="text-center py-3 px-3 font-semibold">Qty</th>
              <th className="text-right py-3 px-3 font-semibold">Price</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="py-3 px-3 font-medium text-gray-800 break-words">
                  {p.name}
                </td>
                <td className="py-3 px-3 text-center font-bold text-gray-700">
                  {p.quantity}
                </td>
                <td className="py-3 px-3 text-right font-semibold text-gray-900">
                  Rs. {p.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Calculation */}
        <div className="mt-8 flex justify-end">
          <div className="w-1/3 text-sm bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between py-1 text-gray-700">
              <span>Subtotal</span>
              <span>Rs. {Number(totalAmount).toLocaleString()}</span>
            </div>

            <div className="flex justify-between border-t border-gray-300 pt-3 font-semibold text-gray-900 text-base">
              <span>Total</span>
              <span>Rs. {Number(totalAmount).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-xs text-gray-500 text-center border-t pt-4 space-y-1">
        <p>Thank you for shopping with Taskeena.</p>
        <p>If you have any questions, feel free to contact us:</p>
        <p>
          <span className="font-semibold">Phone:</span> 03256795256
        </p>
        <p>
          <span className="font-semibold">Email:</span> taskeenaonline@gmail.com
        </p>
      </footer>
    </div>
  );
});

export default PrintableInvoice;
