// Custom detailed SVG icons for Quick Access Board
// These are outline-style detailed vector icons

interface IconProps {
  className?: string;
}

export const WeightIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className || ''}`}>
    <path d="M32 8C28 8 24 12 24 16C24 20 28 24 32 24C36 24 40 20 40 16C40 12 36 8 32 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32 24V32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M20 40C20 36 24 32 32 32C40 32 44 36 44 40V48C44 52 40 56 32 56C24 56 20 52 20 48V40Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26 44L30 48L38 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DiabetesIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className || ''}`}>
    <rect x="8" y="16" width="48" height="36" rx="4" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M8 28H56" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M20 16V12C20 10 22 8 24 8H40C42 8 44 10 44 12V16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="32" cy="38" r="6" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M32 32V44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M26 38H38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const DigestionIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className || ''}`}>
    <path d="M12 20C12 20 16 12 32 12C48 12 52 20 52 20V44C52 48 48 52 32 52C16 52 12 48 12 44V20Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 28C20 28 24 24 32 24C40 24 44 28 44 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M20 36C20 36 24 32 32 32C40 32 44 36 44 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M28 44V48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M36 44V48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className || ''}`}>
    <path d="M32 56C32 56 8 40 8 24C8 16 14 10 22 10C27 10 30 13 32 16C34 13 37 10 42 10C50 10 56 16 56 24C56 40 32 56 32 56Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 28L28 36L44 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SkinIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className || ''}`}>
    <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M24 28C24 28 26 26 32 26C38 26 40 28 40 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="26" cy="32" r="2" fill="currentColor"/>
    <circle cx="38" cy="32" r="2" fill="currentColor"/>
    <path d="M28 38C28 38 30 40 32 40C34 40 36 38 36 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M20 20L24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M44 20L40 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M32 12V16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const MentalIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className || ''}`}>
    <path d="M32 8C20 8 12 18 12 28C12 38 20 44 24 48V56H40V48C44 44 52 38 52 28C52 18 44 8 32 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 28C22 28 24 26 28 26C32 26 34 28 34 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M30 28C30 28 32 26 36 26C40 26 42 28 42 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M26 36C26 36 28 38 32 38C36 38 38 36 38 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 44H44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const JointIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className || ''}`}>
    <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M32 8V24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M32 40V56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M8 32H24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M40 32H56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M16 16L24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M40 40L48 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M48 16L40 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M24 40L16 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const LiverIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className || ''}`}>
    <path d="M16 20C16 16 20 12 28 12H36C44 12 48 16 48 20V44C48 48 44 52 36 52H28C20 52 16 48 16 44V20Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 24V40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M32 24V40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M40 24V40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M20 32H44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M28 12V8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M36 12V8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export const ImmunityIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className || ''}`}>
    <path d="M32 8L12 18V32C12 46 22 56 32 60C42 56 52 46 52 32V18L32 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 32L30 40L42 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const WomenIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className || ''}`}>
    <circle cx="32" cy="20" r="12" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M26 20C26 20 28 18 32 18C36 18 38 20 38 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="28" cy="18" r="1.5" fill="currentColor"/>
    <circle cx="36" cy="18" r="1.5" fill="currentColor"/>
    <path d="M30 23C30 23 31 24 32 24C33 24 34 23 34 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 32V44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M24 38L32 32L40 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 48L32 44L40 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 56L32 52L40 56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
