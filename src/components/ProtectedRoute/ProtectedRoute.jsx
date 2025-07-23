import {Outlet, useNavigate} from "react-router";
import {useEffect} from "react";
import {userSelector} from "../../reducers/user.slice.js";
import {useSelector} from "react-redux";

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const user = useSelector(userSelector)

    useEffect(() => {
        if (!user.accessToken) {
            navigate("/");
        }

    }, []);

    return <Outlet />
}

export default ProtectedRoute;