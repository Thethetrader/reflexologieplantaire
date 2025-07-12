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
      <nav className="bg-white fixed w-full top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Mobile: logo */}
              <span className="block md:hidden">
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <Image
                    src="/logo reflexologie 2025 lighter.jpg"
                    alt="Logo Reflexologie"
                    width={40}
                    height={40}
                    className="object-contain h-10 w-10"
                    priority
                  />
                </button>
              </span>
              {/* Desktop: texte */}
              <span className="hidden md:block text-2xl font-bold text-gray-900">Reflexologie plantaire</span>
            </div>
            {/* Menu hamburger mobile */}
            <div className="block md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
              >
                <svg className="h-7 w-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          {/* Menu mobile déroulant */}
          {menuOpen && (
            <div className="md:hidden absolute right-4 top-16 bg-white shadow-lg rounded-lg py-4 px-6 z-50 border border-gray-200">
              <a href="#" className="block py-2 px-4 text-gray-900 hover:text-purple-600">Réflexologie plantaire</a>
              <a href="#" className="block py-2 px-4 text-gray-900 hover:text-purple-600">Tom Robert</a>
              <a href="#" className="block py-2 px-4 text-gray-900 hover:text-purple-600">Tarif</a>
              <a href="#" className="block py-2 px-4 text-gray-900 hover:text-purple-600">Contact</a>
              <a href="#" className="block py-2 px-4 text-gray-900 hover:text-purple-600">Prise de rendez-vous</a>
              <a href="#" className="block py-2 px-4 text-gray-900 hover:text-purple-600">La communauté</a>
            </div>
          )}
        </div>
      </nav>

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
        <div ref={praticienRef} className="relative z-10 py-20 bg-white md:mt-[100vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              
              {/* Image */}
              <div className="lg:w-1/2 flex flex-col items-center justify-start" style={{ marginTop: '-3rem' }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="w-80 h-80 rounded-lg overflow-hidden mx-auto shadow-xl"
          >
            <Image
                    src="/Brad_Pitt_2019_by_Glenn_Francis.jpg"
                    alt="Tom Robert - Réflexologue"
                    width={320}
                    height={320}
                    className="object-cover w-full h-full"
                    style={{ objectPosition: 'center 15%' }}
                  />
                </motion.div>
              </div>
              
              {/* Content */}
              <div className="lg:w-1/2">
                <h2 className="text-5xl font-bold text-gray-900 mb-8 text-center md:text-left">Tom Robert</h2>
                <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Réflexologue diplômé</h3>
                
                <div className="space-y-6 text-lg text-gray-600 text-center">
                  <p>
                    Passionné par le bien-être et les médecines naturelles, je vous accompagne dans votre quête d'équilibre et de santé grâce à la réflexologie plantaire.
                  </p>
                  
                  <p>
                    Diplômé en réflexologie et fort de plusieurs années d'expérience, j'ai à cœur de vous offrir un moment de détente profonde tout en travaillant sur vos maux du quotidien.
                  </p>
                  
                  <p>
                    Mon approche est personnalisée et bienveillante, adaptée à chacun pour vous permettre de retrouver harmonie et vitalité.
                  </p>
                </div>
                
              </div>
              
            </div>
          </div>
          {/* Diplômes centrés sur toute la largeur */}
          <div className="mt-12 w-full flex justify-center">
            <div className="flex flex-row gap-8 items-center justify-center">
              <div className="transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded">
                <Image
                  src="/diplome-reflexologie.jpeg"
                  alt="Diplôme de réflexologie plantaire"
                  width={900}
                  height={630}
                  className="object-contain rounded shadow-lg"
                />
              </div>
              <div className="transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded">
                <Image
                  src="/certificat-reflexologie.jpeg"
                  alt="Certificat de Réflexologie Traditionnelle & Evolutive"
                  width={900}
                  height={630}
                  className="object-contain rounded shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="relative z-10 py-20" style={{ background: 'linear-gradient(to bottom, #fff 0%, #ECE5D9 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8 text-center">
              
              {/* Question 1 */}
              <div className="text-center mb-8">
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 uppercase">
                  MAIS EN FAIT, C'EST QUOI LA RÉFLEXOLOGIE ?
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                  C'est une méthode naturelle qui stimule des zones précises situées sous les pieds et dans les mains, en lien direct avec les organes, les muscles et les fonctions du corps. Le but ? Relâcher les tensions, rééquilibrer l'organisme et activer ses capacités d'auto-guérison.
                </p>
              </div>
              
              {/* Question 2 */}
              <div className="text-center">
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-6 uppercase">
                  MAIS EN FAIT, TU SOIGNES QUOI ?
                </h3>
              </div>

              {/* Résumé en 4 cadres - mobile uniquement, 2 par ligne */}
              <div className="mt-10 grid grid-cols-2 gap-4 md:hidden">
                {/* Carte 1 : de la gauche */}
                <div
                  className="bg-gradient-to-br from-[#f8f9fa] to-[#ece5d9] rounded-2xl shadow-xl p-4 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl text-xs"
                >
                  <span className="text-4xl mb-2">😴</span>
                  <h4 className="font-semibold text-base mb-1 text-black">Sommeil & Stress</h4>
                  <p className="text-gray-600 text-xs">Améliore le sommeil, réduit le stress et l’anxiété.</p>
                </div>
                {/* Carte 2 : de la droite */}
                <div
                  className="bg-gradient-to-br from-[#f8f9fa] to-[#ece5d9] rounded-2xl shadow-xl p-4 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl text-xs"
                >
                  <span className="text-4xl mb-2">🤕</span>
                  <h4 className="font-semibold text-base mb-1 text-black">Douleurs & Tensions</h4>
                  <p className="text-gray-600 text-xs">Soulage maux de tête, douleurs chroniques, tensions musculaires.</p>
                </div>
                {/* Carte 3 : de la gauche */}
                <div
                  className="bg-gradient-to-br from-[#f8f9fa] to-[#ece5d9] rounded-2xl shadow-xl p-4 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl text-xs"
                >
                  <span className="text-4xl mb-2">🍽️</span>
                  <h4 className="font-semibold text-base mb-1 text-black">Digestion & Fatigue</h4>
                  <p className="text-gray-600 text-xs">Aide la digestion, booste l’énergie, lutte contre la fatigue.</p>
                </div>
                {/* Carte 4 : de la droite */}
                <div
                  className="bg-gradient-to-br from-[#f8f9fa] to-[#ece5d9] rounded-2xl shadow-xl p-4 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl text-xs"
                >
                  <span className="text-4xl mb-2">⚖️</span>
                  <h4 className="font-semibold text-base mb-1 text-black">Hormones & Bien-être</h4>
                  <p className="text-gray-600 text-xs">Régule les hormones, équilibre le corps, favorise le bien-être.</p>
                </div>
              </div>
              
              {/* Section Tarif déplacée ici */}
              <div className="relative z-10 py-2">
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
                  </div>
                </div>
              </div>
              {/* Nouvelle question/réponse */}
              <div>
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 uppercase">ET TU PRATIQUES OÙ ?</h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">Dans divers cabinets à Paris, à domicile, sur ton lieu de travail, à ton pop-up store, ou même en backstage avant ou après ton concert.</p>
              </div>
              {/* Question pour qui déplacée en dernier */}
              <div className="text-center mt-8">
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 uppercase">MAIS EN FAIT, C'EST POUR QUI ?</h3>
                <p className="text-lg md:text-2xl text-black font-bold uppercase mb-4">TOUS LE MONDE.</p>
                <button
                  className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 mt-4"
                >
                  Réserve ta séance
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section Contact */}
        <div className="relative z-10 py-20 bg-white">
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

        {/* Instagram Gallery Section */}
        <div className="relative z-10 py-20" style={{ background: 'linear-gradient(to bottom, #ECE5D9 0%, #fff 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">La Communauté</h2>
            </div>
            
            {/* Instagram Feed Placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1,2,3,4,5,6,7,8].map((num, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="aspect-square bg-white rounded-lg overflow-hidden shadow-xl flex items-center justify-center"
                >
                  <img
                    src={`/${num}.jpg`}
                    alt={`Photo ${num}`}
                    className="object-cover w-full h-full transition-all duration-300 hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a
                href="https://www.instagram.com/reflexologie__plantaire/?igsh=MTc2b2NveWs4Y3pnYQ%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
                className="inline-block bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
          >
                Voir le feed Instagram
          </a>
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
