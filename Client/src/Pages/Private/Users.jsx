import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hook/useAxiosPublic";


const Users = () => {

    const axiosPublic = useAxiosPublic()
    const {data: allUsers=[], refetch} = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await axiosPublic.get("/users")
            return res.data
        }
    })
    
    const handleAdmin = (id) => {
        fetch(`http://localhost:5000/users/admin/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    role: 'admin'
                  }),
            }).then(response => response.json())
            .then(data => {
                refetch()
                console.log("users page",data)
            })
        }

        const handleUser = (id) => {
            fetch(`http://localhost:5000/users/admin/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    },                
                    body: JSON.stringify({ 
                        role: 'user'
                    }),
                }).then(response => response.json())
                .then(data => {
                    refetch()
                    console.log("users page",data)
                })
            }

    return (
        <div className="pt-[6vw]">
            
            {
            allUsers.map(user => 
            <div className="flex gap-[1vw] items-center pl-[2vw] border my-1" key={user._id}>
                <div>Name: {user.name}</div>
                <div>Email: {user.email}</div> 
             

                {user?.role==='admin'?  <button onClick={()=>handleUser(user._id)} className="btn btn-success">Make User</button>: <button onClick={()=>handleAdmin(user._id)} className="btn btn-success">Make Admin</button>}
            
            </div>)
            }
        </div>
    );
};

export default Users;