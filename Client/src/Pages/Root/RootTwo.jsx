import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer";

import { AuthContext } from "../../Context/ContextComponent";
import { Audio } from "react-loader-spinner";
import { useContext } from "react";
import NavbarTwo from "../Shared/NavbarTwo";






const RootTwo = () => {
    const {loading} = useContext(AuthContext)
    const location = useLocation()
    console.log("location is ",location)
    if(loading){
        return (
        <>
        <div className="border h-[100vh] flex flex-col items-center justify-center"> 
        <Audio
  height={500}
  width={500}
  radius={2}
  color="#008ad3"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
        <div className="text-5xl">Loading...</div>
        </div>

        </>
    )
    }
    return (
        <div>
            <NavbarTwo/>
            {/* className="min-h-[calc(100vh-288px)]" */}
                <div className="min-h-[calc(100vh-300px)]"> 
                <Outlet></Outlet>
                </div>
            {(location.pathname === '/two/allProducts' || location.pathname === '/two/add') || <Footer/>}
        </div>
    );
};

export default RootTwo;