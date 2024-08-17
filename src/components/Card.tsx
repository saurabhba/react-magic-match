import { Card as CardType } from "@/app/page";
import Image from "next/image";

interface Props {
  card: CardType;
  handleChoice: (card: CardType) => void;
  flipped: boolean;
  disabled: boolean;
}

const Card = ({ card, handleChoice, flipped, disabled }: Props) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="relative">
      <Image
        src={card.src}
        width={100}
        height={100}
        alt="card front"
        className={`border-2 rounded-md absolute transition-all ease-in duration-200 ${
          flipped
            ? "[transform:rotateY(0deg)] delay-200"
            : "[transform:rotateY(90deg)]"
        }`}
      />

      <Image
        src="/img/cover.png"
        width={100}
        height={100}
        alt="card back"
        className={`border-2 rounded-md transition-all ease-in duration-200  ${
          flipped ? "[transform:rotateY(90deg)] delay-0" : "delay-200"
        }`}
        onClick={handleClick}
      />
    </div>
  );
};

export default Card;
