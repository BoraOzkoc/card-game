import React from "react";
import Image from "next/image";

type Props = {
  id: number;
  image: string;  // Dog image URL
  defaultImage: string; // Default image URL
  onCardClick: (id: number) => void;  // Callback to handle card click
  isFlipped: boolean;  // Whether the card is flipped or not
  isMatched: boolean;  // Whether the card has been matched
};

const Card = ({
  id,
  image,
  defaultImage,
  onCardClick,
  isFlipped,
  isMatched,
}: Props) => {
  const handleClick = () => {
    if (!isMatched) {
      onCardClick(id); // Notify parent to flip card
    }
  };

  // Fallbacks to ensure image URLs are valid
  const dogImageSrc = image && image !== "" ? image : "/placeholder.png";

  return (
    <div
      onClick={handleClick}
      className="w-full aspect-[3/4] bg-blue-500 border hover:scale-105 duration-300 relative overflow-hidden cursor-pointer"
    >
      {/* Flipping effect with Tailwind */}
      <div
        className={`absolute w-full h-full transform transition-transform duration-300 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front: Default Image */}
        <div className="absolute w-full h-full bg-cover bg-center">
          <Image
            src={defaultImage} // Ensure valid src
            alt="Default Image"
            layout="fill"
            objectFit="cover" // Object fit to cover the area
          />
        </div>

        {/* Back: Dog Image */}
        <div className="absolute w-full h-full bg-cover bg-center">
          <Image
            src={dogImageSrc} // Ensure valid src
            alt="Dog Image"
            layout="fill"
            objectFit="cover" // Object fit to cover the area
          />
        </div>
      </div>
    </div>
  );
};

export default Card;