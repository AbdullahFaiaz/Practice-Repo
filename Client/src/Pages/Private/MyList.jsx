

import { useContext, useEffect, useState } from "react";
import MyListTable from "../../Components/MyListTable";

import { Helmet } from "react-helmet-async";
import axios from "axios";
import { AuthContext } from "../../Context/ContextComponent";




const MyList = () => {



const [myProducts, setMyProducts] = useState([])
const {user} = useContext(AuthContext)
console.log("user from the my list: ",user?.email)
    useEffect(()=>{
        axios.get(`http://localhost:5000/myProducts?email=${user?.email}`)
        .then(data => {
            setMyProducts(data.data)
        })
    },[user?.email])



    return (
        <div className="">
                <Helmet>
        <title>Adventure Avenue | My List</title>
    </Helmet>
            <div className="overflow-x-auto bg-slate-200">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <span>
                    <th>Image</th>
                    <th>Product Type</th>
                    <th>Price</th>
                    </span>
                   <span>
                    <th></th>
                    <th></th>
                   </span>
                    
                </tr>
                </thead>
                {
                myProducts.map(product=> <MyListTable key={product._id} product={product}></MyListTable> )
                }
            </table>
            </div>

        </div>
    );
};

export default MyList;