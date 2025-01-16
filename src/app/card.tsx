import React from "react";

interface CardProps {
  image: string;
  defaultImage: string;
  id: number;
  onCardClick: (id: number) => void;
  isFlipped: boolean;
  isMatched: boolean;
  onMatch: () => void;
}

const Card: React.FC<CardProps> = ({
  image,
  defaultImage,
  id,
  onCardClick,
  isFlipped,
  isMatched,
  onMatch,
}) => {
  const handleClick = () => {
    if (!isMatched) {
      onCardClick(id);
    } else {
      onMatch();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full aspect-[3/4] bg-blue-500 border hover:scale-105 duration-300 relative overflow-hidden cursor-pointer"
    >
      {/* Flipping effect */}
      <div
        className={`absolute w-full h-full transform transition-transform duration-300 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front: Default Image */}
        <div className="absolute w-full h-full bg-cover bg-center">
          <img
            src={defaultImage} // Default image
            alt="Default Image"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Back: Dog Image */}
        <div
          className={`absolute w-full h-full bg-cover bg-center ${
            isFlipped ? "" : "hidden"
          }`}
        >
          <img
            src={image} // Dog image
            alt="Dog Image"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
