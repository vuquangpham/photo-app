import axios from 'axios'
import firebase from 'firebase';

const getFirebaseToken = async () => {
    // truong hop fireBase da init xong => ton tai user
    const currentUser = firebase.auth().currentUser;
    if (currentUser) return currentUser.getIdToken();

    // firebase chua init xong || chua login, check thu user da dang nhap chua
    const hasRemeberAccount = localStorage.getItem('firebaseui::rememberedAccounts');
    if (!hasRemeberAccount) return null; // chua login
    // da login nhung chua init Firebase xong

    return new Promise((resolve, reject) => {
        const waitResponse = setTimeout(() => {
            reject(null)
        }, 10000);
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                reject(null);
            }

            const token = await user.getIdToken();

            resolve(token);
            clearTimeout(waitResponse)
            unregisterAuthObserver();
        })
    })
}

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
});
// Add a request interceptor
axiosClient.interceptors.request.use(async function (config) {
    // Do something before request is sent
    const token = await getFirebaseToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axiosClient