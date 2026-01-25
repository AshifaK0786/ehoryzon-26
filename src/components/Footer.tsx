export default function Footer() {
  return (
    <footer className="bg-black/40 border-t border-white/10 py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Left Column - Event Info */}
          <div>
            
            <p className="text-sm md:text-base text-neutral-300 mb-2">KEC - Kongu Engineering College</p>
            <p className="text-sm md:text-base text-neutral-300">Perundurai, Tamil Nadu</p>
          </div>

          {/* Middle Column - Quick Links */}
          <div>
            <h4 className="text-xl md:text-2xl font-bold text-yellow-400 mb-4 md:mb-6">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><a href="/" className="text-neutral-400 hover:text-yellow-300 text-sm md:text-base transition-colors">Home</a></li>
              <li><a href="/aboutus" className="text-neutral-400 hover:text-yellow-300 text-sm md:text-base transition-colors">Aboutus</a></li>
              <li><a href="/schedule" className="text-neutral-400 hover:text-yellow-300 text-sm md:text-base transition-colors">Events</a></li>
              
            </ul>
          </div>

          {/* Right Column - Development Team */}
          
        </div>

        {/* Bottom Border & Copyright */}
        <div className="border-t border-white/10 pt-6 md:pt-8 text-center">
          <p className="text-neutral-400 text-xs md:text-sm">&copy; {new Date().getFullYear()} IEF's E-Horyzon 2K26, KEC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
