import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase";

export function observeUser(callback) {
  // Set initial state immediately to avoid blank screen while Firebase initializes
  try {
    callback(auth.currentUser ?? null);
  } catch (_) {
    callback(null);
  }
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser() {
  return auth.currentUser;
}

export async function logout() {
  await signOut(auth);
}
