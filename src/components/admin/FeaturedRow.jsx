import Switch from "../ui/Switch";

const MOVE_BUTTON =
  "border-borda hover:border-borda-hover flex size-11 cursor-pointer items-center justify-center rounded-campo border disabled:cursor-not-allowed disabled:opacity-40";

const FeaturedRow = ({ name, position, total, disabled, onToggle, onMove }) => {
  const isSelected = position >= 0;

  return (
    <li className="border-borda flex items-center gap-3 border-t py-2.5">
      <Switch
        checked={isSelected}
        label={`Destacar ${name}`}
        disabled={disabled}
        onClick={() => onToggle(name)}
      />
      <span className="min-w-0 flex-1 text-base [overflow-wrap:anywhere]">
        {name}
      </span>
      {isSelected && (
        <>
          <span className="text-texto-suave text-sm">{position + 1}º</span>
          <button
            type="button"
            aria-label={`Subir ${name}`}
            disabled={disabled || position === 0}
            onClick={() => onMove(name, -1)}
            className={MOVE_BUTTON}
          >
            <span aria-hidden="true">↑</span>
          </button>
          <button
            type="button"
            aria-label={`Descer ${name}`}
            disabled={disabled || position === total - 1}
            onClick={() => onMove(name, 1)}
            className={MOVE_BUTTON}
          >
            <span aria-hidden="true">↓</span>
          </button>
        </>
      )}
    </li>
  );
};

export default FeaturedRow;
