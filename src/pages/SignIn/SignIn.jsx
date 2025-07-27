import { TbLockPassword } from "react-icons/tb";
import { FaRegUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const SignIn = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Sign In");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState([]);

  const handleInput = (name, value) => {
    setForm({
      ...form,
      [name]: value
    })
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Signup successful');
        setAction('Log In');
      } else {
        alert(data.message || 'Signup failed');
      }

    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong");
    }
  };


  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert("Login successful!");
        setIsLoggedIn(true);
        navigate('/Home');
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user.username);

      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen w-full bg-[url(/signIn-bg.png)] bg-center bg-cover ">
      <div className="flex w-full max-w-4xl md:h-[500px] md:items-stretch justify-center">

        <div className="bg-white/80 p-8 rounded-3xl shadow-2xl w-full md:w-1/2 flex flex-col justify-center">
          <div className="flex flex-col items-center justify-center mb-5">
            <img
              src="/logo.png"
              alt="Travel Buddy"
              width={60}
              height={60}
              className="rounded-4xl mb-2 "
            />
            <h1 className="text-2xl font-bold text-blue-900">{action}</h1>
            <span className="w-10 h-1 bg-blue-900 mt-3 rounded-3xl"></span>
          </div>

          <form onSubmit={action === 'Sign In' ? handleSignIn : handleLogIn}>
            {action === "Sign In" && (<div className="mb-4 flex items-center gap-3">
              <FaRegUser size={20} />
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name..."
                className="w-full p-2 rounded-2xl focus:outline-0 placeholder:text-gray-400"
                onChange={(e) => handleInput("username", e.target.value)}
              />
            </div>
            )}

            <div className="mb-4 flex items-center gap-3">
              <GoMail size={20} />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter Email ID..."
                className="w-full p-2 rounded-2xl focus:outline-0 placeholder:text-gray-400"
                onChange={(e) => handleInput("email", e.target.value)}
              />
            </div>

            <div className="mb-4 flex items-center gap-3">
              <TbLockPassword size={20} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password..."
                className="w-full p-2 rounded-2xl focus:outline-0 placeholder:text-gray-400"
                onChange={(e) => handleInput("password", e.target.value)}
              />
              <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 rounded cursor-pointer hover:from-blue-500 hover:to-blue-700 transition"
            >
              {action}
            </button>
            {action === "Log In" ? <p className="mt-5 text-center">
              New Here? <span className="text-blue-600 underline cursor-pointer" onClick={() => setAction("Sign In")}>Click here to Register</span>
            </p>
              : <p className="mt-5 text-center">
                Already Have an account? <span className="text-blue-600 underline cursor-pointer" onClick={() => setAction("Log In")}>Click here to Log In</span>
              </p>}

          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
