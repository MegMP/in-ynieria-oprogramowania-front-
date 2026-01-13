interface LabeledTextProps {
  label: string;
  value: string;
}

const LabeledText = ({ label, value }: LabeledTextProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-pink-800 text-xs font-semibold">{label}</p>
      <p className="truncate w-full">{value}</p>
    </div>
  );
};

export default LabeledText;
