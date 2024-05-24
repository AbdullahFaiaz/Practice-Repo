import { useLoaderData, useParams } from "react-router-dom";
import CountrySpotCard from "./CountrySpotCard";
import { Helmet } from "react-helmet-async";


const CountrySpots = () => {
    const name = useParams()
    const spots = useLoaderData()
    console.log("country name:",name)
    return (<>
    <div className="flex flex-col items-center justify-center text-[4vw] lg:text-[2vw]">
        {name.country_name}
    </div>
        <div className="grid grid-cols-1 my-[2vw] lg:my-[3vw] md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Helmet>
        <title>Adventure Avenue | Country Spots</title>
    </Helmet>
            {
                spots.map(spot=> <CountrySpotCard key={spot._id} spot={spot}></CountrySpotCard>)
            }
        </div>
            </>
    );
};

export default CountrySpots;