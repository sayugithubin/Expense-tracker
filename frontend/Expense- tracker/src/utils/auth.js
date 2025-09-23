import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export function observeUser(callback) {
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser() {
  return auth.currentUser;
}

export async function logout() {
  await signOut(auth);
}
