import React, { useState, useEffect } from "react";
import Card from "./card"; // Make sure the Card component is correctly imported
import LoadingScreen from "./loading"; // Assuming Loading component exists
import { fetchDogImages } from "./Utils/fetchdata";

const Grid = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [flippedCards, setFlippedCards] = useState<number[]>([]); // Track flipped cards
  const [matchedCards, setMatchedCards] = useState<boolean[]>([]); // Track matched cards
  const [isChecking, setIsChecking] = useState<boolean>(false); // To prevent checking more than two cards

  const defaultImage = "/placeholder.png"; // Default image to show when card is not flipped

  // Fetch images and set up game state
  useEffect(() => {
    const loadImages = async () => {
      try {
        const fetchedImages = await fetchDogImages(8); // Fetch 8 images (or however many you need)
        const clonedArray = fetchedImages.flatMap((item) => [item, item]); // Duplicate each image to make pairs
        setImages(clonedArray); // Store the images
        setMatchedCards(new Array(clonedArray.length).fill(false)); // Initialize matched cards as false
      } catch (error) {
        console.error("Failed to load images:", error);
      } finally {
        setLoading(false); // Stop loading once images are fetched
      }
    };

    loadImages(); // Start fetching images when component mounts
  }, []);

  // Handle card flip
  const handleCardClick = (id: number) => {
    if (isChecking || matchedCards[id]) return; // Don't allow more clicks if checking or already matched

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards); // Add the clicked card to flipped cards

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setIsChecking(true); // Prevent further flips until checking is complete

      // Check if the selected cards match
      const [firstCard, secondCard] = newFlippedCards;
      if (images[firstCard] === images[secondCard]) {
        const newMatchedCards = [...matchedCards];
        newMatchedCards[firstCard] = true; // Mark first card as matched
        newMatchedCards[secondCard] = true; // Mark second card as matched
        setMatchedCards(newMatchedCards);
      }

      // After checking the cards, reset flipped cards after a delay
      setTimeout(() => {
        setFlippedCards([]); // Clear flipped cards
        setIsChecking(false); // Allow further card flips
      }, 1000); // 1 second delay before allowing the next check
    }
  };

  // Show loading screen if images are still loading
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
          isFlipped={flippedCards.includes(index)}
          isMatched={matchedCards[index]}
        />
      ))}
    </div>
  );
};

export default Grid;