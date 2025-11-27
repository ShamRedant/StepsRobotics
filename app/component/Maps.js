"use client"
import React, { useEffect, useRef, useState } from 'react';

export default function Maps() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (mapInstanceRef.current) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    
    script.onload = () => {
      setIsLoaded(true);
    };
    
    document.body.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;
    const timer = setTimeout(() => {
      const L = window.L;
      
      if (!L || !mapRef.current) return;

      try {
        const map = L.map(mapRef.current, {
          center: [12.970162, 80.239902],
          zoom: 15,
          zoomControl: true,
          scrollWheelZoom: true
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a> contributors',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(map);

        const redIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            width: 40px;
            height: 40px;
            background: #D32F2F;
            border: 3px solid white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">
            <div style="
              width: 12px;
              height: 12px;
              background: white;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            "></div>
          </div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 40]
        });

        const marker = L.marker([12.970162, 80.239902], { icon: redIcon }).addTo(map);
        
        marker.bindPopup(`
          <div style="font-family: Arial, sans-serif; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #333;">
              STEM Robotics
            </h3>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #666; line-height: 1.4;">
              737, Anjaneyar Illam, Santh Illam, PTK Nagar, Thiruvanmiyur, Chennai, Tamil Nadu 600041
            </p>
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <span style="color: #FFA000; font-size: 14px;">★★★★★</span>
              <span style="margin-left: 6px; font-size: 12px; color: #666;">5.0 (370)</span>
            </div>
            <a href="https://www.google.com/maps/place/STEM+Robotics/@12.9701624,80.2399016,15z" 
               target="_blank" 
               rel="noopener noreferrer"
               style="color: #1976D2; text-decoration: none; font-size: 12px;">
              View on Google Maps →
            </a>
          </div>
        `);

        mapInstanceRef.current = map;
        setTimeout(() => {
          map.invalidateSize();
        }, 100);

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <div className="maps relative w-full h-[400px] md:h-[500px] overflow-hidden">
      <div className="absolute top-4 left-4 bg-white rounded-md shadow-md p-3 z-[1000] w-64">
        <a 
          href="https://www.google.com/maps/place/STEM+Robotics/@12.9701624,80.2399016,15z"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-xs hover:underline mb-2 block"
        >
          View larger map
        </a>
        
        <h3 className="font-semibold text-gray-900 text-sm mb-1">STEM Robotics</h3>
        <p className="text-gray-600 text-xs leading-snug mb-2">
          737, Anjaneyar Illam, Santh Illam, PTK Nagar, Thiruvanmiyur, Chennai, Tamil Nadu 600041
        </p>
        
        <div className="flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3 h-3 fill-current text-amber-500" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            ))}
          </div>
          <span className="text-gray-700 text-xs ml-1.5">5.0 (370)</span>
        </div>
      </div>
      <div 
        ref={mapRef} 
        className="w-full h-full shadow-lg"
        style={{ background: '#F8F8F8' }}
      />
            {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
          <div className="text-gray-600">Loading map...</div>
        </div>
      )}
    </div>
  );
}