import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast"
import store, { persistor } from './redux/store.js'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export const BASE_URL="http://localhost:8080/api/v1"

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <Toaster
                toastOptions={{
                    duration: 4000,
                }}
            />
            <App />
        </BrowserRouter>
        </PersistGate>
    </Provider>
)
