import logo from "./logo.svg";
import "./App.css";
import curtain from "../src/images/curtain.png";
import Masonry from "@mui/lab/Masonry";
import {BsArrowRight} from "react-icons/bs"
import { useEffect, useState } from "react";
import { stepConnectorClasses } from "@mui/material";
import {motion} from "framer-motion"


function App() {
const [img , setImg] = useState("");
const [res , setRes] = useState([]);
const fectchRequest = async() => {
  const data = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${process.env.REACT_APP_API_KEY}`);
  const dataJ = await data.json();
  const result = await dataJ.results;
  setRes(result);
}

useEffect(()=>{
  fectchRequest();
},[])

const submit = ()=>{
  fectchRequest();
}
  return (
    <div className="bg-[#184642] text-[#978d61]">
      <img src={curtain} alt="curtain" className="absolute" />
      <motion.h1 animate={{opacity:1 , scale:[1,1.5,1]}} initial ={{opacity:0 }} exit={{opacity: 0}} transition={{ease:"easeOut" , duration:4}} className="text-9xl grid place-items-center h-screen milky ">
        Sunil Singh
      </motion.h1>
      <div className="text-center flex items-center justify-center ">
        <input
          placeholder="Enter anyting ..."
          className="bg-transparent rounded-full p-4  placeholder:text-[#978d61] border-2 outline-[#978d61] w-1/3" value={img} onChange={(e)=>setImg(e.target.value)}
        />
        <button  className="ml-4"  onClick={submit}><BsArrowRight size={30}/></button>
       </div>
      <div className="mt-4 w-4/5 m-auto" >
        <Masonry columns={3} spacing={2}>
          {res.map((item, index) => (
            <div key={index}>
              <img
                src={`${item.urls.raw}?w=162&auto=format`}
                srcSet={`${item.urls.raw}?w=162&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: "block",
                  width: "100%",
                }}
              />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}

export default App;


