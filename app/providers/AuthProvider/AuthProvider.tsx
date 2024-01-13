import React, { createContext, useContext, useEffect, useState, FC } from 'react';
import { User, onAuthStateChanged } from "firebase/auth";
import {auth, db} from "../../firebase/firebase";
import useGoogleSignIn from "../../hooks/useGoogleSignIn";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {IFUser} from "./types";

export const AuthContext = createContext<any>({});

export const AuthProvider: FC<any> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [initializing, setInitializing] = useState(true);
    const [userFirestoreData, setUserFirestoreData] = useState<any | null>(null);
    const {signInWithGoogle, signOut} = useGoogleSignIn()

    useEffect(() => {
            // signInWithGoogle(true)
            const fetchData = async (user: User | null) => {
                if (user) {
                    try {
                        const userDocRef = doc(db, 'users', user.uid);
                        const userDocSnap = await getDoc(userDocRef);

                        if (userDocSnap.exists()) {
                            setUserFirestoreData(userDocSnap.data());
                        } else {
                            await setDoc(userDocRef, {
                                displayName: user.displayName,
                                email: user.email,
                            });
                        }
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                    }
                } else {
                    setUserFirestoreData(null);
                }
            };
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setUser(user || null);
                setInitializing(false);
            });

            return unsubscribe;
        },
        []);

    return (
        <AuthContext.Provider value={{ user, initializing, userFirestoreData }}>
            {children}
        </AuthContext.Provider>
    );
};
