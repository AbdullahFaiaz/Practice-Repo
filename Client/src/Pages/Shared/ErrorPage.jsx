import { Link, useRouteError } from "react-router-dom";
import { BsEmojiTear } from "react-icons/bs";

const ErrorPage = () => {
    const error = useRouteError()
    return (
        <div className="flex flex-col justify-center items-center h-[100dvh]">
            <h1 className="text-2xl text-[8vw] mb-8 sm:text-[7vw] lg:text-[4vw] p-2 rounded-[.5vw] text-black font-bold">{error.status}</h1>
            <h1 className="text-2xl text-[8vw] mb-8 sm:text-[7vw] lg:text-[4vw] p-2 rounded-[.5vw] text-black font-bold"><BsEmojiTear /></h1>
            <h1 className="text-2xl">Oops!!</h1>
            <h1 className="text-1xl">Error: {error.statusText || error.message}</h1>
            <Link to={'/'}><button  className="text-[4vw] mt-8 md:text-[2.5vw] bg-emerald-500 p-2 rounded-[.5vw] text-black font-bold">Go back</button></Link>
        </div>
    );
};

export default ErrorPage;