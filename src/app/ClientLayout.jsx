'use client';

import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/common/ScrollToTop';
import DoctorChatBot from '../components/common/DoctorChatBot';
import CartNotification from '../components/common/CartNotification';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';
import useUserStore from '../store/userStore';
import useRewardsStore from '../store/rewardsStore';
import useLocationStore from '../store/locationStore';
import useCheckoutStore from '../store/checkoutStore';

export default function ClientLayout({ children }) {
  const showNotification = useCartStore(state => state.showNotification);
  const lastAddedProduct = useCartStore(state => state.lastAddedProduct);
  const hideNotification = useCartStore(state => state.hideNotification);

  // Rehydrate all persisted stores after client mount.
  // skipHydration: true in each store prevents localStorage from being read
  // during SSR, avoiding the server/client mismatch that crashes hydration.
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();
    useUserStore.persist.rehydrate();
    useRewardsStore.persist.rehydrate();
    useLocationStore.persist.rehydrate();
    useCheckoutStore.persist.rehydrate();
  }, []);

  return (
    <>
      <div className="App min-h-screen flex flex-col">
        <ScrollToTop />
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </div>

      {showNotification && lastAddedProduct && (
        <CartNotification
          product={lastAddedProduct}
          onClose={hideNotification}
        />
      )}

      <DoctorChatBot />

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
