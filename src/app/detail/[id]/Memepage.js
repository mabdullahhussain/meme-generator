'use client';
import { useState, useRef } from "react";
import Image from "next/image";

export default function Memepage({ selectImg }) {
  const clickedImage = selectImg;
  const memeInp1 = useRef();
  const memeInp2 = useRef();
  const [meme, setMeme] = useState(null);

  async function generateMeme(e) {
    e.preventDefault();

    try {
      const response = await fetch(`https://api.imgflip.com/caption_image?template_id=${clickedImage.id}&username=Abdullahussain&password=hussain15!&text0=${encodeURIComponent(memeInp1.current.value)}&text1=${encodeURIComponent(memeInp2.current.value)}`);
      setMeme(response.data.data.url);
    } catch (error) {
      console.error("Error generating meme:", error);
    }

    memeInp1.current.value = " ";
    memeInp2.current.value = " ";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-400 p-4">
      <form onSubmit={generateMeme} className="flex flex-col items-center bg-white p-6 rounded shadow-lg">
        <Image src={clickedImage.url} alt="Meme Template" width={400} height={400} className="object-cover mb-4" />
        
        <input
          type="text"
          placeholder="Enter Text 1"
          ref={memeInp1}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Enter Text 2"
          ref={memeInp2}
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