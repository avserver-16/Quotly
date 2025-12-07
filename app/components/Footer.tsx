export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20 z-4">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-white">Avish Shetty</h2>
          <p className="text-sm text-gray-400 mt-1">
            Building apps, ideas & better experiences.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 text-sm">
          <a
            href="mailto:avishshetty@example.com"
            className="hover:text-white transition-colors"
          >
            Email
          </a>

          <a
            href="https://github.com/avish-shetty16"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/avishshetty/"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>

      </div>

      <div className="mt-8 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Avish Shetty. All rights reserved.
      </div>
    </footer>
  );
}
