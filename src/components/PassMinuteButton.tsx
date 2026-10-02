interface Props {
  onPass: () => void;
}

export default function PassMinuteButton({ onPass }: Props) {
  return (
    <button type="button" className="pass-btn" onClick={onPass}>
      PASSER UNE MINUTE
    </button>
  );
}
