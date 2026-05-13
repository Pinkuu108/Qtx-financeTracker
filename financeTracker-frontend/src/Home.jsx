import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const logout = () => {

    navigate("/login");

  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-lg text-center w-96">

        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Welcome
        </h1>

        <p className="text-gray-600 mb-6">
          Login Successful
        </p>

        <button
          onClick={logout}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default Home;