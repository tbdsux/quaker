import { ToastContainer } from 'react-toastify';

const ToastWrapper = () => (
  <ToastContainer
    position="top-right"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

export { ToastWrapper };
