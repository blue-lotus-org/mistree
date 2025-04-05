import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <a
          href="https://lotuschain.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
        >
          BLUE LOTUS
        </a>
      </div>
    </footer>
  );
}