import { useSelector } from "react-redux"
import { getAuthSelector } from "../features/auth/authSlice";


const useAuthUser = () => {

    const { user } = useSelector(getAuthSelector);
    return { user };
}

export default useAuthUser