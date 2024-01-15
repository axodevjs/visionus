import React, { createContext, useContext, useEffect, useState, FC } from 'react';
import { User, onAuthStateChanged } from "firebase/auth";
import {auth, db} from "../../firebase/firebase";
import useGoogleSignIn from "../../hooks/useGoogleSignIn";
import { doc, onSnapshot } from 'firebase/firestore';
import {ActivityIndicator} from "nativewind/dist/preflight";
import {View} from "react-native";

export const AuthContext = createContext<any>({});

export const AuthProvider: FC<any> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [initializing, setInitializing] = useState(true);
    const [userFirestore, setUserFirestore] = useState<any | null>(null);
    const {signInWithGoogle, signOut} = useGoogleSignIn()

    useEffect(() => {
            signInWithGoogle(true)
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
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setUser(user || null);
                fetchData(user)
            });

            return unsubscribe;
        },
        []);

    return (
        <AuthContext.Provider value={{ user, initializing, userFirestore }}>
            {children}
        </AuthContext.Provider>
    );
};
