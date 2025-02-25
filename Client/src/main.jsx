import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './app/store'
import { useLoadUserQuery } from './features/api/authapi'

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>{isLoading ? "Loading" : <>{children}</>}</>;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Custom>
      <App />
      </Custom>
   
    </Provider>
    
  </StrictMode>,
)
