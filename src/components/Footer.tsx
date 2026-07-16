export function Footer() {
  return (
    <footer className="px-5 md:px-12 lg:px-20 py-8 md:py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 text-[10px] uppercase tracking-[0.15em] opacity-40">
      <div>
        &copy; {new Date().getFullYear()} Hacko. All rights reserved.
      </div>
      <div>
        Digital experience by{" "}
        <a
          href="https://entrotech.co"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-100 hover:opacity-60 transition-opacity"
        >
          Entrotech
        </a>
      </div>
    </footer>
  );
}
