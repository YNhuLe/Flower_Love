// import { createContext, ReactNode,useState, useContext, useEffect } from "react";
// import { onAuthStateChanged, User } from "firebase/auth";
// // import { auth } from "../firebase/config";
// interface AuthContextType{
// firebaseUser : User | null,
// isAuthReady: boolean;
// }

// const AuthContext = createContext<AuthContextType>({
//     firebaseUser : null,
//     isAuthReady: false,
// })

// function AuthProvider({children}: {children: ReactNode}){
//     const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

// const [isAuthReady, setIsAuthReady] = useState(false);

//     useEffect(() =>{
//         const unsub = onAuthStateChanged(auth, (user) =>{
//             setFirebaseUser(user);
//             setIsAuthReady(true)
//         });
//         return unsub;
//     }, []);

//     return (
//         <AuthContext.Provider value={{firebaseUser, isAuthReady}}>


//             {children}
//         </AuthContext.Provider>
//     )
// }
// export function useAuth() {
//   return useContext(AuthContext);
// }
// export {AuthProvider};
// export default AuthContext;