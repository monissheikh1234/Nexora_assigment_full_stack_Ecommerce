import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import { HiPlus, HiMinus } from "react-icons/hi";

const ProductCard = ({ item }) => {
  const { addCart } = useAppStore();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [showQuantity, setShowQuantity] = useState(false);

  const productName = (name) => {
    if (name.length > 20) {
      return name.substring(0, 20) + "...";
    }
    return name;
  };

  const handleAddToCart = () => {
    if (!showQuantity) {
      setQuantity(1);
      setShowQuantity(true);
      addCart(item, navigate);
    }
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
    addCart(item, navigate);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
      if (quantity === 1) {
        setShowQuantity(false);
      }
    }
  };
  return (
    <div className="flex items-center bg-[#E6F3FF]  flex-col justify-between p-[20px] shadow-lg sm:shadow-xl rounded-[8px] min-h-[200px] w-[300px] hover:shadow-2xl transition-shadow duration-300 border border-[#B8E2FF] gap-[4px]">
      <div className="py-[16px] flex flex-col gap-[12px]">
        <h2
          className="cursor-pointer text-[18px] font-medium text-[#2C5282]"
          onClick={() => navigate(`/product/${item.id}`)}
        >
          {productName(item.title)}
        </h2>
        <h2 className="text-center text-[20px] font-bold text-[#2C5282]">
          {"₹  "}
          <span className="text-[#3182CE]">{Math.ceil(item.price * 81)}</span>
        </h2>
      </div>
      <div className="w-full mt-4">
        {!showQuantity ? (
          <button
            onClick={handleAddToCart}
            className="w-full rounded-[6px] bg-[#4299E1] text-white hover:bg-[#2B6CB0] transition-colors duration-300 py-[8px] text-[16px] font-medium"
          >
            Add To Cart
          </button>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleDecrement}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4299E1] text-white hover:bg-[#2B6CB0] transition-colors duration-300"
            >
              <HiMinus size={20} />
            </button>
            <span className="text-[20px] font-semibold text-[#2C5282] min-w-[30px] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#4299E1] text-white hover:bg-[#2B6CB0] transition-colors duration-300"
            >
              <HiPlus size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
