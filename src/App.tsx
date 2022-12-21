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
import toast, { Toaster } from 'react-hot-toast';
// ----------------------------------------------------------------------

const token = localStorage.getItem('login_token');

console.log(token);

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate('/login');
    }

    setTimeout(() => {
      localStorage.clear();
      navigate('/signin');
      window.location.reload();
    }, 21600000);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     localStorage.clear();
  //     navigate("/signin");
  //     window.location.reload();
  //   }, 21600000);
  // }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemeColorPresets>
          <RtlLayout>
            <MotionLazyContainer>
              <ProgressBarStyle />
              <Settings />
              <ScrollToTop />
              <Toaster />
              {token !== null ? <Router /> : <LoginRouter />}
            </MotionLazyContainer>
          </RtlLayout>
        </ThemeColorPresets>
      </ThemeProvider>
    </Provider>
  );
}
