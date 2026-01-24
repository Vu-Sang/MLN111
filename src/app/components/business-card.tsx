import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

export function BusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-96 h-56"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl p-8 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div>
            <div className="text-amber-400 text-sm tracking-widest uppercase mb-2">
              Professional
            </div>
            <h1 className="text-4xl text-white mb-2">
              Sarah Mitchell
            </h1>
            <p className="text-slate-300 text-lg">
              Senior Product Designer
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-slate-400 text-sm">
              Creative Solutions Inc.
            </div>
            <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center">
              <span className="text-slate-900 text-xl">SM</span>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 text-slate-500 text-xs">
            Click to flip
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl shadow-2xl p-8"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <h2 className="text-2xl text-slate-900 mb-6">
            Contact Information
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-xs text-slate-700">Email</div>
                <div className="text-slate-900">sarah.mitchell@creative.com</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-xs text-slate-700">Phone</div>
                <div className="text-slate-900">+1 (555) 123-4567</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-xs text-slate-700">Website</div>
                <div className="text-slate-900">www.sarahmitchell.design</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-xs text-slate-700">Location</div>
                <div className="text-slate-900">San Francisco, CA</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
