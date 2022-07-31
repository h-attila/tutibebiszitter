import jwtDecode from "jwt-decode";

class AuthService {

    login(userData) {
        localStorage.setItem("user", JSON.stringify(userData));
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getAuthHeader() {
        const user = this.getCurrentUser();
        if (user && user.token) {
            return {"Authorization" : `Bearer ${user.token}`};
        } else {
            return {};
        }
    }

    isTokenExpired() {
        const currentDate = new Date();
        const user = this.getCurrentUser();

        if (Object.keys(user).length === 0) {
            return false;
        }

        const decodedToken = jwtDecode(this.getCurrentUser().token);

        return decodedToken.exp * 1000 < currentDate.getTime();
    }
}

export default new AuthService();
