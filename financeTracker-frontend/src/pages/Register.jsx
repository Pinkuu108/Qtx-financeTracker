import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await registerUser(user);
      alert(response.data);
      if (response.data === "Registration Successful") {
        navigate("/login");
      }
    } catch (error) {
      setError("Registration Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Register</h1>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        <input type="text" name="fullName" placeholder="Enter Name"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="email" name="email" placeholder="Enter Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="password" name="password" placeholder="Enter Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-400" />
        <button onClick={handleRegister}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
          Register
        </button>
        <p className="text-center mt-4">Already have an account?
          <span onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer font-semibold ml-1">Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;