import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import userReducer from "../features/user/userSlice.js";


// create store
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
    devTools: true
});


// export
export default store;