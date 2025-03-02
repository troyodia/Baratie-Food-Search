export default function Footer() {
  return (
    <main className="flex py-8 items-center bg-[#5f6166] font-mono">
      <div className="container mx-auto px-8 flex justify-between items-center">
        <span className="text-3xl md:text-4xl font-bold text-[#97bcf4] tracking-tight">
          Baratie.com
        </span>
        <div className="flex flex-col md:flex-row md:gap-4 text-sm md:text-lg font-bold text-white tracking-tight">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </main>
  );
}
