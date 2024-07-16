import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigations/Navigation';

import { AppProvider } from './src/context/useAppContext';

const App = () => {
    return (
        <AppProvider>
            <SafeAreaProvider>
                <Navigation />
            </SafeAreaProvider>
        </AppProvider>
    )
}


export default App