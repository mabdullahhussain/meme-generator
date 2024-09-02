
import Memepage from "./Memepage";

export default async function detail({ params }) {
  const { id } = params;
  const res = await fetch("https://api.imgflip.com/get_memes");
  const { data } = await res.json();
  const meme = data.memes;
  const selectedImage = meme.filter((meme)=> meme.id === id)[0] || null;

  return (
    <Memepage selectImg={selectedImage}/>
  );
}