import React from 'react';
import Hero from '../components/landingPage/Hero';
import Section from '../components/landingPage/Section ';
import Footer from '../components/landingPage/Footer';
import Testimonial from '../components/landingPage/Testimonial';
import AboutUs from '../components/landingPage/AboutUs';

const Home = () => {
  return (
    <>
      <div>
        <Hero />
        <Section />
        <AboutUs />
        <Testimonial />
      </div>
      <Footer />
    </>
  );
};

export default Home;
