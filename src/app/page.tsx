"use client";
import Card from "@/components/Card";
import dayjs from "dayjs";
import { use, useEffect, useState } from "react";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export type Card = {
  src: string;
  id: number;
  matched: boolean;
};

const CARD_IMAGES = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
] as const;

export default function Home() {
  const [cards, setCards] = useState([] as Card[]);
  const [turns, setTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);

  const [disabled, setDisabled] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  const shuffledCards = () => {
    const shuffledCards = [...CARD_IMAGES, ...CARD_IMAGES]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [cards]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
      }

      setTimeout(() => resetTurn(), 1000);
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffledCards();
  }, []);

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes((prevMinutes) => prevMinutes + 1);
    }

    if (minutes === 60) {
      setMinutes(0);
      setHours((prevHours) => prevHours + 1);
    }
  }, [seconds, minutes]);

  return (
    <div className="w-full h-[100dvh] text-center bg-[#1b1523] text-white">
      <div className="max-w-4xl py-10 mx-auto">
        <h1 className="m-4 font-bold text-2xl">Magic Match</h1>
        <button
          onClick={shuffledCards}
          className="
                    border
                    rounded
                    px-3
                    py-1.5
                    font-semibold
                    hover:bg-[#c23866]"
        >
          New Game
        </button>
        <div className="flex justify-center items-center">
          <div className="mt-10 grid grid-cols-4 gap-5">
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-x-8">
        <div>Turns: {turns}</div>
        <div>
          Time:
          {dayjs.duration({ hours, minutes, seconds }).format("HH:mm:ss")}
        </div>
      </div>
    </div>
  );
}
