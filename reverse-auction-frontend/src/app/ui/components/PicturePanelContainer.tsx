import React, { useState } from "react";
import HomepageProductCard from "./HomepageProductCard";

interface Props {
  images: string[]; 
}
const PicturePanelContainer: React.FC<Props> = (props) => {
  const images = props.images;
const [selectedImage, setSelectedImage] = useState<string | null>(images[0] ?? null);

  return (
    <div className="p-4  rounded-lg shadow-lg justify-center w-full flex gap-10">
        <div className="flex flex-col gap-4 max-h-[529px] overflow-auto ">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(img)}
            className={`w-32 h-32 object-cover rounded-md border-2 cursor-pointer ${
              selectedImage === img ? "border-blue-500" : "border-transparent"
            } hover:scale-105 transition-transform`}
          />
        ))}

      </div>
      <div className="w-full h-[500px] overflow-hidden rounded-lg mr-auto">
        <img
          src={selectedImage ?? ""}
          alt="Sample product"
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
    </div>
  );
};

export default PicturePanelContainer;
