export function MaskLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text
        x="16"
        y="24"
        fill="white"
        fontSize="26"
        fontWeight="900"
        fontFamily="'Montserrat', sans-serif"
        textAnchor="middle"
        letterSpacing="-0.05em"
      >
        N
      </text>
    </svg>
  );
}