export default function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 100 100"
            className="text-[#06B6D4]"
            aria-hidden="true"
          >
            <g transform="translate(50 50)">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <rect
                  key={a}
                  x="-6"
                  y="-46"
                  width="12"
                  height="32"
                  rx="6"
                  fill="currentColor"
                  transform={`rotate(${a})`}
                />
              ))}
            </g>
          </svg>
          <span>© {new Date().getFullYear()} Novx Trading</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
