import { FaRegUser } from "react-icons/fa";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const letter = user?.username.charAt(0).toUpperCase() || <FaRegUser size={20} />;
  return (
    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg shadow-md">
      {letter}
    </div>
  )
}

export default Profile
