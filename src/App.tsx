import { Helmet } from 'react-helmet-async'
import VisitorGate from './components/VisitorGate'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Experience from './components/Experience'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Helmet>
        {/* Primary */}
        <title>Sabeel Ijaz — Full-Stack Software Engineer | Open to Work in Germany</title>
        <meta name="description" content="Sabeel Ijaz is a Full-Stack Software Engineer with 7+ years of expertise in Java, Node.js, Angular, React, and AWS. Open to software engineer roles in Germany — experienced in scalable web applications, REST APIs, and cloud architecture." />
        <meta name="keywords" content="Sabeel Ijaz, Full-Stack Developer, Software Engineer, Java Developer, Node.js Developer, Angular Developer, React Developer, AWS, REST API, Web Developer, software engineer Germany, software developer Germany, open to work Germany, relocation Germany, Berlin developer, Munich developer, Hamburg developer, Frankfurt developer, hire software engineer, portfolio, Pakistan developer Germany" />
        <meta name="author" content="Sabeel Ijaz" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="canonical" href="https://sabeelijaz.me" />

        {/* Geo */}
        <meta name="geo.region" content="DE" />
        <meta name="geo.placename" content="Germany" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sabeelijaz.me" />
        <meta property="og:site_name" content="Sabeel Ijaz" />
        <meta property="og:title" content="Sabeel Ijaz — Full-Stack Software Engineer | Open to Work in Germany" />
        <meta property="og:description" content="Full-Stack Software Engineer with 7+ years in Java, Node.js, Angular, React, and AWS. Open to software engineer roles in Germany. Available for relocation." />
        <meta property="og:image" content="https://sabeelijaz.me/images/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Sabeel Ijaz — Full-Stack Software Engineer" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="de_DE" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sabeel Ijaz — Full-Stack Software Engineer | Open to Work in Germany" />
        <meta name="twitter:description" content="Full-Stack Software Engineer with 7+ years in Java, Node.js, Angular, React, and AWS. Open to software engineer roles in Germany. Available for relocation." />
        <meta name="twitter:image" content="https://sabeelijaz.me/images/og-image.png" />
        <meta name="twitter:image:alt" content="Sabeel Ijaz — Full-Stack Software Engineer" />
        <meta name="twitter:site" content="@sabeel_ijaz" />
        <meta name="twitter:creator" content="@sabeel_ijaz" />
      </Helmet>

      {/* <VisitorGate /> */}

      {/* Background */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow" aria-hidden="true" />

      <div className="main-content">
        <Navbar />
        <Hero />
        <Stats />
        <Experience />
        <Projects />
        <TechStack />
        <Services />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
