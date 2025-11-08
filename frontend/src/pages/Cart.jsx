import React, { useEffect, useState } from "react";
import Layout from "./../layout/Layout";
import CartCard from "../components/CartCard";
import { useAppStore } from "../../store/appStore";
import { useNavigate } from "react-router-dom";
import { PiSmileySadFill } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();
  const [showThankYou, setShowThankYou] = useState(false);
  const [orderDetails, setOrderDetails] = useState("");
  const { cart, getUserCart, user, removeCart } = useAppStore();
  
  const displaycart = cart?.map((itemes, id) => {
    return <CartCard item={itemes} key={id} />;
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    getUserCart();
  }, []);

  let initialValue = 0;
  let total = Math.ceil(
    cart?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      initialValue
    ) * 81
  );

  return (
    <Layout>
      <div className="flex min-h-screen w-full flex-col py-5 gap-5 md:flex-row lg:p-[60px] relative">
        {showThankYou ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="animate-bounce-slow bg-green-500 p-8 rounded-xl shadow-2xl text-center max-w-2xl mx-4 transform transition-all">
              <div className="flex flex-col items-center space-y-4">
                <FaCheckCircle className="text-white text-6xl mb-4" />
                <h2 className="text-4xl font-bold text-white mb-4 font-serif">Thank You for Ordering!</h2>
                <p className="text-white text-xl mb-6 font-light">
                  Your order containing:
                  <br />
                  <span className="font-medium italic">{orderDetails}</span>
                  <br />
                  is confirmed
                </p>
                <button 
                  onClick={() => {
                    setShowThankYou(false);
                    navigate('/');
                  }}
                  className="bg-white text-green-500 px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full text-slate-600 md:w-[70%] shadow-md border-[1px] bg-white p-2 rounded-lg">
              <div className="my-[40px] flex flex-col rounded-[4px] bg-slate-100 md:p-[15px]">
                <h2 className="text-[18px] font-[700]">Your Cart</h2>
                <h3>Total Items: {cart?.length}</h3>
              </div>
              <div className="flex flex-col gap-3 lg:ml-[120px]">{displaycart}</div>
              {!cart?.length && (
                <div className="flex flex-col justify-center items-center">
                  <p className="text-[24px] text-black font-bold">Cart is empty</p>
                  <br />
                  <PiSmileySadFill size={35} color="black" />
                </div>
              )}
            </div>
            {cart?.length ? (
              <div className="my-[40px] flex w-full flex-col md:w-[30%] md:p-[8px]">
                <div className="rounded-[4px] shadow-lg">
                  <div className="flex flex-col rounded-[4px] bg-slate-200 p-[15px]">
                    <h2 className="text-[18px] font-[700]">You Pay</h2>
                    <h3>Check Our order Policy</h3>
                  </div>
                  <div className="rounded-[4px] bg-slate-600 p-[15px] text-white">
                    You Can Pay .... on This Order
                  </div>
                  <div className="flex flex-col gap-[8px] rounded-[4px] bg-slate-50 p-[15px]">
                    <h2 className="border-b-[1px] py-[4px] text-[18px] font-[700]">
                      Total Price {"₹"} {total}
                    </h2>
                    <h3 className="border-b-[1px] py-[4px]">
                      Distributor Price -20
                    </h3>
                    <h3 className="border-b-[1px] py-[4px]">Discount 40</h3>
                    <button 
                      onClick={async () => {
                        const orderNames = cart.map(item => item.product.title).join(", ");
                        setOrderDetails(orderNames);
                        // Clear all items from cart
                        for (const item of cart) {
                          await removeCart(item.product.id);
                        }
                        setShowThankYou(true);
                      }}
                      className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </Layout>
  );
};

export default Cart;
