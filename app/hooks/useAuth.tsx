import {useContext} from "react";
import {AuthContext} from "../providers/AuthProvider/AuthProvider";
import {User} from "firebase/auth";
import {IFUser} from "../providers/AuthProvider/types";

type AuthHookType = {
    user: User | null;
    userFirestore: IFUser | null;
    initializing: boolean;
};

export const useAuth = (): AuthHookType => useContext(AuthContext)
