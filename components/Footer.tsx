export default function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 100 100"
            className="text-[#A855F7]"
            aria-hidden="true"
          >
            <g transform="translate(50 50)">
              {[0, 90, 180, 270].map((dir) => (
                <g key={dir} transform={`rotate(${dir})`}>
                  <rect
                    x="-7"
                    y="-44"
                    width="14"
                    height="30"
                    rx="7"
                    fill="currentColor"
                    transform="rotate(-22)"
                  />
                  <rect
                    x="-7"
                    y="-44"
                    width="14"
                    height="30"
                    rx="7"
                    fill="currentColor"
                    transform="rotate(22)"
                  />
                </g>
              ))}
            </g>
          </svg>
          <span>© {new Date().getFullYear()} fyt</span>
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
