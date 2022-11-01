import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
function addAndInitAuth(firebaseConfig) {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
}
module.exports = { addAndInitAuth };