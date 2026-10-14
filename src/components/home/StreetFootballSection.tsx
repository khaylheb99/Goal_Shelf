import React from 'react';
import { useApp } from '../../context/AppContext';
import { UploadCloud, MapPin, Sparkles, Trophy } from 'lucide-react';

export const StreetFootballSection: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <section className="py-20 bg-[#050807] border-b border-[#111A13] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B110D] border border-[#16241a] rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left: Documentary Street Football Image */}
            <div className="lg:col-span-7 relative min-h-[350px] lg:min-h-[500px]">
              <img
                src="/src/assets/images/street_football_naija_1791991464777.jpg"
                alt="Nigerian Grassroots Street Footballers in Action"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B110D] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0B110D]" />

              {/* Authentic street badge */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-[#39FF14]/40 text-xs font-mono text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#39FF14]" />
                <span>Ajegunle Community Pitch · Lagos</span>
              </div>
            </div>

            {/* Right: Cultural Story & Proposition */}
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest text-[#39FF14] font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Grassroots to National Glory</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-display leading-[1.05]">
                  FROM EVERY STREET <br />
                  TO EVERY STATE. <br />
                  <span className="text-[#39FF14] neon-glow">NIGERIA PLAYS HERE.</span>
                </h2>

                <p className="mt-4 text-sm text-[#A7B2AA] leading-relaxed">
                  The greatest football strikes aren't only scored in European stadiums.
                  They happen every evening on the sandy pitches of Ajegunle, the concrete arenas of Kano,
                  the street tournaments of Port Harcourt, and community school fields in Enugu.
                </p>

                <p className="mt-3 text-sm text-[#A7B2AA] leading-relaxed">
                  GoalShelf gives every Nigerian footballer a verified stage, an official score,
                  and a real opportunity to win ₦500,000 every single week.
                </p>

                {/* Cultural hubs */}
                <div className="mt-6 pt-5 border-t border-[#16241a] grid grid-cols-2 gap-3 text-xs text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                    <span>Lagos Island & Mainland</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                    <span>Kano Sabon Gari</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                    <span>Port Harcourt Mile 1</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                    <span>Abuja Area 10</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#16241a] flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setActivePage('submit')}
                  className="w-full sm:w-auto px-6 py-3 bg-[#39FF14] hover:bg-[#32e012] text-black font-display font-extrabold text-base uppercase rounded-xl transition-transform active:scale-95 shadow-[0_0_15px_rgba(57,255,20,0.3)] flex items-center justify-center gap-2"
                >
                  <UploadCloud className="w-4 h-4 stroke-[2.5]" />
                  <span>RECORD & UPLOAD YOUR GOAL</span>
                </button>

                <button
                  onClick={() => setActivePage('nigeria-map')}
                  className="w-full sm:w-auto text-xs font-semibold text-[#A7B2AA] hover:text-white transition-colors"
                >
                  Explore State Map →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
