export const fetchDogImages = async (num: number): Promise<string[]> => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random/" + num);
    const data = await response.json();
    return data.message; // Assuming it returns an array of image URLs
  } catch (error) {
    console.error("Error fetching dog images:", error);
    return []; // Return an empty array in case of error
  }
};