import axios from 'axios';

class Auth {

    static login(loginData, cb) { //make a login 
        axios.post('/api/staff/login', loginData) //make a post request to /api/staff/login
            .then(res => {
                if(!res.data.errors) { //if the login was succesful
                    localStorage.setItem('loggedin', true); //store the token in local storage
                    localStorage.setItem('token', res.data.token);
                    cb(); //call the callback function with no errors
                }
                else { //otherwise call the callback function with an error
                    cb(res.data.errors[0].msg);
                }
            })
            .catch(() => { // if the http request failed
                cb("It seems there was a problem with the server. Please try again"); // call the callback function with an error
            });
    }

    static logout(cb) {
        localStorage.setItem('loggedin', false);
        localStorage.removeItem('token');
        cb();
    }

    static get isLoggedIn() {
        return localStorage.getItem('loggedin') === 'true';
    }

    static get getToken() {
        return localStorage.getItem('token');
    }
}

export default Auth;