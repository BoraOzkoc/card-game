import React, { useState, useEffect } from "react";
import Card from "./card"; // Make sure the Card component is correctly imported
import LoadingScreen from "./loading"; // Assuming Loading component exists
import { fetchDogImages } from "./Utils/fetchdata";

interface GridProps {
  onReset: () => void;
}
const Grid: React.FC<GridProps> = ({ onReset }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<boolean[]>([]);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  let count = 0;
  const IncreamentMatchCount = () => {
    count++;
    CheckMatchCount();
  };
  const CheckMatchCount = () => {
    if (count == 16) {
      onReset();
      count = 0;
    }
  };
  const defaultImage = "/placeholder.png";
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
      }

      setTimeout(() => {
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
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
          onMatch={IncreamentMatchCount}
        />
      ))}
    </div>
  );
};
export default Grid;
