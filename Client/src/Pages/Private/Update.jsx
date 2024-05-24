import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/ContextComponent";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";


const Update = () => {
    const {user} = useContext(AuthContext)
    const product = useLoaderData()
    console.log("loader: ",product._id)
    const handleUpdate = (event) =>{
        event.preventDefault()
        const form = event.target;
    
        const image = form.image.value;
        const product_type = form.product_type.value;
        const size = form.size.value;
        const fabric = form.fabric.value;
        const color = form.color.value;
        const price = form.price.value;
        const occasion = form.occasion.value;
        const email = form.email.value;
        const user_name = form.user_name.value;
    
        const updatedProduct = {
            image,
            product_type,
            size,
            fabric,
            color,
            price,
            occasion,
            email,
            user_name
        };


        fetch(`http://localhost:5000/update/${product._id}`,{
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(updatedProduct)
        })
        .then(res=> res.json())
        .then(data =>{
            console.log(data)
            if(data.modifiedCount> 0){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "product Updated Successfully",
                    showConfirmButton: false,
                    timer: 2000
                  });
            }
        } 
    )



    }

    return (
        <div className=" bg-[#F4F3F0] p-10 sm:p-24">
    <Helmet>
        <title>Adventure Avenue | Update</title>
    </Helmet>
        <h2 className="text-3xl font-extrabold">Update The Product</h2>
        <form onSubmit={handleUpdate}>
            
            
        <div className='flex flex-col md:flex-row gap-8'>
            <div className='w-full'>
            {/* Image URL */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Image URL</span>
                    </label>
                    <label className="input-group">
                        <input defaultValue={product.image} type="text" name="image" placeholder="Image URL" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* Product Type */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Product type</span>
                    </label>
                    <label className="input-group">
                        <input defaultValue={product.product_type} required type="text" name="product_type" placeholder="Product type" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* Size */}
            {/* <div className="mb-8">
    <div className="form-control w-full">
        <label className="label">
            <span className="label-text">Country Name</span>
        </label>
        <select name="country_name" className="select select-bordered w-full" required defaultValue={product.country_name}>
            <option value="">Select Country</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Thailand">Thailand</option>
        </select>
    </div>
</div> */}





            {/* Size */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Size</span>
                    </label>
                    <label className="input-group">
                        <input defaultValue={product.size} type="text" name="size" placeholder="Size" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* color */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Color</span>
                    </label>
                    <label className="input-group">
                        <input defaultValue={product.color} type="text" name="color" placeholder="Color" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            </div>
            <div className='w-full'>
            {/* Fabric */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Fabric $</span>
                    </label>
                    <label className="input-group">
                        <input required defaultValue={product.fabric} type="text" name="fabric" placeholder="Fabric" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>


            {/* Occasion */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Occasion</span>
                    </label>
                    <label className="input-group">
                        <input defaultValue={product.occasion} type="text" name="occasion" placeholder="Occasion" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* Price */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <label className="input-group">
                        <input defaultValue={product.price} type="number" name="price" placeholder="Price" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            
            {/* User Email */}
             <div hidden className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">User Email</span>
                    </label>
                    <label className="input-group">
                        <input readOnly type="email" name="email" placeholder="User Email" defaultValue={user.email} className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* User Name */}
            <div hidden className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">User Name</span>
                    </label>
                    <label className="input-group">
                        <input readOnly type="text" defaultValue={user.displayName} name="user_name" placeholder="User Name" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            </div>    
        </div>


            {/* Update Button */}
            <input type="submit" value="Update" className="btn btn-block text-gray-700 bg-[#D4AF37]" />
        </form>
    </div>
    );
};

export default Update;