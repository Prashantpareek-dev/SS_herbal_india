import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'SS Herbal India - Premium Ayurvedic Nutrition Products',
  description: 'SS Herbal India - Premium Ayurvedic nutrition products for holistic wellness. 100% natural, GMP & ISO certified.',
  keywords: 'ayurvedic products, herbal supplements, natural wellness, immunity booster, digestive health',
  icons: { icon: '/Images/image.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Montserrat:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

