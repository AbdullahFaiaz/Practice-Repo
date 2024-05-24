

import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const CountrySpotCard = ({spot}) => {

    const {_id, image, tourists_spot_name, country_name, location, short_description, average_cost, seasonality, travel_time, total_visitors_per_year, email, user_name} = spot
    return (
        <div className="p-[2vw] border rounded-md shadow-md">
            <h2 className="font-bold text-[3.5vw] md:text-[1.5vw]">{tourists_spot_name}</h2>
            <p className="text-[#559595] text-[2.5vw] md:text-[1.3vw]">{country_name}</p>
            <p className="text-[#559595] text-[2.5vw] md:text-[1.3vw]">{location}</p>
            <p className="text-[#559595] text-[2.5vw] md:text-[1.3vw]">{short_description}</p>
            <div className="">
                <p className="text-[#559595] text-[2.5vw] md:text-[1.3vw]">Average Cost: ${average_cost}</p>
                <p className="text-[#559595] text-[2.5vw] md:text-[1.3vw]">Seasonality: {seasonality}</p>
            </div>
            <Link to={`/two/spot/${_id}`}>
            <button className="text-[2.5vw] md:text-[1.3vw] bg-[#7dc5ce74] text-[#559595] hover:text-white font-bold py-[.5vw] px-[1.5vw] rounded">View Details</button>
            </Link>

        </div>


    );
};
CountrySpotCard.propTypes = {
    spot : PropTypes.object,
}
export default CountrySpotCard;