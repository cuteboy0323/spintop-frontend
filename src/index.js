import React, { Suspense, lazy } from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

// ** Import Providers
import MaterialThemeProvider from "./providers/theme";
import MuiSnackbarProvider from "./providers/snackbar";
import NotificationProvider from "./providers/notification";
import Web3Provider from "./providers/web3";
import { ValueProvider } from "./hooks/context"

import Spinner from "./components/Spinner";

const App = lazy(() => import("./App"));

ReactDOM.render(
    <React.StrictMode>
        <MaterialThemeProvider>
            {/* <Provider> */}
            <ValueProvider>
                <MuiSnackbarProvider>
                    <NotificationProvider>
                        <Web3Provider>
                            <Suspense
                                fallback={<Spinner />}
                            >
                                <App />
                            </Suspense>
                        </Web3Provider>
                    </NotificationProvider>
                </MuiSnackbarProvider>
            </ValueProvider>
            {/* </Provider> */}
        </MaterialThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
