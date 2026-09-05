import { motion } from 'framer-motion';

export default function EditorialBanner() {
  return (
    <section className="bg-white text-black py-8 overflow-hidden select-none border-y border-black">
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
          className="flex items-center gap-12 font-anton text-4xl md:text-6xl tracking-tight uppercase"
        >
          <span>BOOK THE LOOK</span>
          <span className="text-[#F4845F]">•</span>
          <span>YOUR CUT. YOUR BARBER. YOUR TIME.</span>
          <span className="text-[#6BBF7A]">•</span>
          <span>AHMEDABAD</span>
          <span className="text-black/30">/</span>
          <span>MUMBAI</span>
          <span className="text-black/30">/</span>
          <span>DELHI</span>
          <span className="text-[#E882B4]">•</span>
          <span>PREMIUM DIGITAL BARBER EXPERIENCE</span>
          <span className="text-[#6EB5FF]">•</span>
          
          {/* Repeat */}
          <span>BOOK THE LOOK</span>
          <span className="text-[#F4845F]">•</span>
          <span>YOUR CUT. YOUR BARBER. YOUR TIME.</span>
          <span className="text-[#6BBF7A]">•</span>
          <span>AHMEDABAD</span>
          <span className="text-black/30">/</span>
          <span>MUMBAI</span>
          <span className="text-black/30">/</span>
          <span>DELHI</span>
          <span className="text-[#E882B4]">•</span>
          <span>PREMIUM DIGITAL BARBER EXPERIENCE</span>
          <span className="text-[#6EB5FF]">•</span>
        </motion.div>
      </div>
    </section>
  );
}
