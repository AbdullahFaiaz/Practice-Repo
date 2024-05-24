import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductCard = ({product}) => {
    const {image,product_type,size,fabric,color,price,occasion,email,user_name,_id} = product
    return (

        <div className='hover:scale-105 hover:border-yellow-600 hover:border-2 transition-all duration-500 bg-[#ffffffc5] w-[86%] md:w-[80%] mx-auto text-black shadow-2xl'>
        <Link to={`/two/details/${_id}`}>
            <img src={image} className='w-full h-[22vw] md:h-[15vw]' alt="image" />
            <div className="p-[1vw]">
                <h1 className="text-[3.8vw] md:text-[1.8vw]">{product_type}</h1>
                <p className="text-[2.7vw] md:text-[1.2vw]">Size: {size}</p>
                <p className="text-[2.7vw] md:text-[1.2vw]">Fabric: {fabric}</p>
                <p className="text-[2.7vw] md:text-[1.2vw]">Price: {price}</p>
                <p className="text-[2.7vw] md:text-[1.2vw]">Occasion: {occasion}</p>
                <p className="text-[2.7vw] md:text-[1.2vw]">Color: {color}</p>
            </div>
        </Link>
        </div>


    );
};

ProductCard.propTypes = {
    product : PropTypes.object,
}
export default ProductCard;