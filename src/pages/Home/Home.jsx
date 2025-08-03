import { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router";
import Profile from "../SignIn/profile";
import { UserContext } from "../../context/UserContext";

const Home = () => {
    const {isLoggedIn,setIsLoggedIn}=useContext(UserContext);
    const navigate = useNavigate();
    const categories = ['Home', 'About'];
    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate("/");
    }
    const handlePlanTrip = () => {
         isLoggedIn ? navigate('/tripplaner') : navigate('/SignIn') 
    }
    const handleFindBuddy =()=>{
         isLoggedIn ? navigate('/findabuddy') : navigate('/SignIn') 
    }

    return (
        <div className="flex flex-col md:flex-row justify-between gap-2 p-5 min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">

            <div className="w-full md:w-1/2 bg-white flex flex-col justify-between rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none px-10 py-5">

                <div className="flex justify-between items-center">
                    <img src="/logo.png" alt="Travel Buddy" width={80} height={80} />
                    <div className="relative hidden lg:flex items-center gap-5 text-gray-700 font-medium">

                        {!isLoggedIn ? (
                            categories.map((category, i) => (
                                <Link
                                    key={i}
                                    to={category === "Home" ? "/" : "/About"}
                                    className="cursor-pointer hover:text-blue-600 px-4 py-2"
                                >
                                    {category}
                                </Link>
                            ))
                        ) : (
                            <div>
                                <Profile />
                            </div>
                        )}

                        {!isLoggedIn ?
                            <Link to={'/SignIn'}>
                                <button
                                    className="text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:text-white px-4 py-2 cursor-pointer">
                                    Sign In
                                </button>
                            </Link>
                            :
                            <button onClick={handleLogout}
                                className="text-white bg-red-500 rounded-full shadow-md hover:bg-red-600 px-4 py-2 cursor-pointer">
                                Log out
                            </button>
                        }
                    </div>
                    <div className="lg:hidden cursor-pointer z-50" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (<span className="text-3xl text-red-500">&times;</span>) : <RxHamburgerMenu size={26} />}
                    </div>
                </div>

                {isOpen && (
                    <div className="absolute right-0 top-14 mr-12 z-40 flex flex-col items-center gap-3 text-gray-700 font-medium bg-blue-50 w-fit rounded-3xl p-10 lg:hidden">
                        {!isLoggedIn ?
                            categories.map((category, i) => (
                                <Link key={i} to={category === "Home" ? '/' : '/About'} className={`cursor-pointer hover:text-blue-600 px-4 py-2}`}>
                                    {category}
                                </Link>
                            ))
                            :
                            categories.map((category, i) => (
                                <Link key={i} to={`/${category}`} className={`cursor-pointer hover:text-blue-600 px-4 py-2}`}>
                                    {category}
                                </Link>
                            ))
                        }
                        {!isLoggedIn ?
                            <Link to={'/SignIn'}>
                                <button
                                    className="text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:text-white px-4 py-2 cursor-pointer">
                                    Sign In
                                </button>
                            </Link>
                            :
                            <button onClick={handleLogout}
                                className="text-white bg-red-500 rounded-full shadow-md hover:bg-red-600 px-4 py-2 cursor-pointer">
                                Log out
                            </button>
                        }
                    </div>
                )}

                <div className="mt-10 ml-2 md:ml-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-blue-900">
                        Get your <br />
                        ultimate Travel <br />
                        companion
                    </h2>
                    <p className="mt-5 text-gray-600 text-lg">
                        Explore extraordinary destinations, people, and unforgettable experiences.
                    </p>
                </div>

                <div className="mt-10 md:mt-auto w-full flex flex-col md:flex-row gap-6 bg-gradient-to-b from-blue-200 to-blue-400 p-4 rounded-4xl">

                    <div className="flex-1 bg-white/90 p-5 rounded-4xl text-black shadow-md hover:scale-103 transition-transform duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="font-semibold text-start">Plan a trip</h2>
                            <span className="text-3xl">🏝️🍹</span>
                        </div>
                        <p className="text-sm text-start">Plan an amazing trip with your loved ones using AI to get the most out of it</p>
                        <div className="flex justify-center">

                            <button onClick={handlePlanTrip}
                                className="mt-3 bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-2 rounded-full text-white shadow-lg hover:from-blue-500 hover:to-blue-700 transition-transform cursor-pointer"
                            >
                                Plan a trip with AI
                            </button>

                        </div>
                    </div>

                    <div className="flex-1 bg-white/90 p-5 rounded-4xl text-black shadow-md hover:scale-103 transition-transform duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="font-semibold text-start">Find a buddy</h2>
                            <span className="text-3xl">👭🏻</span>
                        </div>
                        <p className="text-sm text-start">Join a buddy who's going to the same location</p>
                        <div className="flex justify-center">
                            <button onClick={handleFindBuddy}
                            className="mt-3 bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-2 rounded-full text-white shadow-lg hover:from-blue-500 hover:to-blue-700 transition-transform cursor-pointer">
                                Find a Buddy
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-[url('/homePhoto.jpg')] bg-cover bg-center bg-no-repeat w-full md:w-1/2 rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none p-5 flex flex-col items-center gap-6">

                <input
                    aria-label="Search destination"
                    type="text"
                    placeholder="Find your destination"
                    className="w-full md:w-2/3 p-3 border-2 border-white rounded-full text-white shadow-2xl placeholder:text-white bg-white/30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                />



                <div className="w-full flex flex-col md:flex-row gap-6 mt-auto bg-white/50 p-4 rounded-4xl backdrop-blur-md">

                    <div className="flex-1 bg-white/90 p-5 rounded-4xl text-black shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">🏖️</span>
                            <p className="font-semibold">Interactive Trip Planning</p>
                        </div>
                        <p className="text-sm">Share and plan with your buddies</p>
                    </div>

                    <div className="flex-1 bg-white/90 p-5 rounded-3xl text-black shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">📍</span>
                            <h3 className="font-semibold">Destination Guidelines</h3>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <span className="flex items-center justify-between text-sm cursor-pointer hover:text-blue-600 group">
                                Popular Travel Destination
                                <span className="text-lg group-hover:translate-x-1 transition-transform">&gt;</span>
                            </span>
                            <span className="w-full bg-black/30 h-[1px]"></span>
                            <span className="flex items-center justify-between text-sm cursor-pointer hover:text-blue-600 group">
                                See Travel Reviews
                                <span className="text-lg group-hover:translate-x-1 transition-transform">&gt;</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Home;
