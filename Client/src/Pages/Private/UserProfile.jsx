import { useContext } from "react";

import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Context/ContextComponent";


const UserProfile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className=" min-h-screen bg-white text-gray-800 py-12">
            <Helmet>
                <title>Harmony Homes | User Profile</title>
            </Helmet>
            <div className="max-w-3xl mx-auto px-4">
                {/* Profile Picture */}
                <div className="flex justify-center items-center mb-8">
                    <img
                        src={user?.photoURL || "https://i.ibb.co/sV6w5ct/Vecteezy-illustration-of-human-icon-vector-user-symbol-icon-modern-8442086.jpg"}
                        alt="User Profile Picture"
                        className="h-64 w-64 rounded-full object-cover border-4 border-yellow-700 shadow-lg"
                    />
                </div>
                
                {/* Profile Details */}
                <div className="bg-gray-100 rounded-lg shadow-lg p-8">
                    <div className="text-3xl font-semibold mb-6 text-center">User Profile</div>
                    <div className="mb-4">
                        <div className="text-3xl font-semibold mb-6">{user?.displayName || "Name not found"}</div>
                    </div>
                    <div>
                        <div className="text-xl font-semibold mb-2">Email:</div>
                        <div className="text-xl">{user?.email || "Email not found"}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
