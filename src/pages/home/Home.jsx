import Hero from "../../components/home/Hero";
import Services from "../../components/home/Services";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import Testimonials from "../../components/home/Testimonials";
import CTA from "../../components/home/CTA";

import Navbar from
"../../components/layout/Navbar";

import Footer from
"../../components/layout/Footer";
import ScrollButton from "../../components/common/ScrollButton";

export default function Home(){

  return(

    <>

      {/* NAVBAR */}

      <Navbar />

      {/* MAIN */}

      <main
        className="

min-h-screen
bg-white

"

      >

        {/* HERO */}

        <section>

          <Hero />

        </section>

        {/* SERVICES */}

        <section>

          <Services />

        </section>

        {/* WHY CHOOSE US */}

        <section>

          <WhyChooseUs />

        </section>

        {/* TESTIMONIALS */}

        <section>

          <Testimonials />

        </section>

        {/* CTA */}

        <section>

          <CTA />

        </section>

      </main>

      {/* FOOTER */}

      <Footer />

      <ScrollButton />

    </>

  );

}