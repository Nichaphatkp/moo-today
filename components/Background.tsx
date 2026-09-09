type BackgroundProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Background({
  children,
  className = "",
}: BackgroundProps) {
  return (
    <main
      className={`min-h-screen bg-cover bg-center bg-fixed text-white ${className}`}
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
      <div className="min-h-screen bg-black/60">
        {children}
      </div>
    </main>
  );
}