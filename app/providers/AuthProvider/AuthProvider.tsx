import React, { createContext, useContext, useEffect, useState, FC } from 'react';
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import useGoogleSignIn, { TOKEN_KEY } from "../../hooks/useGoogleSignIn";
import { doc, onSnapshot } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext<any>({});

export const AuthProvider: FC<any> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [initializing, setInitializing] = useState(true);
    const [userFirestore, setUserFirestore] = useState<any | null>(null);
    const { signInWithGoogle, signOut } = useGoogleSignIn();

    useEffect(() => {
        const fetchData = async (user: User | null) => {
            if (user) {
                try {
                    const userDocRef = doc(db, 'users', user.uid);

                    // Listen for real-time updates using onSnapshot
                    const unsubscribe = onSnapshot(userDocRef, (doc) => {
                        if (doc.exists()) {
                            setUserFirestore(doc.data());
                        } else {
                            // Handle the case when the document doesn't exist
                            setUserFirestore(null);
                        }
                    });

                    return () => unsubscribe(); // Cleanup the subscription when component unmounts
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                setUserFirestore(null);
            }
        };

        const checkSavedAuth = async () => {
            try {
                const savedUser = await AsyncStorage.getItem(TOKEN_KEY);
                if (savedUser) {
                    const parsedUser = JSON.parse(savedUser);
                    setUser(parsedUser);
                    fetchData(parsedUser);
                }
            } catch (error) {
                console.error('Error checking saved authentication:', error);
            } finally {
                setInitializing(false);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user || null);
            if (user) {
                // Save user data to AsyncStorage when logged in
                AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(user));
            } else {
                // Clear saved user data when logged out
                AsyncStorage.removeItem(TOKEN_KEY);
            }
            fetchData(user);
        });

        // Check for saved authentication on component mount
        checkSavedAuth();

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, initializing, userFirestore }}>
            {children}
        </AuthContext.Provider>
    );
};
