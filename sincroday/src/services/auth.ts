import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type { UserCredential } from "firebase/auth";

export const registerUser = (email: string, password: string): Promise<UserCredential> =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email: string, password: string): Promise<UserCredential> =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = (): Promise<void> => signOut(auth);

export const getCurrentUser = () => auth.currentUser;
