import { useLoaderData } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ViewDetails = () => {

    const product = useLoaderData();
    const {image,product_type,size,fabric,color,price,occasion,email,user_name,_id} = product
console.log(product)

return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-green-400 to-purple-500">
      <h1 className="text-white text-3xl font-bold">Gradient Background</h1>
    </div> */}
    <Helmet>
        <title>Adventure Avenue | View Details</title>
    </Helmet>
<ToastContainer/>
            <div className=" flex flex-col gap-4">
                <img src={image} alt={product_type} className="w-full h-auto rounded-lg" />
                <div>
                    <h1 className="text-2xl font-semibold">{product_type}</h1>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Details:</h2>
                    <ul className="list-disc pl-6">
                        <li><strong>Color:</strong> {color}</li>
                        <li><strong>Size:</strong> {size}</li>
                        <li><strong>Fabric:</strong> ${fabric}</li>
                        <li><strong>Occasion:</strong> {occasion}</li>
                        <li><strong>Price:</strong> {price}</li>
                        <li><strong>Seller:</strong> {user_name} ({email})</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;
