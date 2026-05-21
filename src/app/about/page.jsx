import AboutPage from '../../pages/AboutPage';

export const metadata = {
  title: 'About Us | SS Herbal India',
  description:
    'Learn about SS Herbal India — our mission, values, and commitment to 100% natural Ayurvedic nutrition. GMP & ISO certified since inception.',
  openGraph: {
    title: 'About SS Herbal India',
    description:
      'Our mission is to bring authentic Ayurvedic wellness to every home in India.',
  },
};

export default function Page() {
  return <AboutPage />;
}
