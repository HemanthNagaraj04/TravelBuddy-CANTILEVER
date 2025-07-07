

const TripPlaner = () => {
  console.log("in trip page")
  return (
    <div>
      <div>
        <img src="/logo.png" alt="Logo" width={100} height={100}/>
        <input
                    aria-label="Search destination"
                    type="text"
                    placeholder="Find your destination"
                    className="w-full md:w-2/3 p-3 border-2 border-white rounded-full text-white shadow-2xl placeholder:text-white bg-white/30 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
                />
      </div>
    </div>
  )
}

export default TripPlaner
