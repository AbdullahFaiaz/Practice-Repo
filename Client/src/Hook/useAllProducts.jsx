import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAllProducts = () => {
    const axiosPublic = useAxiosPublic()
    const {data: allProducts= [], refetch} = useQuery({ 
        queryKey: ['allPro'],
        queryFn: async () => {
            const res = await axiosPublic.get("/allProducts")
            return res.data
            // const res = await fetch("http://localhost:5000/allProducts")
            // return res
        }
        
        })
        return [allProducts,refetch]

};

export default useAllProducts;