import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
const Home = () => {
    const categories=['Home','About','Sign In']
    const [isOpen,setIsOpen]=useState(false);
    return (
        <div className="flex flex-col md:flex-row justify-between gap-2 p-5 min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">

            
            <div className="w-full md:w-1/2 bg-white rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none px-10 py-5">
                <div className="flex justify-between items-center">
                    <img src="/logo.png" alt="Travel Buddy" width={80} height={80} />
                    <div className="relative hidden lg:flex gap-5 text-gray-700 font-medium">
                        {categories.map((category,i)=>(
                            <h1 key={i} className="cursor-pointer hover:text-blue-600">{category}</h1>
                        ))}
                    </div>
                    <div className="lg:hidden cursor-pointer z-50" onClick={()=>setIsOpen(!isOpen)}>
                        {isOpen?(<span className="text-3xl text-red-500">&times;</span>):<RxHamburgerMenu size={26}/>}
                    </div>   
                </div>

                {isOpen && (
                    <div className=" absolute right-0 top-14 mr-12 z-40 flex flex-col items-center gap-3 text-gray-700 font-medium bg-gray-200 w-fit rounded-3xl p-10 lg:hidden">
                        {categories.map((category,i)=>(
                            <h1 key={i}>{category}</h1>
                        ))}
                    </div>
                )}

                <div className="mt-10 ml-2 md:ml-10">
                    <h2 className="text-3xl md:text-4xl font-bold leading-relaxed">
                        Get your <br />
                        ultimate Travel <br />
                        companion
                    </h2>
                    <p className="mt-5">
                        Explore extraordinary destinations, people and unforgettable experiences
                    </p>
                    <button className="mt-10 bg-gradient-to-r from-blue-400 to-blue-600 p-3 rounded-full text-white shadow-lg hover:from-blue-500 hover:to-blue-700 cursor-pointer hover:scale-105 transition-transform">
                        Start your Adventure Now
                    </button>
                </div>
            </div>

            
            <div className="bg-[url('/homePhoto.jpg')] bg-cover bg-center bg-no-repeat w-full md:w-1/2 rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none p-5 flex flex-col items-center gap-6">
                
                <input
                    type="text"
                    placeholder="Find your destination"
                    className="w-full md:w-2/3 p-3 border-2 border-white rounded-full text-white shadow-2xl placeholder:text-white bg-white/30 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                />

                
                <div className="w-fit flex flex-col justify-end mt-auto md:flex-row gap-6 bg-white/50 p-3 rounded-4xl">
                    
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
        </div>
    );
};

export default Home;
