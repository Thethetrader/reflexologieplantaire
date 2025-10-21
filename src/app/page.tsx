'use client'

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";


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

  // Ajout état pour la barre de progression
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ajout pour diplômes alternés mobile
  const diplomeImages = [
    "/Brad_Pitt_2019_by_Glenn_Francis.jpg", // photo Tom Robert
    "/diplome-reflexologie.jpeg",
    "/certificat-reflexologie.jpeg"
  ];
  const [diplomeIndex, setDiplomeIndex] = useState(0);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      const interval = setInterval(() => {
        setDiplomeIndex((prev) => (prev + 1) % diplomeImages.length);
      }, 4000); // 4 secondes
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="min-h-screen w-full" style={{ background: 'linear-gradient(to right, #ECE5D9 0%, #fff 100%)' }}>
      {/* Barre de progression mobile */}
      {/* (Suppression de la div de barre de progression tout en haut) */}
      {/* Navigation */}
      <nav className="bg-white fixed w-full top-0 z-50 hidden md:block" style={{ background: 'linear-gradient(to bottom, #fff 90%, rgba(0,0,0,0.15) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Desktop: texte */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-2xl font-bold text-gray-900 hover:text-purple-600 cursor-pointer transition-colors duration-200"
            >
              Reflexologie plantaire
            </button>
            {/* Liens de navigation desktop */}
            <div className="flex gap-8">
              <a href="#tom-robert" className="text-xl font-serif font-bold text-gray-900 hover:text-black transition-all duration-300 transform hover:scale-105" onClick={(e) => { e.preventDefault(); document.getElementById('tom-robert')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>Tom Robert</a>
              <a href="#tarif" className="text-xl font-serif font-bold text-gray-900 hover:text-black transition-all duration-300 transform hover:scale-105" onClick={(e) => { e.preventDefault(); const element = document.getElementById('tarif'); if (element) { const offset = 80; const elementPosition = element.getBoundingClientRect().top; const offsetPosition = elementPosition + window.pageYOffset - offset; window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); } }}>Tarif</a>
              <a href="#contact" className="text-xl font-serif font-bold text-gray-900 hover:text-black transition-all duration-300 transform hover:scale-105" onClick={(e) => { e.preventDefault(); const element = document.getElementById('contact'); if (element) { const offset = 40; const elementPosition = element.getBoundingClientRect().top; const offsetPosition = elementPosition + window.pageYOffset - offset; window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); } }}>Contact</a>
              <a href="#communaute" className="text-xl font-serif font-bold text-gray-900 hover:text-black transition-all duration-300 transform hover:scale-105" onClick={(e) => { e.preventDefault(); const element = document.getElementById('communaute'); if (element) { const offset = 80; const elementPosition = element.getBoundingClientRect().top; const offsetPosition = elementPosition + window.pageYOffset - offset; window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); } }}>La communauté</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Barre flottante mobile */}
      <div className="fixed top-0 left-0 w-full h-14 bg-white/60 shadow-md flex items-center justify-between px-4 z-[100] md:hidden backdrop-blur">
        {/* Logo à gauche */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Image
            src="/logo-reflexologie-2025-lighter.jpg"
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
        {/* Menu mobile déroulant */}
        {menuOpen && (
          <div className="fixed top-14 left-0 w-full bg-white shadow-lg z-[200] flex flex-col items-center py-6 space-y-4 md:hidden">
            <a href="#tom-robert" className="text-xl font-serif font-bold text-gray-900 hover:text-black transition-all duration-300 transform hover:scale-105" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('tom-robert')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>Tom Robert</a>
            <a href="#tarif" className="text-xl font-serif font-bold text-gray-900 hover:text-black transition-all duration-300 transform hover:scale-105" onClick={(e) => { e.preventDefault(); setMenuOpen(false); const element = document.getElementById('tarif'); if (element) { const offset = 80; const elementPosition = element.getBoundingClientRect().top; const offsetPosition = elementPosition + window.pageYOffset - offset; window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); } }}>Tarif</a>
            <a href="#contact" className="text-xl font-serif font-bold text-gray-900 hover:text-black transition-all duration-300 transform hover:scale-105" onClick={(e) => { e.preventDefault(); setMenuOpen(false); const element = document.getElementById('contact'); if (element) { const offset = 40; const elementPosition = element.getBoundingClientRect().top; const offsetPosition = elementPosition + window.pageYOffset - offset; window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); } }}>Contact</a>
            <a href="#communaute" className="text-xl font-serif font-bold text-gray-900 hover:text-black transition-all duration-300 transform hover:scale-105" onClick={(e) => { e.preventDefault(); setMenuOpen(false); const element = document.getElementById('communaute'); if (element) { const offset = 80; const elementPosition = element.getBoundingClientRect().top; const offsetPosition = elementPosition + window.pageYOffset - offset; window.scrollTo({ top: offsetPosition, behavior: 'smooth' }); } }}>La communauté</a>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div className="fixed inset-0 min-h-screen flex items-center justify-center overflow-hidden z-0 md:fixed md:inset-0 md:min-h-screen md:mt-0 bg-transparent pb-8 md:py-0">
        {/* Background Image */}
        <div className="absolute inset-0 bg-white">
        <Image
            src="/logo-reflexologie-2025-lighter.jpg"
            alt="Reflexologie background"
            fill
            className="object-contain h-40 md:object-contain md:h-auto -mt-8 md:mt-0"
            style={{ objectPosition: 'center' }}
          priority
        />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-transparent"></div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center absolute inset-0 z-10 mt-32 md:mt-[56rem]">
          <h1 className="text-2xl md:text-8xl font-bold mb-6 md:mb-8 leading-tight text-black text-center mt-16 md:mt-8">REFLEXOLOGIE PLANTAIRE</h1>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                const offset = 40;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="bg-black hover:bg-gray-800 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg transition-all duration-300 transform hover:scale-105 mb-2 md:mb-8"
          >
            Réserve ta séance
          </button>
        </div>
      </div>

      {/* Bandeau beige sous le Hero */}
      <div style={{ width: '100%', height: '140px', background: '#ECE5D9' }} />

      {/* Contenu du site après le hero, sans fond supplémentaire */}
      <div className="w-full">
        {/* Practitioner Section */}
        <motion.div
          id="tom-robert"
          ref={praticienRef}
          className="relative pt-0 pb-0 md:py-20 md:mt-[100vh] mt-[620px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Fond dégradé en absolute, sous le contenu */}
          <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0, pointerEvents: 'none', background: 'linear-gradient(to bottom, #ECE5D9 0%, #fff 100%)' }} />
          {/* Contenu Tom Robert au-dessus */}
          <div className="relative z-10">
          
          {/* Vidéo au-dessus de la photo de Tom Robert */}
          <div className="w-full max-w-3xl mx-auto mb-8 relative z-20">
            <video 
              src="/videopied.mp4" 
              autoPlay 
              muted 
              playsInline 
              loop
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
          
          {/* Barre de progression mobile au-dessus de la photo */}
          {/* (Suppression de la div de barre de progression mobile) */}
          <div className="max-w-7xl mx-auto md:px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              
              {/* Image */}
              <div className="w-full flex flex-col items-center justify-center md:w-full md:max-w-none" style={{ marginTop: '-3rem' }}>
                {/* Titre TOM ROBERT au-dessus de la photo (mobile et desktop) */}
                {/* Mobile : diplômes alternés à la place de la photo de Tom */}
                <div className="relative w-[320px] h-[320px] max-w-xs md:w-full md:h-[1200px] md:rounded-lg md:overflow-hidden mb-0 md:mb-8 mt-12 mx-auto flex items-center justify-center md:max-w-none">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src="/Brad_Pitt_2019_by_Glenn_Francis.jpg"
                      alt="Tom Robert - Réflexologue"
                      width={1280}
                      height={1200}
                      className="object-cover w-full h-full md:rounded-lg"
                      style={{ objectPosition: 'center 15%' }}
                    />
                  </motion.div>
                </div>
              </div>
              
              {/* Content */}
              <div className="lg:w-1/2 flex flex-col items-center text-center">
                {/* TOM ROBERT centré au-dessus de la photo sur mobile, au-dessus sur desktop */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Tom Robert</h2>
                
                <div className="px-4 w-full">
                  {/* Barre noire décorative au-dessus du texte, mobile uniquement, animée */}
                  <motion.div
                    className="h-1 w-40 bg-black rounded-full mx-auto mb-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: '6rem' }}
                    animate={{ width: 0 }}
                    viewport={{ once: false, amount: 0.7 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                  <div className="text-base text-gray-600 mb-6 text-center">
                    <p className="text-gray-600">
                      La réflexologie est un moyen agréable, précis et efficace de rétablir l'équilibre naturellement.
                    </p>
                    <p className="text-gray-600">
                      Sensible aux médecines naturelles depuis toujours, et diplômé de la FLMNE, je vous propose qu'ensemble nous évacuons les blocages et renforcions votre niveau d'énergie, pour que vous rayonnez dans votre vie globale et d'entreprise.
                    </p>
                  </div>
                   {/* Barre noire décorative sous le texte, mobile uniquement, animée */}
                   <motion.div
                     className="h-1 w-40 bg-black rounded-full mx-auto mt-4"
                     initial={{ width: 0 }}
                     whileInView={{ width: '6rem' }}
                     animate={{ width: 0 }}
                     viewport={{ once: false, amount: 0.7 }}
                     transition={{ duration: 1.2, ease: 'easeOut' }}
                   />
                </div>
                
              </div>
              
            </div>
          </div>
          {/* Diplômes : carrousel horizontal sur mobile, côte à côte sur desktop */}
          <div className="mt-0 md:mt-4 mb-0 md:mb-2 w-full">
            {/* Desktop : côte à côte comme avant */}
            <div className="hidden md:flex flex-row items-center justify-center gap-12 md:mb-4">
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
              <motion.div
                className="relative transition-all duration-300 scale-100 md:hover:scale-105 md:hover:shadow-2xl active:scale-125"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Image
                  src="/diplome2.png"
                  alt="Diplôme de Réflexologie"
                  width={800}
                  height={560}
                  className="rounded-lg shadow-md w-full md:w-[800px] md:h-[560px]"
                />
                <div className="absolute inset-0 rounded-lg" style={{ background: 'rgba(236, 229, 217, 0.35)' }} />
              </motion.div>
            </div>
          </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <div className="relative z-10 pt-4 md:pt-8 pb-20" style={{ background: 'linear-gradient(to bottom, #fff 0%, #ECE5D9 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8 text-center">
              
              {/* Question 1 */}
              <div className="text-center mb-8 mt-24 md:mt-0">
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 uppercase">
                  C'EST QUOI LA RÉFLEXOLOGIE PLANTAIRE ?
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                  La réflexologie est une approche <span className="font-bold text-black">thérapeutique et préventive</span> dont les fondements tissent leurs racines dans la médecine traditionnelle chinoise, et qui <span className="font-bold text-black">actualisée à nos vies "modernes"</span> constitue une solution naturelle et non intrusive vers l'équilibre du corps et de son âme. Schématiquement, elle s'articule autour de la <span className="font-bold text-black">stimulation de zones réflexes</span> (des pieds, des mains, du visage, de la tête, etc.), qui par de simples mais précises pressions permettent d'agir sur la <span className="font-bold text-black">circulation de l'énergie de l'ensemble du corps</span>.
                </p>
                {/* Trait animé après la réponse, animé partout */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: '100%', opacity: 1 }}
                  animate={{ width: 0, opacity: 0 }}
                  viewport={{ once: false, amount: 0.7 }}
                  transition={{ duration: 0.7 }}
                  className="h-1 w-40 bg-gray-300 rounded-full mx-auto mb-8 mt-8"
                  style={{ maxWidth: 220 }}
                />
              </div>
              
              {/* Question 2 */}
              <div className="text-center">
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 uppercase">
                  MAIS EN FAIT, ÇA SOIGNE QUOI ?
                </h3>
              </div>

              {/* Résumé en 4 cadres - mobile uniquement, 2 lignes de 2 cadres */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Carte 1 : Sommeil & Stress */}
                <motion.div
                  className="bg-gradient-to-br from-[#f8f9fa] to-[#ece5d9] rounded-2xl shadow-xl p-4 flex flex-col items-center text-center transition-all duration-300 md:hover:scale-105 hover:shadow-2xl"
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
                  className="bg-gradient-to-br from-[#f8f9fa] to-[#ece5d9] rounded-2xl shadow-xl p-4 flex flex-col items-center text-center transition-all duration-300 md:hover:scale-105 hover:shadow-2xl"
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
                  className="bg-gradient-to-br from-[#f8f9fa] to-[#ece5d9] rounded-2xl shadow-xl p-4 flex flex-col items-center text-center transition-all duration-300 md:hover:scale-105 hover:shadow-2xl"
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
                  className="bg-gradient-to-br from-[#f8f9fa] to-[#ece5d9] rounded-2xl shadow-xl p-4 flex flex-col items-center text-center transition-all duration-300 md:hover:scale-105 hover:shadow-2xl"
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
              {/* Trait animé sous les 4 cadres, animé partout */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: '100%', opacity: 1 }}
                animate={{ width: 0, opacity: 0 }}
                viewport={{ once: false, amount: 0.7 }}
                transition={{ duration: 0.7 }}
                className="h-1 w-40 bg-gray-300 rounded-full mx-auto mb-8"
                style={{ maxWidth: 220 }}
              />
              
              {/* Section Tarif déplacée ici */}
              <div id="tarif" className="relative z-10 mb-4">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h2
                    className="text-xl md:text-3xl font-bold text-gray-900 mb-4 uppercase text-center"
                  >
                    ET COMBIEN ÇA NOUS COUTE ?
                  </h2>
                  <div className="mb-2">
                    <p className="text-base md:text-xl text-gray-700 leading-relaxed text-center max-w-2xl mx-auto">
                      Une séance est à <span className="text-black">80€</span>, et dure une heure.
                    </p>
                    <p className="text-base md:text-xl text-gray-700 leading-relaxed text-center max-w-2xl mx-auto">
                      Dans le cadre de cure, un tarif dégressif s'applique.
                    </p>
                    <p className="text-base md:text-xl text-gray-700 leading-relaxed text-center max-w-2xl mx-auto mt-2">
                      Une feuille de soin peut être établie, pour les mutuelles qui prennent en charge la médecine douce.
                    </p>
                    {/* Trait animé sous la réponse tarif */}
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      whileInView={{ width: '100%', opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      className="h-1 w-40 bg-gray-300 rounded-full mx-auto mt-4"
                      style={{ maxWidth: 120 }}
                    />
                  </div>
                </div>
              </div>
              {/* Nouvelle question/réponse */}
              <div>
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 uppercase">ET TU PRATIQUES OÙ ?</h3>
                <div className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 space-y-2">
                  <p>Je pratique dans deux cabinets à Paris :</p>
                  <ul className="list-disc list-inside ml-2 md:ml-4">
                    <li className="md:block"><span className="font-semibold text-black"><span className="hidden md:inline">•   </span>Centre Anima</span> — 31, r. de Maubeuge, 75009</li>
                    <li><span className="font-semibold text-black">Studio KAH</span> — 28, rue Bichat, 75010</li>
                  </ul>
                  <p>Mais aussi à domicile, sur ton lieu de travail, à ton pop-up store, ou même en backstage avant ou après ton concert.</p>
                </div>
                {/* Trait animé après la réponse */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: '100%', opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="h-1 w-40 bg-gray-300 rounded-full mx-auto mb-8 md:hidden"
                  style={{ maxWidth: 220 }}
                />
              </div>
              {/* Question pour qui déplacée en dernier */}
              <div className="text-center mt-8">
                {/* Barre décorative avant la question, visible sur ordi */}
                <div className="hidden md:block h-1 w-40 bg-gray-300 rounded-full mx-auto mb-6" />
                <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-4 uppercase">MAIS EN FAIT, C'EST POUR QUI ?</h3>
                <p className="text-lg md:text-2xl text-black font-bold uppercase mb-4">TOUS LE MONDE.</p>
                {/* Bouton RDV mobile après TOUS LE MONDE */}
                <div className="block md:hidden w-full text-center mb-4 mt-12">
                  <button
                    onClick={() => {
                      const element = document.getElementById('contact');
                      if (element) {
                        const offset = 40;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                      }
                    }}
                    className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Réserve ta séance
                  </button>
                </div>
                {/* Bouton RDV desktop avant la vidéo */}
                <div className="hidden md:block w-full text-center mb-4">
                  <button
                    onClick={() => {
                      const element = document.getElementById('contact');
                      if (element) {
                        const offset = 40;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                      }
                    }}
                    className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Réserve ta séance
                  </button>
                </div>
                {/* Vidéo autoplay visible seulement sur ordi */}
                <div className="hidden md:block w-full max-w-3xl mx-auto my-8 relative z-20">
                  <video src="/video.mp4" autoPlay muted loop playsInline className="w-full h-auto rounded-xl shadow-lg" />
                </div>
                {/* Trait animé après la réponse */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: '100%', opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="h-1 w-40 bg-gray-300 rounded-full mx-auto -mb-12 md:hidden"
                  style={{ maxWidth: 220 }}
                />
              </div>
            </div>
          </div>
        </div>

        
        {/* Vidéo mobile avant la boîte de contact */}
        <div className="block md:hidden w-full relative z-20">
          <video 
            src="/video.mp4" 
            autoPlay 
            muted 
            playsInline 
            loop
            className="w-full h-auto rounded-xl shadow-lg object-cover"
            style={{ maxHeight: '600px' }}
          />
        </div>
        {/* Section Contact */}
        <div id="contact" className="relative z-10 py-12 md:py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Prendre rendez-vous</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = {
                nom: formData.get('nom'),
                prenom: formData.get('prenom'),
                telephone: formData.get('telephone'),
                forfait: formData.get('forfait'),
                lieu: formData.get('lieu'),
                email: formData.get('email'),
                raison: formData.get('raison')
              };
              
              try {
                const response = await fetch('/api/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data)
                });
                
                if (response.ok) {
                  alert('Message envoyé avec succès !');
                  e.currentTarget.reset();
                } else {
                  const error = await response.json();
                  alert(error.error || 'Erreur lors de l\'envoi');
                }
              } catch (error) {
                alert('Erreur lors de l\'envoi du message');
              }
            }} className="bg-white rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-visible">
              {/* Ombre en haut de la boîte de contact mobile */}
              <div className="absolute left-0 top-0 w-full h-4 rounded-t-2xl shadow-[0_-8px_16px_-8px_rgba(0,0,0,0.15)] pointer-events-none z-20" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nom</label>
                  <input name="nom" type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Ex : Dupont" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Prénom</label>
                  <input name="prenom" type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Ex : Marie" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Numéro de téléphone</label>
                  <input name="telephone" type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Ex : 06 12 34 56 78" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Forfait souhaité</label>
                  <select name="forfait" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-gray-900" required>
                    <option value="" disabled>Choisissez un forfait</option>
                    <option value="1h">1 séance 1h</option>
                    <option value="3h">3 séances 1h</option>
                    <option value="5h">5 séances 1h</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Lieux souhaité</label>
                                  <select name="lieu" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-gray-900" required>
                    <option value="" disabled>Choisissez un lieu</option>
                    <option value="anima">Centre Anima — 31, rue de Maubeuge, 75009 Paris</option>
                    <option value="kah">Studio KAH — 28, rue Bichat, 75010 Paris</option>
                    <option value="domicile">À domicile</option>
                  </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Adresse mail</label>
                <input name="email" type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Ex : marie.dupont@email.com" required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Raison de la prise de rendez-vous</label>
                <textarea name="raison" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" rows={4} placeholder="Ex : Douleurs au dos, envie de détente, gestion du stress..."></textarea>
              </div>
              <div className="text-center pt-4">
                <button type="submit" className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">Envoyer</button>
              </div>
            </form>
          </div>
        </div>

        {/* Instagram Gallery Section + Avis */}
        <div id="communaute" className="relative z-10 pt-8 md:pt-8 pb-2 min-h-[700px] bg-white">
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="white" strokeWidth="1.5">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="white" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="5" fill="none" stroke="white" strokeWidth="1.5"/>
                  <circle cx="17" cy="7" r="1.2" fill="white"/>
                </svg>
          </a>
            </div>
            {/* Avis clients juste sous le bouton Instagram */}
            <div className="w-screen max-w-none px-0 my-4 md:my-12 relative left-1/2 right-1/2 -translate-x-1/2">
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 text-center">Ce qu'ils en pensent...</h2>
              <p className="text-base md:text-lg text-gray-700 text-center">Ils ont testé la réflexologie plantaire&nbsp;: voici leurs ressentis</p>
              <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory mt-8 pb-8 md:pb-24">
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
        
        {/* Section Contact Praticien sous les avis */}
        <div className="block md:hidden w-full py-8 border-t border-gray-200 relative z-20" style={{ background: 'linear-gradient(to bottom, #fff 0%, #ECE5D9 100%)' }}>
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Contact</h2>
            <div className="mb-2 font-bold text-lg text-black">TOM ROBERT</div>
            <div className="text-gray-600 mb-1">25 rue bichat, 75010 Paris</div>
            <div className="text-gray-600 mb-1">06 31 83 05 44</div>
            <div className="text-gray-600 mb-4">tom.reflexologue@gmail.com</div>
            <div className="flex gap-3 mt-2">
              <a href="#" className="flex items-center justify-center w-10 h-10 bg-[#232b35] rounded-full">
                {/* Icône Instagram SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="white" strokeWidth="1.5">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="white" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="5" fill="none" stroke="white" strokeWidth="1.5"/>
                  <circle cx="17" cy="7" r="1.2" fill="white"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Section Contact en bas de page, visible sur ordi uniquement */}
      <div className="hidden md:block w-full py-8 border-t border-gray-200 relative z-50" style={{ background: 'linear-gradient(to bottom, #fff 0%, #ECE5D9 100%)' }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Contact</h2>
          <div className="mb-2 font-bold text-lg text-black">TOM ROBERT</div>
          <div className="text-gray-600 mb-1">25 rue bichat, 75010 Paris</div>
          <div className="text-gray-600 mb-1">06 31 83 05 44</div>
          <div className="text-gray-600 mb-4">tom.reflexologue@gmail.com</div>
          <div className="flex flex-col items-center gap-3 mt-2 justify-center">
            <div className="flex gap-3 justify-center">
              <a href="#" className="flex items-center justify-center w-10 h-10 bg-[#232b35] rounded-full">
                {/* Icône Instagram SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="white" strokeWidth="1.5">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="white" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="5" fill="none" stroke="white" strokeWidth="1.5"/>
                  <circle cx="17" cy="7" r="1.2" fill="white"/>
                </svg>
              </a>
            </div>
            <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-lg mt-2">RDV</button>
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
}// Trigger new deployment
// Trigger deployment
// Trigger new deployment for pricing text
