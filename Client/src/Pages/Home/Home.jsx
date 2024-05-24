import { CountriesSection } from './CountriesSection';
import { About } from './About';
import {  useEffect, useState } from "react";

import BannerSlider from "../../Components/BannerSlider";
import coolThree from "../../assets/cool-3.png"
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from '../../Hook/useAxiosPublic';




// ..
AOS.init();




const Home = () => {
  const navigate = useNavigate()
const [itemsPerPage, setItemsPerPage] = useState(2)
const [currentPage, setCurrentPage] = useState(0)  
const {count} = useLoaderData()
// console.log("Total Count",count)
  const axiosPublic = useAxiosPublic()
  // all products
  // const [productLength,setProductLength] = useState(0)
  const [allProducts, setAllProducts] = useState([]);
  // const url = "https://volunteer-hub-beryl.vercel.app/products"
  
  
  
 


  const numberOfPages = Math.ceil(count / itemsPerPage);
// console.log(numberOfPages)
  // const pages = []
  // for(let i=0; i<numberOfPages; i++){
  //   pages.push(i)
  // }
// console.log("number of" ,numberOfPages)
const pages = [...Array(numberOfPages).keys()]
  // console.log("pages",pages)
  

  const handleItemsChange= e => {
    const val = parseInt(e.target.value) 
    // console.log("val", val)
    
    setItemsPerPage(val)
    setCurrentPage(0)
  }
  const handlePrevPage = () =>{
    if(currentPage>0){
      setCurrentPage(currentPage-1)
    }
  }
  const handleNextPage = () =>{
    if(currentPage < pages.length-1){
      setCurrentPage(currentPage+1)
    }
  }

  useEffect(() => {

    // .then(res=> {
    //   setProductLength(res.data.total)
    //   console.log(res.data.total)
    // })  

    // axios.get(url, {withCredentials: true})
    axiosPublic.get(`/products?page=${currentPage}&size=${itemsPerPage}`)
    .then(res => {
      setAllProducts(res.data)
      // console.log(res.data)
      
    })
  }, [axiosPublic,currentPage,itemsPerPage,count]);  
  // pagination ends




const testing = () => {


  navigate("/two/allProducts")
  toast('Show after 1sec', { delay: 1000 });
  setTimeout(() => {
    toast.success("Show after navigation", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, 1000);

}

    return (
        <>
    <Helmet>
        <title>Volunteer Hub | Home</title>
    </Helmet>
                    

<ToastContainer></ToastContainer>







<div className="relative">
<BannerSlider></BannerSlider>
</div>


<button onClick={testing} className='bg-green-600 rounded-lg hover:bg-green-700 text-black font-extrabold p-10 border'>Testing</button>



<CountriesSection   coolThree={coolThree} allProducts={allProducts} handlePrevPage={handlePrevPage} pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} handleNextPage={handleNextPage} itemsPerPage={itemsPerPage} handleItemsChange={handleItemsChange}  />




<About/>






</>
    );
};

export default Home;