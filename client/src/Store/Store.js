import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Reducers/AuthReducer";

const Store = configureStore({
    reducer: {
        auth: authReducer, 
    }
})

export default Store;

// import create from "zustand";

// export const useAuthStore = create((set) => ({
//     auth: {
//         username: '',
//         active: false,
//     },
//     setUsername: (name) => set((state) => ({
//         auth: {
//             ...state.auth, username: name
//         }
//     }))
// }))