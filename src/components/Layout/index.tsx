import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import JoinWaitlist from '../dialogs/JoinWaitlist'
import BecomeACleaner from '../dialogs/BecomeACleaner'
import PartnerWithUs from '../dialogs/PartnerWithUs'
import ContactUs from '../dialogs/ContactUs'
import Breadcrumbs from '../Breadcrumbs'
import Cookies from 'js-cookie'
import useGetTranslations from '../../hooks/useGetTranslations'
import { useAppContext } from '../context/AppContext'
import { Helmet } from 'react-helmet'
import DownloadAppCleaners from '../dialogs/DownloadAppCleaners'
import DownloadAppCustomers from '../dialogs/DownloadAppCustomers'

interface LayoutProps {
  hideHeader?: boolean;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ hideHeader = false, hideFooter = false }) => {
  const { data, setData } = useAppContext();
  const { data: fetchedData, fetch } = useGetTranslations();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(params.lang || 'en');
  }, [params]);

  useEffect(() => {
    if (fetchedData) {
      setData({ ...data, ...fetchedData });
    }
  }, [fetchedData]);

  useEffect(() => {
    if (!Cookies.get('lang') && params.lang) {
      Cookies.set('lang', params.lang);
    }
    // Initial redirect if there is a lang param in cookies
    // if (Cookies.get('lang') && !params?.lang) {
    //   navigate(`${Cookies.get('lang')}${location.pathname}`, { replace: true });
    // }
  }, []);
  useEffect(() => {
    if (params.lang && params.lang !== 'fr') {
      navigate('/not-found', { replace: true });
    }
  }, [params]);

  const removeLanguagePrefix = (url: string, prefix: string) => {
    if (prefix.length && url.startsWith(`/${prefix}`)) {
      return url.substring(prefix.length + 1);
    }

    return url;
  }

  // if (params.lang && params.lang !== 'fr') {
  //   return <Navigate to="/not-found" replace={true} />;
  // }

  if (!fetchedData) return null;

  return (
    <>
      <Helmet htmlAttributes={{ lang: params?.lang || 'en' }}>
        <link rel="canonical" href={`https://monoclean.ca${removeLanguagePrefix(location.pathname, params.lang || '')}`} />
      </Helmet>
      <div>
        {!hideHeader && <Header />}
        <Breadcrumbs />
        <main>
          <Outlet />
        </main>
        {!hideFooter && <Footer />}
      </div>
      <JoinWaitlist />
      <BecomeACleaner />
      <PartnerWithUs />
      <ContactUs />
      <DownloadAppCleaners />
      <DownloadAppCustomers />
    </>
  );
}

export default Layout;