import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { firebaseService } from "./Firebase";

export class AuthService {
  constructor() {
    this._auth = getAuth(firebaseService.app);
  }

  authorizeUser() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this._auth, resolve, reject);
    });
  }

  async signInWitchGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this._auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
    } catch (error) {
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }

  getCurrentUser() {
    return this._auth.currentUser;
  }

  updateUserProfile(data) {
    return updateProfile(this._auth.currentUser, data);
  }

  signIn(email, password) {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  signUp(email, password) {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }

  logOut() {
    return signOut(this._auth);
  }
}

export const authService = new AuthService();
