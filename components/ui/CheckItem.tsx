import Image from "next/image";

interface CheckItemProps {
  text: string;
  highlighted?: boolean;
}

export const CheckItem = ({ text, highlighted = false }: CheckItemProps) => {
  return (
    <div className="flex items-center gap-3 justify-start">
      <div className="flex-shrink-0">
        <Image
          src={highlighted ? "/Icon.svg" : "/Vector (1).svg"}
          alt="check"
          width={20}
          height={20}
        />
      </div>
      <span
        className={`text-lg font-medium ${
          highlighted ? "text-[#031B4E]" : "text-[#f97316]"
        }`}
      >
        {text}
      </span>
    </div>
  );
};