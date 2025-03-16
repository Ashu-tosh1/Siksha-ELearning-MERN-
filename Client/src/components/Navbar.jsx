import { Link, useNavigate } from "react-router-dom";
import { Menu, X, School } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "@/features/api/authapi";
import { useEffect, useState } from "react";
import { userLoggedOut } from "@/features/auth/authslice"; // ✅ Import logout action

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [logoutUser, { isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // ✅ Fixed state for mobile menu

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("User logged out");
      dispatch(userLoggedOut()); // ✅ Clear user state from Redux
      navigate("/login");
      window.location.reload();
    }
  }, [isSuccess, navigate, dispatch]);

  return (
    <nav className="bg-black text-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={"/"}>
          <div className="flex items-center">
            <School size={30} className="text-lime-200" />
            <h1 className="ml-2 text-2xl font-bold">Siksha-Elearning</h1>
          </div>
          </Link>
          

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {user ? (
              <div className="flex items-center space-x-4">
                {user?.role === "instructor" ? (
                  <Link to="/my-course" className="hover:text-yellow-400">
                    My Course
                  </Link>
                ) : (
                  <Link to="/my-learning" className="hover:text-yellow-400">
                    My Learning
                  </Link>
                )}
                <Link to="/profile" className="hover:text-yellow-400">Profile</Link>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">Login</Link>
                <Link to="/signup" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg">Signup</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black text-white p-4 space-y-4">
          {user ? (
            <>
              {user?.role === "instructor" ? (
                <Link to="/my-course" className="block hover:text-yellow-400">
                  My Course
                </Link>
              ) : (
                <Link to="/my-learning" className="block hover:text-yellow-400">
                  My Learning
                </Link>
              )}
              <Link to="/profile" className="block hover:text-yellow-400">Profile</Link>
              <button
                onClick={logoutHandler}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg">Login</Link>
              <Link to="/signup" className="block bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg">Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
