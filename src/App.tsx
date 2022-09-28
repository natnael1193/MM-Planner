// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import ThemeColorPresets from './components/ThemeColorPresets';
import MotionLazyContainer from './components/animate/MotionLazyContainer';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginRouter from './routes/LoginRouter';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

const token = localStorage.getItem('login_token');

console.log(token);

export default function App() {
  const navigate = useNavigate();

  useEffect(() => { 

    if(token === null){
      navigate('/login')
    }

  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemeColorPresets>
          <RtlLayout>
            <MotionLazyContainer>
              <ProgressBarStyle />
              <Settings />
              <ScrollToTop />
              {/* <ToastContainer /> */}
              {token !== null ? <Router /> : <LoginRouter />}
            </MotionLazyContainer>
          </RtlLayout>
        </ThemeColorPresets>
      </ThemeProvider>
    </Provider>
  );
}
