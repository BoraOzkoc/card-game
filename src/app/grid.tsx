import React, { useState, useEffect } from "react";
import Card from "./card"; // Make sure the Card component is correctly imported
import LoadingScreen from "./loading"; // Assuming Loading component exists
import { fetchDogImages } from "./Utils/fetchdata";
import Confetti from "react-confetti";

interface GridProps {
  onReset: () => void;
}
const Grid: React.FC<GridProps> = ({ onReset }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<boolean[]>([]);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const defaultImage = "/placeholder.png";
  const [showVictory, setShowVictory] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const loadImages = async () => {
      try {
        const fetchedImages = await fetchDogImages(8);
        const clonedArray = fetchedImages.flatMap((item) => [item, item]);
        setImages(clonedArray);
        shuffle(clonedArray);
        setMatchedCards(new Array(clonedArray.length).fill(false));
      } catch (error) {
        console.error("Failed to load images:", error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleCardClick = (id: number) => {
    if (isChecking || matchedCards[id] || flippedCards.includes(id)) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);

      const [firstCard, secondCard] = newFlippedCards;
      if (images[firstCard] === images[secondCard]) {
        const newMatchedCards = [...matchedCards];
        newMatchedCards[firstCard] = true;
        newMatchedCards[secondCard] = true;
        setMatchedCards(newMatchedCards);
        IncrementMatchCount();
      }
      setTimeout(() => {
        setFlippedCards([]);
        setIsChecking(false);
      }, 600);
    }
  };

  const IncrementMatchCount = () => {
    setCount((prevCount) => prevCount + 2);
    CheckMatchCount(count + 2);
  };

  const CheckMatchCount = (currentCount: number) => {
    if (currentCount === 16) {
      setShowConfetti(true);

      setTimeout(() => {
        setShowVictory(true);
        setCount(0);
      }, 1000);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex justify-center items-center w-full h-full relative">
      {showConfetti && (
        <div className="fixed inset-0 z-10">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
        </div>
      )}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center bg-black/75 z-10 ${
          showVictory ? "visible" : "invisible"
        }`}
      >
        <div className="bg-sky-500 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Congrats, you beat the game!
          </h2>
          <button
            onClick={onReset}
            className="border border-[#fffefe] hover:bg-sky-900 text-[#ffffff] font-bold py-2 px-8 rounded-lg transition-colors duration-200"
          >
            Play Again
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-full">
        <div className="grid grid-cols-4 gap-4 max-h-[700px] max-w-[500px] w-full items-center place-items-center">
          {images.map((image, index) => (
            <Card
              key={index}
              id={index}
              image={image}
              defaultImage={defaultImage}
              onCardClick={handleCardClick}
              isFlipped={flippedCards.includes(index) || matchedCards[index]} // Ensure matched cards stay flipped
              isMatched={matchedCards[index]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Grid;
