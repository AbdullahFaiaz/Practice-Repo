import { useEffect, useState } from "react";

import { Helmet } from "react-helmet-async";
import ProductCard from "../../Components/ProductCard";
import useAllProducts from "../../Hook/useAllProducts";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AllSpots = () => {
  const [count, setCount] = useState({});
  const [sortedBy, setSortedBy] = useState(null);
  const [allProducts] = useAllProducts()

  // all products
  // const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch("http://localhost:5000/allProducts");
    //     const data = await response.json();
    //     setAllProducts(data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    const fetchCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/allProducts/productCount"
        );
        const data = await response.json();
        setCount(data);
        console.log(data);
      } catch (error) {
        console.log("error count:", error);
      }
    };

    fetchCount();

    // fetchData();
  }, []);

  const handleSortChange = (e) => {
    setSortedBy(e.target.value);
  };

  const sortedProducts = sortedBy
    ? allProducts.slice().sort((a, b) => b[sortedBy] - a[sortedBy])
    : allProducts;

  return (
    <div className="">
      <h1 className="text-3xl">Count is {count.count}</h1>
      <ToastContainer></ToastContainer>
      <Helmet>
        <title>Adventure Avenue | All Tourists Spots</title>
      </Helmet>
      {/* anchor */}
      {/* <div id="spot-anchor" className="absolute right-0 bottom-[20%] size-4 bg-green-500"></div> */}
      <div className="flex justify-center my-4 text-[2vw] md:text-[1.3vw]">
        <label htmlFor="sort" className="mr-2 font-bold">
          Sort by:
        </label>
        <select
          id="sort"
          className="border p-1 rounded"
          value={sortedBy || ""}
          onChange={handleSortChange}
        >
          <option value="" disabled>
            Select sorting option
          </option>
          <option value="price">Average Cost</option>
          {/* Add more sorting options here if needed */}
        </select>
      </div>
      <div className="grid grid-cols-1 my-[2vw] lg:my-[3vw] md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllSpots;
