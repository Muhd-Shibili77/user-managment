import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import store from './redux/store.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </StrictMode>
  </Provider>
  
)