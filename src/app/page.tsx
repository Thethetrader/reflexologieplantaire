'use client'

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  // plus d'effet FAQ
  // Pour masquer le hero mobile quand la section praticien arrive
  const [showMobileHero, setShowMobileHero] = useState(true);
  const praticienRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        // This effect is no longer needed as faqVisible is removed
      },
      { threshold: 0.2 }
    );
    // This observer is no longer needed as faqRef is removed
    return () => {
      // This cleanup is no longer needed as faqRef is removed
    };
  }, []);

  useEffect(() => {
    // Scroll mobile : cacher le hero mobile si on scroll
    const handleScroll = () => {
      if (window.innerWidth < 768 && praticienRef.current) {
        const rect = praticienRef.current.getBoundingClientRect();
        setShowMobileHero(rect.top > 60); // 60px pour la nav
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ajout d'un état pour déclencher l'effet FAQ
  const [faqVisible, setFaqVisible] = useState(false);
  const faqRef = useRef(null);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setFaqVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (faqRef.current) observer.observe(faqRef.current);
    return () => { if (faqRef.current) observer.unobserve(faqRef.current); };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #f8f9fa 0%, #f5e9da 100%)' }}>
      {/* Navigation */}
      <nav className="bg-white fixed w-full top-0 z-50 border-b border-gray-200 hidden md:block shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Desktop: texte */}
            <span className="text-2xl font-bold text-gray-900">Reflexologie plantaire</span>
            {/* Liens de navigation desktop */}
            <div className="flex gap-8">
              <a href="#" className="text-gray-900 hover:text-purple-600 font-medium">Réflexologie plantaire</a>
              <a href="#" className="text-gray-900 hover:text-purple-600 font-medium">Tom Robert</a>
              <a href="#" className="text-gray-900 hover:text-purple-600 font-medium">Tarif</a>
              <a href="#" className="text-gray-900 hover:text-purple-600 font-medium">Contact</a>
              <a href="#" className="text-gray-900 hover:text-purple-600 font-medium">Prise de rendez-vous</a>
              <a href="#" className="text-gray-900 hover:text-purple-600 font-medium">La communauté</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Barre flottante mobile */}
      <div className="fixed top-0 left-0 w-full h-14 bg-white/60 shadow-md flex items-center justify-between px-4 z-[100] md:hidden backdrop-blur">
        {/* Logo à gauche */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Image
            src="/logo reflexologie 2025 lighter.jpg"
            alt="Logo Reflexologie"
            width={36}
            height={36}
            className="object-contain h-9 w-9"
            priority
          />
        </button>
        {/* Bouton RDV centré */}
        <button
          className="absolute left-1/2 -translate-x-1/2 bg-black text-white rounded-full px-4 py-1 text-sm font-bold shadow-md"
          onClick={() => {
            const contact = document.getElementById('contact');
            if (contact) contact.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          RDV
        </button>
        {/* Menu hamburger à droite */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
        >
          <svg className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden z-0 md:fixed md:inset-0 md:min-h-screen md:mt-0 bg-gray-400 md:bg-white py-[30rem] md:py-0">
        {/* Background Image */}
        <div className="absolute inset-0 bg-white">
        <Image
            src="/logo reflexologie 2025 lighter.jpg"
            alt="Reflexologie background"
            fill
            className="object-contain h-40 md:object-cover md:h-auto mt-48 md:mt-0"
            style={{ objectPosition: 'top center' }}
          priority
        />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-transparent"></div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center absolute inset-0 z-10 mt-80 md:mt-[56rem]">
          <h1 className="text-4xl md:text-8xl font-bold mb-6 md:mb-8 leading-tight text-black text-center">REFLEXOLOGIE<br />PLANTAIRE</h1>
          <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg transition-all duration-300 transform hover:scale-105">Réserve ta séance</button>
        </div>
      </div>

      {/* Contenu du site après le hero, sans fond supplémentaire */}
      <div className="w-full">
        {/* Practitioner Section */}
        <motion.div
          ref={praticienRef}
          className="relative z-10 py-0 md:py-20 bg-white md:mt-[100vh]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto md:px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              
              {/* Image */}
              <div className="lg:w-1/2 flex flex-col items-start justify-start w-full md:w-auto" style={{ marginTop: '-3rem' }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative w-2/3 max-w-xs md:w-80 md:h-80 md:rounded-lg md:overflow-hidden transition-all duration-300 md:hover:scale-105 md:hover:shadow-2xl active:scale-125 mb-2 md:mb-8 ml-0"
                >
                  <Image
                    src="/Brad_Pitt_2019_by_Glenn_Francis.jpg"
                    alt="Tom Robert - Réflexologue"
                    width={320}
                    height={320}
                    className="object-cover w-full h-full md:rounded-lg"
                    style={{ objectPosition: 'center 15%' }}
                  />
                </motion.div>
              </div>
              
              {/* Content */}
              <div className="lg:w-1/2">
                {/* TOM ROBERT centré au-dessus de la photo sur mobile, au-dessus sur desktop */}
                <div className="block md:hidden w-full mb-2">
                  <h2 className="text-lg font-bold text-black uppercase text-center w-full">TOM ROBERT</h2>
                </div>
                <h2 className="hidden md:block text-2xl font-bold text-gray-900 uppercase mb-4 text-left">TOM ROBERT</h2>
                
                <div className="space-y-6 text-sm md:text-lg text-gray-600 text-center md:text-left">
                  <p>
                    La réflexologie est un moyen agréable, précis et efficace de <span className="font-bold text-black">rétablir l'équilibre naturellement.</span>
                  </p>
                  <p>
                    Je suis spécialisé en réflexologie plantaire.
                  </p>
                  <p>
                    Toutefois je connais bien les désagréments collatéraux que les positions de bureau peuvent engendrer. Je les ai éprouvés de nombreuses années.
                  </p>
                  <p>
                    Sensible aux médecines naturelles depuis toujours, et diplômé de la FLMNE, je vous propose qu'ensemble nous <span className="font-bold text-black">évacuons les blocages et renforcions votre niveau d'énergie</span>, pour que vous rayonnez dans votre vie globale et d'entreprise.
                  </p>
                </div>
                
              </div>
              
            </div>
          </div>
          {/* Diplômes : carrousel horizontal sur mobile, côte à côte sur desktop */}
          <div className="mt-12 w-full">
            {/* Mobile : carrousel horizontal infini */}
            <div className="block md:hidden overflow-x-auto scroll-smooth snap-x snap-mandatory">
              <motion.div
                className="flex gap-6"
                animate={{ x: [0, -340] }}
                transition={{ repeat: Infinity, duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 40, ease: "linear" }}
                style={{ touchAction: 'pan-x' }}
              >
                {["/diplome-reflexologie.jpeg", "/certificat-reflexologie.jpeg", "/diplome-reflexologie.jpeg", "/certificat-reflexologie.jpeg"].map((src, i) => (
                  <div key={i} className="min-w-[320px] max-w-xs flex-shrink-0 snap-center">
                    <div className="relative transition-all duration-300 scale-75 md:scale-100 md:hover:scale-105 md:hover:shadow-2xl active:scale-125">
                      <Image
                        src={src}
                        alt="Diplôme de réflexologie plantaire"
                        width={800}
                        height={560}
                        className="rounded-lg shadow-md w-full"
                      />
                      <div className="absolute inset-0 rounded-lg" style={{ background: 'rgba(236, 229, 217, 0.35)' }} />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            {/* Desktop : côte à côte comme avant */}
            <div className="hidden md:flex flex-row items-center justify-center gap-12 mb-4">
              <motion.div
                className="relative transition-all duration-300 scale-100 md:hover:scale-105 md:hover:shadow-2xl active:scale-125"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <Image
                  src="/diplome-reflexologie.jpeg"
                  alt="Diplôme de réflexologue plantaire"
                  width={800}
                  height={560}
                  className="rounded-lg shadow-md w-full md:w-[800px] md:h-[560px]"
                />
                <div className="absolute inset-0 rounded-lg" style={{ background: 'rgba(236, 229, 217, 0.35)' }} />
              </motion.div>
              <motion.div
                className="relative transition-all duration-300 scale-100 md:hover:scale-105 md:hover:shadow-2xl active:scale-125"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <Image
                  src="/certificat-reflexologie.jpeg"
                  alt="Certificat de Réflexologie Traditionnelle & Evolutive"
                  width={800}
                  height={560}
                  className="rounded-lg shadow-md w-full md:w-[800px] md:h-[560px]"
                />
                <div className="absolute inset-0 rounded-lg" style={{ background: 'rgba(236, 229, 217, 0.35)' }} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <div className="relative z-10 py-20" style={{ background: 'linear-gradient(to bottom, #fff 0%, #ECE5D9 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8 text-center">
              
              {/* Question 1 */}
              <div className="text-center mb-8">
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 uppercase">
                  MAIS EN FAIT, C'EST QUOI LA RÉFLEXOLOGIE PLANTAIRE ?
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                  Pour plus de détails sur la réflexologie, voici ma définition personnelle :<br/>
                  La réflexologie est une approche <span className="font-bold text-black">thérapeutique et préventive</span> dont les fondements tissent leurs racines dans la médecine traditionnelle chinoise, et qui <span className="font-bold text-black">actualisée à nos vies "modernes"</span> constitue une solution n-aturelle et non intrusive vers l'équilibre du corps et de son âme. Schématiquement, elle s'articule autour de la <span className="font-bold text-black">stimulation de zones réflexes</span> (des pieds, des mains, du visage, de la tête, etc.), qui par de simples mais précises pressions permettent d'agir sur la <span className="font-bold text-black">circulation de l'énergie de l'ensemble du corps.</span>
                </p>
                {/* Trait animé après la réponse */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: '100%', opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="h-1 bg-gray-300 rounded-full mx-auto mb-8"
                  style={{ maxWidth: 120 }}
                />
              </div>
              
              {/* Question 2 */}
              <div className="text-center">
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 uppercase">
                  MAIS EN FAIT, TU SOIGNES QUOI ?
                </h3>
              </div>

              {/* Résumé en 4 cadres - mobile uniquement, 2 lignes de 2 cadres */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Carte 1 : Sommeil & Stress */}
                <motion.div
                  className="bg-gradient-to-br from-[#f8f9fa] to-[#ece5d9] rounded-2xl shadow-xl p-4 flex flex-col items-center text-center transition-all duration-300 active:scale-125"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <span className="text-3xl mb-2">😴</span>
                  <h4 className="font-semibold text-base mb-1 text-black">Sommeil & Stress</h4>
                  <p className="text-gray-600 text-xs">Améliore le sommeil, réduit le stress et l’anxiété.</p>
                </motion.div>
                {/* Carte 2 : Douleurs & Tensions */}
                <motion.div
                  className="bg-gradient-to-br from-[#f8f9fa] to-[#ece5d9] rounded-2xl shadow-xl p-4 flex flex-col items-center text-center transition-all duration-300 active:scale-125"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <span className="text-3xl mb-2">💆‍♂️</span>
                  <h4 className="font-semibold text-base mb-1 text-black">Douleurs & Tensions</h4>
                  <p className="text-gray-600 text-xs">Soulage les douleurs, libère les tensions corporelles.</p>
                </motion.div>
                {/* Carte 3 : Digestion */}
                <motion.div
                  className="bg-gradient-to-br from-[#f8f9fa] to-[#ece5d9] rounded-2xl shadow-xl p-4 flex flex-col items-center text-center transition-all duration-300 active:scale-125"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <span className="text-3xl mb-2">🌱</span>
                  <h4 className="font-semibold text-base mb-1 text-black">Digestion</h4>
                  <p className="text-gray-600 text-xs">Favorise une meilleure digestion et un transit régulier.</p>
                </motion.div>
                {/* Carte 4 : Énergie & Immunité */}
                <motion.div
                  className="bg-gradient-to-br from-[#f8f9fa] to-[#ece5d9] rounded-2xl shadow-xl p-4 flex flex-col items-center text-center transition-all duration-300 active:scale-125"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <span className="text-3xl mb-2">⚡️</span>
                  <h4 className="font-semibold text-base mb-1 text-black">Énergie & Immunité</h4>
                  <p className="text-gray-600 text-xs">Booste l’énergie, stimule les défenses naturelles.</p>
                </motion.div>
              </div>
              {/* Trait animé sous les 4 cadres */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: '100%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="h-1 bg-gray-300 rounded-full mx-auto mb-8"
                style={{ maxWidth: 120 }}
              />
              
              {/* Section Tarif déplacée ici */}
              <div className="relative z-10 mb-4">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h2
                    className="text-xl md:text-3xl font-bold text-gray-900 mb-4 uppercase text-center"
                  >
                    ET COMBIEN ÇA NOUS COUTE ?
                  </h2>
                  <div className="mb-2">
                    <p className="text-base md:text-xl text-gray-700 leading-relaxed text-center max-w-2xl mx-auto">
                      C'est <span className="text-black">80€</span> la séance de 1h et bien sûr, si tu en prends plusieurs c'est dégressif. 
                    </p>
                    <p className="text-base md:text-xl text-gray-700 leading-relaxed text-center max-w-2xl mx-auto">
                      3 séances te coûteront <span className="text-black">200€</span>, 5 séances <span className="text-black">350€</span>... Plus tu investis dans ton bien-être, plus c'est avantageux !
                    </p>
                    {/* Trait animé sous la réponse tarif */}
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      whileInView={{ width: '100%', opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      className="h-1 bg-gray-300 rounded-full mx-auto mt-4"
                      style={{ maxWidth: 120 }}
                    />
                  </div>
                </div>
              </div>
              {/* Nouvelle question/réponse */}
              <div>
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 uppercase">ET TU PRATIQUES OÙ ?</h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">Dans divers cabinets à Paris, à domicile, sur ton lieu de travail, à ton pop-up store, ou même en backstage avant ou après ton concert.</p>
                {/* Trait animé après la réponse */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: '100%', opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="h-1 bg-gray-300 rounded-full mx-auto mb-8"
                  style={{ maxWidth: 120 }}
                />
              </div>
              {/* Question pour qui déplacée en dernier */}
              <div className="text-center mt-0">
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 uppercase">MAIS EN FAIT, C'EST POUR QUI ?</h3>
                <p className="text-lg md:text-2xl text-black font-bold uppercase mb-4">TOUS LE MONDE.</p>
                {/* Trait animé après la réponse */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: '100%', opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="h-1 bg-gray-300 rounded-full mx-auto mb-8"
                  style={{ maxWidth: 120 }}
                />
                <button
                  className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 mt-2 md:mt-4"
                >
                  Réserve ta séance
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section Contact */}
        <div id="contact" className="relative z-10 py-20 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Prendre rendez-vous</h2>
            <form className="bg-white rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nom</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Ex : Dupont" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Prénom</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Ex : Marie" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Numéro de téléphone</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Ex : 06 12 34 56 78" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Forfait souhaité</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black">
                    <option value="" disabled selected>Choisissez un forfait</option>
                    <option value="1h">Séance 1h</option>
                    <option value="3h">Séance 3h</option>
                    <option value="6h">Séance 6h</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Adresse mail</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Ex : marie.dupont@email.com" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Raison de la prise de rendez-vous</label>
                <textarea className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" rows={4} placeholder="Ex : Douleurs au dos, envie de détente, gestion du stress..."></textarea>
              </div>
              <div className="text-center pt-4">
                <button type="submit" className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">Envoyer</button>
              </div>
            </form>
          </div>
        </div>

        {/* Instagram Gallery Section + Avis */}
        <div className="relative z-10 pt-8 md:pt-20 pb-2 min-h-[700px] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">La Communauté</h2>
            </div>
            {/* Instagram Feed Placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1,2,3,4,5,6,7,8,9,10,11,12].map((num, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Image
                    src={`/${num}.jpg`}
                    alt={`Photo Instagram ${num}`}
                    width={400}
                    height={400}
                    className="rounded-xl object-cover w-full h-48 md:h-64 shadow-lg"
                  />
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a
                href="https://www.instagram.com/reflexologie__plantaire/?igsh=MTc2b2NveWs4Y3pnYQ%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
                className="inline-block bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl text-lg flex items-center justify-center"
          >
                <Image src="/insta.png" alt="Instagram" width={36} height={36} className="object-contain h-9 w-9" />
          </a>
            </div>
            {/* Avis clients juste sous le bouton Instagram */}
            <div className="w-screen max-w-none px-0 my-12 relative left-1/2 right-1/2 -translate-x-1/2">
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 text-center">Ce qu'ils en pensent...</h2>
              <p className="text-base md:text-lg text-gray-700 text-center">Ils ont testé la réflexologie plantaire&nbsp;: voici leurs ressentis</p>
              <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory mt-8 pb-24">
                <motion.div
                  className="flex gap-6"
                  animate={{ x: [0, -1200] }}
                  transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                  style={{ touchAction: 'pan-x' }}
                >
                  {[
                    { name: "Sophie L.", text: "Un vrai moment de détente, je me sens tellement mieux après chaque séance !", note: 5 },
                    { name: "Julien M.", text: "J'avais des douleurs au dos, c'est la seule chose qui m'a vraiment soulagé.", note: 5 },
                    { name: "Claire P.", text: "Tom est très à l'écoute, je recommande à 100% !", note: 5 },
                    { name: "Marc D.", text: "Je dors beaucoup mieux depuis que j'ai commencé la réflexologie.", note: 5 },
                    { name: "Nathalie R.", text: "Une expérience unique, je ne connaissais pas du tout, je reviendrai.", note: 5 },
                    { name: "Isabelle T.", text: "Très pro, très doux, j'ai ressenti un vrai bien-être.", note: 5 },
                    { name: "Lucas B.", text: "J'ai testé par curiosité, et franchement, ça m'a bluffé.", note: 5 },
                    { name: "Amandine F.", text: "Mes migraines ont diminué, merci Tom !", note: 5 },
                    { name: "Olivier S.", text: "Ambiance zen, Tom prend le temps d'expliquer, top.", note: 5 },
                    { name: "Julie V.", text: "J'ai offert une séance à ma mère, elle a adoré.", note: 5 },
                    { name: "Karim E.", text: "Je recommande à tous ceux qui veulent prendre soin d'eux.", note: 5 },
                    { name: "Marine C.", text: "Après chaque séance, je me sens reboostée.", note: 5 },
                    { name: "Pauline G.", text: "Tom est passionné, ça se sent, super expérience.", note: 5 },
                    { name: "Vincent H.", text: "J'étais sceptique, mais j'ai vu la différence.", note: 5 },
                    { name: "Sébastien J.", text: "Très relaxant, parfait après une grosse semaine.", note: 5 },
                    { name: "Aurélie N.", text: "J'ai retrouvé de l'énergie, merci !", note: 5 },
                    { name: "Céline P.", text: "Un vrai plus pour ma récupération sportive.", note: 5 },
                    { name: "Benoît F.", text: "Accueil chaleureux, je recommande.", note: 5 },
                    { name: "Laure S.", text: "J'ai ressenti les effets dès la première séance.", note: 5 },
                    { name: "Antoine Z.", text: "Une bulle de bien-être, à refaire !", note: 5 },
                  ].map((avis, i) => (
                    <div key={i} className="min-w-[220px] max-w-xs bg-white rounded-2xl shadow-xl p-3 md:min-w-[320px] md:p-6 flex flex-col items-start justify-between snap-center">
                      <div className="flex items-center mb-2">
                        {Array.from({ length: avis.note }).map((_, j) => (
                          <span key={j} className="text-yellow-400 text-lg">★</span>
                        ))}
                      </div>
                      <p className="italic text-gray-700 mb-4">"{avis.text}"</p>
                      <span className="font-bold text-gray-900">{avis.name}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <style jsx global>{`
        ::placeholder {
          color: #4B5563 !important; /* gray-700 */
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
