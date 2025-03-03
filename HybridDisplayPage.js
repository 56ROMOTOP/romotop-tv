
import React, { useEffect, useState } from 'react';
import romotopLogo from './romotop_2016.jpg';

const HybridDisplayPage = () => {
  const [files, setFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch('https://romotop-tv-api.onrender.com/list_files');
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des fichiers:', error);
    }
  };

  useEffect(() => {
    if (files.length > 1) {
      const interval = setInterval(() => {
        setShowLogo(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % files.length);
          setShowLogo(false);
        }, 10000);
      }, 25000);
      return () => clearInterval(interval);
    }
  }, [files]);

  if (files.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <img src={romotopLogo} alt="Romotop Logo" className="w-48 mb-4" />
        <h1 className="text-3xl font-bold mb-6">ROMOTOP TV - Contenu Dynamique</h1>
        <p className="text-gray-400">Aucun contenu disponible.</p>
      </div>
    );
  }

  const currentFile = files[currentIndex];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <img src={romotopLogo} alt="Romotop Logo" className="w-48 mb-4" />
      <h1 className="text-3xl font-bold mb-6">ROMOTOP TV - Contenu Dynamique</h1>
      <div className="text-center max-w-2xl mb-6">
        <p className="text-lg">
          Romotop, leader européen de la fabrication de poêles à bois et foyers, se distingue par son savoir-faire alliant innovation, performance et design. Fort d'une expertise reconnue depuis plus de 30 ans, Romotop conçoit des solutions de chauffage performantes, économiques et respectueuses de l'environnement. Avec une large gamme de modèles, du style traditionnel au plus contemporain, Romotop répond aux attentes des particuliers et professionnels en quête de confort thermique et d'esthétique.
        </p>
      </div>
      {showLogo ? (
        <div className="w-full flex justify-center py-4">
          <img src={romotopLogo} alt="Romotop Logo" className="w-64" />
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          {currentFile.name.endsWith('.mp4') ? (
            <video
              src={currentFile.webViewLink.replace('/view', '/preview')}
              className="w-full h-auto"
              autoPlay
              muted
              loop
              controls={false}
            />
          ) : (
            <img
              src={currentFile.webViewLink.replace('/view', '/preview')}
              alt={currentFile.name}
              className="w-full h-auto object-cover"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default HybridDisplayPage;
