import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Context/ContextComponent";



const useMyProducts = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useContext(AuthContext)
    const {data: myProducts= [], refetch} = useQuery({ 
        queryKey: ['myPro'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/myProducts?email=${user.email}`)
            return res.data
            // const res = await fetch("http://localhost:5000/myProducts")
            // return res
        }
        
        })
        return [myProducts,refetch]

};

export default useMyProducts;