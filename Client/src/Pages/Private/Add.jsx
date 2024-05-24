import { useContext } from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../../Context/ContextComponent';
import coolbg from "../../assets/cool-3.png"
import { Helmet } from 'react-helmet-async';
import useMyProducts from '../../Hook/useMyProducts';

const Add = () => {
    const [,refetch] = useMyProducts()
    const {user} = useContext(AuthContext)

    const handleAddTouristsSpot = event => {
        event.preventDefault();

        const form = event.target;
        // "product_type": "Panjabi",
    // "size": "M",
    // "color": "Pink",
    // "fabric": "Chiffon",
    // "occasion": "Casual",
    // "image": "panjabi_pink_chiffon_casual.jpg"
        const image = form.image.value;
        const product_type = form.product_type.value;
        const size = form.size.value;
        const fabric = form.fabric.value;
        const color = form.color.value;
        const price = form.price.value;
        const occasion = form.occasion.value;
        const email = form.email.value;
        const user_name = form.user_name.value;
    
        const newProduct = {
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
    
        console.log(newProduct);
    
    
        
        fetch("http://localhost:5000/products",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        .then(res=> res.json())
        .then(data=> {
            console.log("from client",data)
            if(data.insertedId){
                refetch()
                Swal.fire({
                    title: 'Success!',
                    text: 'Tourist spot added successfully',
                    icon: 'success',
                    confirmButtonText: 'Okey'
                  })
            }
        })

    }



    return (
         
        <div style={{ backgroundImage: `url(${coolbg})` }} className="bg-cover bg-center p-10 sm:p-24">
    <Helmet>
        <title>Adventure Avenue | Add Tourists Spot</title>
    </Helmet>
        <h2 className="text-3xl text-gray-700 font-extrabold">Add a Tourists Spot</h2>
        <form onSubmit={handleAddTouristsSpot}>
            
            
        <div className='flex flex-col md:flex-row gap-8'>
            <div className='w-full'>
            {/* Image URL */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Image URL</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name="image" placeholder="Image URL" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>



            {/* Product type */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Product Type</span>
                    </label>
                    <label className="input-group">
                        <input required type="text" name="product_type" placeholder="Product Type" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* size */}
            {/* <div className="mb-8">
    <div className="form-control w-full">
        <label className="label">
            <span className="text-gray-700 label-text">Size</span>
        </label>
        <select name="country_name" className="select select-bordered w-full" required>
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




            {/* size */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Size</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name="size" placeholder="Size" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* color */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Color</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name="color" placeholder="Color" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* Fabric */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Fabric</span>
                    </label>
                    <label className="input-group">
                        <input required type="Text" name="fabric" placeholder="Fabric" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            </div>


            <div className='w-full'>
            {/* Occasion*/}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Occasion</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name="occasion" placeholder="Occasion" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            {/* Price */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">Price</span>
                    </label>
                    <label className="input-group">
                        <input type="number" name="price" placeholder="Price" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>

            {/* User Email */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">User Email</span>
                    </label>
                    <label className="input-group">
                        <input readOnly type="email" name="email" placeholder="User Email" defaultValue={user.email} className="input input-bordered w-full" />
                    </label>
                </div>
            </div>

            {/* User Name */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="text-gray-700 label-text">User Name</span>
                    </label>
                    <label className="input-group">
                        <input readOnly type="text" defaultValue={user.displayName} name="user_name" placeholder="User Name" className="input input-bordered w-full" />
                    </label>
                </div>
            </div>
            </div>    
        </div>


            {/* Add Button */}
            <input type="submit" value="Add" className="btn text-white btn-block bg-[#D4AF37]" />
        </form>
    </div>
    
    );
};

export default Add;