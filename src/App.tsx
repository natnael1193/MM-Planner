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
// ----------------------------------------------------------------------

export default function App() {
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
              <Router />
            </MotionLazyContainer>
          </RtlLayout>
        </ThemeColorPresets>
      </ThemeProvider>
    </Provider>
  );
}
