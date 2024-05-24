import { useEffect, useState } from "react";
import coolbg from "../assets/cool-background.png"


const Adventure = () => {
  // Define some sample adventure activities
const [adventures, setAdventures] = useState([])
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/adventures");
            const data = await response.json();
            setAdventures(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []); 

  return (
    <div>

      <h2 className="text-[#bf8d30] text-[4.6vw] lg:text-[3vw] pb-[1.5vw] font-bold text-center">Adventure Activities</h2>
    <section  style={{ backgroundImage: `url(${coolbg})` }} className="bg-cover bg-center py-[9vw]">
      <div className="mx-auto w-full grid gap-[4vw] md:gap-[0vw] grid-cols-1  md:grid-cols-3">
        {adventures.map((adventure) => (
          <div key={adventure._id} className="hover:scale-105 text-[1.5vw] transition-all duration-500 md:w-[28vw] w-[68vw] mx-auto rounded-lg overflow-hidden shadow-md bg-white">
            <img className="w-full h-[35vw] md:h-[16vw] object-cover" src={adventure.image} alt={adventure.name} />
            <div className="p-[1vw]">
              <h3 className="text-[3.3vw] md:text-[3vw] lg:text-[2vw] font-semibold mb-2">{adventure.name}</h3>
              <p className="text-[2.8vw] md:text-[2.2vw] lg:text-[1.5vw] text-gray-700">{adventure.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default Adventure;
