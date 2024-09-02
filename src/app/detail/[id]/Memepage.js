'use client';
import { useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";

export default function Memepage({ selectImg }) {
  const clickedImage = selectImg;

  const memeInput1 = useRef();
  const memeInput2 = useRef();
  const [meme, setMeme] = useState(null);

  async function generateMeme(e) {
    e.preventDefault();

    try {
      const response = await axios(`https://api.imgflip.com/caption_image?template_id=${clickedImage.id}&username=Nafaykhan&password=Nk27915!&text0=${encodeURIComponent(memeInput1.current.value)}&text1=${encodeURIComponent(memeInput2.current.value)}`);
      setMeme(response.data.data.url);
    } catch (error) {
      console.error("Error generating meme:", error);
    }

    memeInput1.current.value = " ";
    memeInput2.current.value = " ";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-400 p-4">
      <form onSubmit={generateMeme} className="flex flex-col items-center bg-white p-6 rounded shadow-lg">
        <Image src={clickedImage.url} alt="Meme Template" width={400} height={400} className="object-cover mb-4" />
        
        <input
          type="text"
          placeholder="Enter Text 1"
          ref={memeInput1}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Enter Text 2"
          ref={memeInput2}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Generate Meme
        </button>

        {meme && <Image src={meme} alt="Generated Meme" width={400} height={400} className="mt-4 object-cover" />}
      </form>
    </div>
  );
}