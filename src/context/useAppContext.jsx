import React, { useContext, useReducer, createContext } from 'react';

const AppContext = createContext();

const initialState = {
    currentWorkout: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_WORKOUT':
            return {
                ...state,
                currentWorkout: action.payload,
            };
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const setCurrentWorkout = (workout) => {
        dispatch({ type: 'SET_CURRENT_WORKOUT', payload: workout });
    };

    return (
        <AppContext.Provider value={{ ...state, setCurrentWorkout }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
