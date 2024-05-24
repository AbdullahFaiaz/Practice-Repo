import { useContext, useEffect, useState } from "react";
import { Social } from '../../Components/Social';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";

import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Context/ContextComponent";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import useAxiosPublic from "../../Hook/useAxiosPublic";




const Register = () => {
  

  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate();

  const [check,setCheck] = useState(true)

  const {setUser} = useContext(AuthContext)


useEffect(()=>{
        loadCaptchaEnginge(4); 

},[])

const handleCapcha = (e) =>{
    e.preventDefault()
    const form = e.target
    const val = form.value;
    if(validateCaptcha(val)==true){
        setCheck(false)
    }
    console.log(check)
}












  //auth context
  const authInfo = useContext(AuthContext);
  const { createUser, updateUserProfile, setLoading,googleLogIn, githubLogIn, } = authInfo;
  //show pass
  const [showPass, setShowPass] = useState(false);
  const handleShowPass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //on submit
  const onSubmit = (data) => {
    const { email, password, photoURL, displayName } = data;
    console.log(data);
    //create user

    // Password validation
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    if (
      !uppercaseRegex.test(password) ||
      !lowercaseRegex.test(password) ||
      password.length < 6
    ) {
      // Show error toast
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long"
      );
      return;
    }
  // If password is valid, proceed with registration
  createUser(email, password)
  .then((result) => {
    // Assuming updateUserProfile returns a promise
    return updateUserProfile(displayName, photoURL)
      .then(() => {


        const userInfo = {
          name: displayName,
          email: email,
        }
        axiosPublic.post('/users', userInfo)
        .then( res => {
          if(res.data.insertedId){
            setUser({ ...result?.user, displayName, photoURL });
            navigate("/");
            // Show toast notification after a slight delay
            setTimeout(() => {
              toast.success("Registered Successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }, 1000);

          }
        })


      })
      .catch((error) => {
        // Handle errors from updateUserProfile
        console.error('Error updating user profile:', error);
        toast(error.message);
        setLoading(false);
      });
  })
  .catch((error) => {
    // Handle errors from createUser
    console.error('Error creating user:', error);
    toast(error.message);
    setLoading(false);
  });

  };

    //google regis
    const handleGoogleLogIn = () => {
      googleLogIn()
      .then((result) => {
        setLoading(false)
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName
        }
        axiosPublic.post('/users', userInfo)
        .then(res=> {
          console.log(res?.data)
          navigate(location?.state ? location.state : "/");
          setTimeout(() => {
            toast.success("Logged In Successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }, 1000);
        })
        
        
      })
        .catch((error) => {
          toast(error.message);
          setLoading(false);
        });
    };
  
    //github log in
    const handleGithubLogIn = () => {
      githubLogIn()
      .then((result) => {
        setLoading(false)
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName
        }
        axiosPublic.post('/users', userInfo)
        .then(res=> {
          console.log(res?.data)
          navigate(location?.state ? location.state : "/");
          setTimeout(() => {
            toast.success("Logged In Successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }, 1000);
        
        })


      })
        .catch((error) => {
          toast(error.message);
          setLoading(false);
        });
    };

  return (
    <div className=" flex gap-14 justify-center items-center py-8 md:py-12 lg:py-16">
      <Helmet>
        <title>Adventure Avenue | Register</title>
      </Helmet>
      {/* <ToastContainer /> */}
      <ToastContainer></ToastContainer>
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full md:w-[80%] lg:w-[70%] max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="form-control">
            <label className="label text-gray-800">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
              {...register("displayName", { required: true })}
            />
            {errors.displayName && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label text-gray-800">Photo URL</label>
            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered w-full bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
              {...register("photoURL", { required: true })}
            />
            {errors.photoURL && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label text-gray-800">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label text-gray-800">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-800"
                {...register("password", { required: true })}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 font-extrabold"
                onClick={handleShowPass}
              >
                {showPass ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
            <label className="label text-sm text-right">
              <div>
                <LoadCanvasTemplate />
              </div>
            </label>
            <input
              type="text"
              placeholder="Type the Captcha"
              name="captcha"
              className="input input-bordered w-full bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onBlur={handleCapcha}
            />
          </div>

          <div className="form-control mt-4">
            <button disabled={false} className={check===false? "w-full h-11 rounded-lg text-black bg-gray-500 transition duration-300" :"w-full h-11 rounded-lg hover:bg-gray-600 text-white bg-black transition duration-300"}>
              Register
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-sm text-gray-800">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/two/login">
            Log In
          </Link>
        </p>
      </div>
      <Social   handleGoogleLogIn={handleGoogleLogIn} handleGithubLogIn={handleGithubLogIn}  />
    </div>
  );
};

export default Register;
