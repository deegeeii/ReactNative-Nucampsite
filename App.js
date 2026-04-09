// ─── Imports ────────────────────────────────────────────────────────────────
import Main from './screens/MainComponent';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/LoadingComponent';

// ─── Root Component ───────────────────────────────────────────────────────────
// App is the top-level component rendered by index.js.
// Provider makes the Redux store available to every component in the tree.
// NavigationContainer manages the navigation state for the whole app.


export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
                <NavigationContainer>
                    <Main />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}