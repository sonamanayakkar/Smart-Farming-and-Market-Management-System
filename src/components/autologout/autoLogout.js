import { jwtDecode } from "jwt-decode";


export let autologout = () => {
    const token = localStorage.getItem("token");
    if (token) {
        const decoded = jwtDecode(token);
        const timeout = decoded.exp * 1000 - Date.now();
        

        if (timeout > 0) {
            setTimeout(() => {
                logout();
            }, timeout);
        } else {
            logout();
        }
    }
}

const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
};