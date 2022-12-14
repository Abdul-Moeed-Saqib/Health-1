import { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    // control auth tab to switch between login and signup
    const [tabValue, setTabValue] = useState("1");

    const [acceptedState, setAcceptState] = useState(false)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch, tabValue, setTabValue, acceptedState, setAcceptState }}>
            {children}
        </AuthContext.Provider>
    )
}