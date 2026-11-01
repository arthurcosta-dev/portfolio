const EmptyState = ({ title, children }) => (
  <div className="border-borda rounded-card-md flex flex-col items-start gap-3 border border-dashed p-7">
    <p className="font-serif text-[28px] leading-[1.2] font-light tracking-[-0.01em]">
      {title}
    </p>
    {children}
  </div>
);

export default EmptyState;
