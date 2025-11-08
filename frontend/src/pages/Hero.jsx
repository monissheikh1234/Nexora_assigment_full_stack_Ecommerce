import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Hero = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios(
        "https://ecommerce-backend-new.vercel.app/api/products"
      );
      // Limit to first 10 products
      setProducts(data.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <section className="flex justify-center py-10">
        <div className="grid grid-cols-1 gap-x-32 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-sm:grid-cols-5 px-12 mx-auto max-w-[2000px]">
          {products?.map((item, id) => (
            <ProductCard item={item} key={id} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Hero;
