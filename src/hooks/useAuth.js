import { useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escuchar cambios de autenticación
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((currentUser) => {
    console.log('Usuario actualizado:', currentUser);  // ← AGREGA ESTO
    setUser(currentUser);
    setLoading(false);
  });

  return () => unsubscribe();
}, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);

  return { user, loading, loginWithGoogle, logout };
}