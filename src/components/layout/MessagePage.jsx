// Molde da 404 e do erro de rota: um título grande, uma frase e as saídas.
const MessagePage = ({ title, message, children }) => (
  <div className="relative mx-auto flex min-h-[70svh] w-full max-w-[1360px] flex-col items-start justify-center gap-5 overflow-hidden px-6 py-16 md:px-10 lg:px-20">
    <div
      aria-hidden="true"
      className="absolute top-[7%] left-[30%] aspect-[1000/260] w-[110%] -rotate-12 md:top-[12%] md:left-[52%] md:w-[70%]"
    >
      <div className="border-borda-hover size-full rounded-[50%] border-[1.2px]" />
      <div className="orbit-dot" />
    </div>
    <h1 className="relative z-10 font-serif text-[clamp(3.5rem,9vw,7rem)] leading-[0.95] font-light tracking-[-0.04em]">
      {title}
    </h1>
    <p className="text-texto-2 relative z-10 max-w-[46ch] text-[19px] leading-[1.45]">
      {message}
    </p>
    <div className="relative z-10 mt-2 flex flex-wrap items-center gap-x-7 gap-y-3">
      {children}
    </div>
  </div>
);

export default MessagePage;
