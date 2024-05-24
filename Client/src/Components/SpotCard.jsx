import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const SpotCard = ({spot}) => {
    const {_id, image, tourists_spot_name, country_name, location, short_description, average_cost, seasonality, travel_time, total_visitors_per_year, email, user_name} = spot
    return (

        <div className="relative mb-[1vw] w-full lg:w-[90%] mx-auto rounded overflow-hidden shadow-lg">
            <img src={image} alt={tourists_spot_name} className="w-full h-[30vw] md:h-[22vw] lg:h-[16vw] object-cover" />
            <div className="px-[2vw]">
                <div className="font-bold text-[3.5vw] md:text-[1.5vw]">{tourists_spot_name}</div>
                <p className="text-[#559595] text-[2.5vw] md:text-[1.3vw]">
                    <span className="font-semibold">Average Cost:</span> ${average_cost}
                </p>
                <p className="text-[#559595] text-[2.5vw] md:text-[1.3vw]">
                    <span className="font-semibold">Total Visitors Per Year:</span> {total_visitors_per_year}
                </p>
                {travel_time && <>
                <p className="text-[#559595] text-[2.5vw] md:text-[1.3vw]">
                    <span className="font-semibold">Travel Time:</span> {travel_time}
                </p>                
                </>}
                <p className="text-[#559595] text-[2.5vw] md:text-[1.3vw]">
                    <span className="font-semibold">Seasonality:</span> {seasonality}
                </p>
            </div>
            <div className="p-[1vw]">
                <Link to={`/two/spot/${_id}`}>
                <button  className="text-[2.5vw] md:text-[1.3vw] bg-[#7dc5ce74] text-[#559595] hover:text-white font-bold py-[.5vw] px-[1.5vw] rounded">
                    View Details
                </button>
                </Link>
            </div>
        </div>
    );
};
SpotCard.propTypes = {
    spot : PropTypes.object,
}
export default SpotCard;