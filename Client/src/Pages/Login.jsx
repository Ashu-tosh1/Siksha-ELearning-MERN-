import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authapi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
// import { userLoggedIn } from "@/features/authSlice"; 
import { userLoggedIn } from "@/features/auth/authslice"; // ✅ Import Redux action

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signupInput, setsignupInput] = useState({ name: "", email: "", password: "" });
  const [loginInput, setloginInput] = useState({ email: "", password: "" });
  
  const navigate = useNavigate();
  const dispatch = useDispatch();  // ✅ Redux dispatch

  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading }] = useRegisterUserMutation();
  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading }] = useLoginUserMutation();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    type === "signup"
      ? setsignupInput({ ...signupInput, [name]: value })
      : setloginInput({ ...loginInput, [name]: value });
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;

    try {
      await action(inputData);
    } catch (error) {
      console.error("Error during registration/login:", error);
    }
  };

  useEffect(() => {
    if (registerData) {
      toast.success(registerData.message || "Signup successful.");
      setsignupInput({ name: "", email: "", password: "" });
    } else if (registerError) {
      toast.error(registerError.data?.message || "Signup Failed");
    }

    if (loginData) {
      console.log("User Data from API:", loginData); // ✅ Debugging

      // ✅ Ensure role is present before dispatching
      if (loginData.user) {
        dispatch(userLoggedIn(loginData.user)); // ✅ Store user in Redux
      }

      toast.success(loginData.message || "Login successful.");
      navigate("/");  // Redirect after login
    } else if (loginError) {
      toast.error("Login Failed");
    }
  }, [loginData, registerData, loginError, registerError, dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[768px] max-w-full min-h-[480px] bg-white rounded-[30px] shadow-lg overflow-hidden transition-all duration-500">
        {/* Mobile Toggle Button */}
        <div className="md:hidden absolute top-4 right-4 z-10">
          <button 
            onClick={() => setIsSignUp(!isSignUp)} 
            className="bg-teal-600 text-white px-4 py-2 rounded"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>

        {/* Sign Up Form */}
        <div className={`absolute top-0 left-0 w-full md:w-1/2 h-full flex items-center justify-center flex-col p-10 transition-all duration-500 ease-in-out transform ${isSignUp ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 translate-x-full"}`}>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <input type="text" name="name" placeholder="Name" value={signupInput.name} onChange={(e) => changeInputHandler(e, "signup")} className="mt-3 px-3 py-2 bg-gray-100 rounded w-full" />
          <input type="email" name="email" placeholder="Email" value={signupInput.email} onChange={(e) => changeInputHandler(e, "signup")} className="mt-3 px-3 py-2 bg-gray-100 rounded w-full" />
          <input type="password" name="password" placeholder="Password" value={signupInput.password} onChange={(e) => changeInputHandler(e, "signup")} className="mt-3 px-3 py-2 bg-gray-100 rounded w-full" />
          <button className="mt-4 bg-teal-600 text-white px-6 py-2 rounded w-full md:w-auto" disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>Sign Up</button>
        </div>

        {/* Sign In Form */}
        <div className={`absolute top-0 left-0 w-full md:w-1/2 h-full flex items-center justify-center flex-col p-10 transition-all duration-500 ease-in-out transform ${isSignUp ? "opacity-0 scale-95 -translate-x-full" : "opacity-100 scale-100 translate-x-0"}`}>
          <h1 className="text-2xl font-bold">Sign In</h1>
          <input type="email" name="email" placeholder="Email" value={loginInput.email} onChange={(e) => changeInputHandler(e, "login")} className="mt-3 px-3 py-2 bg-gray-100 rounded w-full" />
          <input type="password" name="password" placeholder="Password" value={loginInput.password} onChange={(e) => changeInputHandler(e, "login")} className="mt-3 px-3 py-2 bg-gray-100 rounded w-full" />
          <button className="mt-4 bg-teal-600 text-white px-6 py-2 rounded w-full md:w-auto" disabled={loginIsLoading} onClick={() => handleRegistration("login")}>Sign In</button>
        </div>

        {/* Toggle Section for Desktop */}
        <div className="hidden md:flex absolute top-0 left-1/2 w-1/2 h-full bg-teal-700 text-white items-center justify-center flex-col p-10 transition-all duration-500">
          <h1 className="text-2xl font-bold">{isSignUp ? "Welcome Back!" : "Hello, Friend!"}</h1>
          <button onClick={() => setIsSignUp(!isSignUp)} className="mt-4 border border-white px-6 py-2 rounded">
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
