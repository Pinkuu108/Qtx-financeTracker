import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:8080/users/login", loginData);
      const text = response.data;

      if (text.startsWith("Login Success")) {
        const userId = text.split(":")[1];
        localStorage.setItem("userId", userId);
        navigate("/home");
      } else {
        alert(text);
      }
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">Login</h1>
        <input type="email" name="email" placeholder="Enter Email" onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-green-400" />
        <input type="password" name="password" placeholder="Enter Password" onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-green-400" />
        <button onClick={loginUser}
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition">
          Login
        </button>
        <p className="text-center mt-4">Don't have an account?
          <span onClick={() => navigate("/")} className="text-green-600 cursor-pointer font-semibold ml-1">Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;