import firebase from "firebase"

const userApi = {
    // call API to get current user
    getMe: () => {
        return new Promise((resolve, reject) => {
            const currentUser = firebase.auth().currentUser;
            setTimeout(() => {
                resolve({
                    id: currentUser.uid,
                    name: currentUser.email,
                    email: currentUser.email,
                    photo: currentUser.photoURL
                })
            }, 500)
        })
    }
}
export default userApi;