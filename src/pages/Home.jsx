import React from 'react';
import Hero from '../components/Hero';
import Section from '../components/Section ';
import Footer from '../components/Footer';
import Testimonial from '../components/Testimonial';
import AboutUs from '../components/AboutUs';

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
