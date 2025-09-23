import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed

export const addTransaction = async (transaction) => {
  await addDoc(collection(db, "transactions"), transaction);
};

export const getTransactions = async () => {
  const snapshot = await getDocs(collection(db, "transactions"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
