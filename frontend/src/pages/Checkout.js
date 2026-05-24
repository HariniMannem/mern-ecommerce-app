import axios from "axios";
function Checkout({ cartItems }) {
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );
  const placeOrder = async () => {
  try {
    await axios.post("http://localhost:4000/api/orders", {
      items: cartItems,
      totalPrice
    });

    alert("Order placed successfully");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Checkout</h1>

      {cartItems.length === 0 ? (
        <p>No items to checkout</p>
      ) : (
        <>
          <h2>Order Summary</h2>

          {cartItems.map((item, index) => (
            <div key={index}>
              <p>
                {item.name} × {item.quantity} = ₹
                {Number(item.price) * item.quantity}
              </p>
            </div>
          ))}

          <h2>Total: ₹{totalPrice}</h2>

          <button onClick={placeOrder}>
  Place Order
</button>
        </>
      )}
    </div>
  );
}

export default Checkout;