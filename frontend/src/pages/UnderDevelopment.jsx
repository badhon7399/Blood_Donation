import { Link, useLocation } from 'react-router-dom';
import { Wrench, ArrowLeft, Droplet } from 'lucide-react';

const PAGE_LABELS = {
  '/search':  'Find Donor',
  '/request': 'Request Blood',
};

const UnderDevelopment = () => {
  const { pathname } = useLocation();
  const pageName = PAGE_LABELS[pathname] || 'This Page';

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-red-50">
      {/* Decorative blobs */}
      <div className="absolute rounded-full pointer-events-none blur-[80px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(239,68,68,0.12)_0%,transparent_70%)] -top-[100px] -left-[100px]" />
      <div className="absolute rounded-full pointer-events-none blur-[80px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] -bottom-[80px] -right-[80px]" />

      <div className="w-full max-w-[480px] p-12 text-center flex flex-col items-center gap-5 relative z-10 animate-[fadeUp_0.5s_ease_both] rounded-3xl bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl">
        {/* Icon */}
        <div className="relative w-[100px] h-[100px] flex items-center justify-center">
          <div className="w-20 h-20 bg-red-50 border border-red-200/50 rounded-full flex items-center justify-center text-[#b80f1d]">
            <Wrench size={36} />
          </div>
          {/* Orbiting blood drop */}
          <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-[#b80f1d] to-[#66040c] rounded-full flex items-center justify-center text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]">
              <Droplet size={14} fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-500 text-xs font-bold tracking-widest uppercase">Under Development</div>
        <h1 className="text-[clamp(1.5rem,4vw,2rem)] font-bold text-gray-900 tracking-tight">{pageName} is Coming Soon</h1>
        <p className="text-[0.95rem] text-gray-500 leading-relaxed max-w-[360px]">
          We're working hard to build this feature. It will be available shortly —
          stay tuned for updates!
        </p>

        {/* Progress bar */}
        <div className="w-full mt-1">
          <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
            <span>Build Progress</span>
            <span>65%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#b80f1d] to-[#66040c] rounded-full transition-all duration-[1.2s] ease-out w-[65%]" />
          </div>
        </div>

        <Link to="/" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#d41425] via-[#b80f1d] to-[#66040c] text-white px-6 py-3.5 rounded-full font-semibold border border-red-900/20 shadow-md hover:bg-[#66040c] hover:-translate-y-0.5 hover:shadow-lg transition-all w-full mt-2">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default UnderDevelopment;
