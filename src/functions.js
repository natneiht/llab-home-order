import { db } from "./firebase";
import firebase from "firebase";

export function formatCurrency(num) {
  if (num == null) num = 0;
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " VNĐ";
}

export async function logginAction(userName, password) {
  var user = firebase.auth().currentUser;
  let loginStatus;
  // console.log(user);
  if (!user) {
    const loginStatus = await firebase
      .auth()
      .signInWithEmailAndPassword(userName, password);
    // console.log(loginStatus);
  } else {
    loginStatus = user;
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const loginStatus = 1;
      localStorage.setItem("loginStatus", loginStatus);
    } else {
      // const loginString = JSON.stringify({status: false, userRole: -1});
      localStorage.removeItem("loginStatus");
      // Implement logic to trigger the login dialog here or redirect to sign-in page.
      // e.g. showDialog()
    }
  });
  return loginStatus;
}

export function signOut() {
  firebase
    .auth()
    .signOut()
    .then((result) => console.log(result));
}
