import { Btn } from './Btn';


import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import useMyProducts from '../Hook/useMyProducts';







const MyListTable = ({product}) => {


  const [,refetch] = useMyProducts()

const {image,product_type,size,fabric,color,price,occasion,email,user_name,_id} = product


    const handleDelete = (id) =>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

          fetch(`http://localhost:5000/products/${id}`,{
            method:'DELETE'
        })
        .then(res=> res.json())
        .then(data=> {
            console.log("deleting ",data)
            if(data.deletedCount>0){
                // const remaining = products.filter(product=> product._id!== id)
                //  setProducts(remaining)
                refetch()
                Swal.fire({
                  title: "Deleted!",
                  text: "The product has been deleted.",
                  icon: "success"
                });
            }
        })

        }


      });


    }
    return (
      <>
    <tbody>
      {/* row 1 */}
      <tr className="bg-base-200 flex flex-col sm:items-center sm:flex-row">
        <span className='sm:w-[40%] md:w-[35%] lg:w-[27%]'>
        <th>{image}</th>
        <td>{product_type}</td>
        <td>${price}</td>
        </span>
        <span>
        <td><Link to={`/two/update/${_id}`}>
        <Btn   text={"Update"}  />
          </Link></td>
        <td>
          {/* <button onClick={()=> handleDelete(_id)} className='btn btn-warning text-white bg-[#d6a606]'>Delete</button> */}
          <Btn   text={"Delete"} doIt={()=> handleDelete(_id)}  />
        </td>
        </span>
      </tr>
    </tbody>
      <br />
      </>
        
    );
};
MyListTable.propTypes = {
    product : PropTypes.object,
    setProducts: PropTypes.func,
    products: PropTypes.array,
}
export default MyListTable;