export const checkRole = () => {
    var user = localStorage.getItem("user")
    if (!user) {
        return
    }
    user = JSON.parse(user).data.quyenList;
    if (!user.includes("ROLE_EMPLOYEE")) {
        window.location.href = process.env.REACT_APP_FRONTEND_URL;
    }
}
export const checkAdmin = () => {
    var user = localStorage.getItem("user")
    if (!user) {
        return false
    }
    user = JSON.parse(user).data.quyenList;
    if (!user.includes("ROLE_ADMIN")) {
        return false
    }
    return true
}