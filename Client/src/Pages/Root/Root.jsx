import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import { AuthContext } from "../../Context/ContextComponent";
import { Audio } from "react-loader-spinner";
import { useContext } from "react";






const Root = () => {
    const {loading} = useContext(AuthContext)
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
            <Navbar/>
            {/* className="min-h-[calc(100vh-288px)]" */}
                <div className="min-h-[calc(100vh-300px)]"> 
                <Outlet></Outlet>
                </div>
            <Footer/>
        </div>
    );
};

export default Root;