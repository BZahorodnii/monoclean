import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import Category from './pages/Category'
import Policy from './pages/Policy'
import Airbnb from './pages/landings/Airbnb'
import BusyProfessionals from './pages/landings/BusyProfessionals'
import Families from './pages/landings/Families'
import Seniors from './pages/landings/Seniors'
import First40 from './pages/landings/First40'
import First20PreOrder from './pages/landings/First20PreOrder'
import { ParallaxProvider } from 'react-scroll-parallax';

const App: React.FC = () => {
  return (
    <ParallaxProvider>
      <Router>
        <Routes>
          <Route path="/:lang?" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about-us" element={<About />} />
            <Route path=":lang?/blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="not-found" element={<NotFound />} />
            <Route path="policies/:slug" element={<Policy />} />
            <Route path="blog/category/:slug" element={<Category />} />
            <Route path="service/busy-professionals" element={<BusyProfessionals />} />
            <Route path="service/airbnb" element={<Airbnb />} />
            <Route path="service/families" element={<Families />} />
            <Route path="service/seniors" element={<Seniors />} />
          </Route>
          <Route path="/:lang?" element={<Layout hideHeader={true} hideFooter={true} />}>
            <Route path="service/first20" element={<First40 />} />
            <Route path="service/exclusive-cleaning-offer-toronto" element={<First20PreOrder />} />
          </Route>
          <Route path="/" element={<Layout />}>
            <Route path="*" element={<Navigate to="/not-found" replace={true} />} />
          </Route>
        </Routes>
      </Router>
    </ParallaxProvider>
  )
}

export default App;
