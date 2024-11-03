// src/App.js
import React, { useCallback, useEffect, useState } from "react";
import { fetchQuote } from "./api"; // Import de la fonction d'API
import QuoteBox from "./components/QuoteBox";
import QuoteButton from "./components/QuoteButton";
import TweetButton from "./components/TweetButton";
import "./App.css";

const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const changeBackgroundColor = useCallback(() => {
    const randomColor1 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    const randomColor2 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    const shadowX = Math.floor(Math.random() * 100) - 50; // Mouvement horizontal aléatoire
    const shadowY = Math.floor(Math.random() * 200) - 100; // Mouvement vertical aléatoire
    const blurRadius = Math.floor(Math.random() * 200) + 100; // Taille du flou aléatoire

    document.body.style.backgroundColor = randomColor1;
    document.body.style.boxShadow = `inset ${shadowX}px ${shadowY}px ${blurRadius}px ${-50}px ${randomColor2}`;
  }, []); // pas de dépendances ici

  const getQuote = useCallback(async () => {
    const { quote, author } = await fetchQuote();
    setQuote(quote);
    setAuthor(author);
    changeBackgroundColor();
  }, [changeBackgroundColor]); //

  useEffect(() => {
    getQuote();
  }, [getQuote]);

  return (
    <>
      <div id="quote-box">
        <QuoteBox text={quote} author={author} />
        <div id="buttons-container">
          <QuoteButton fetchQuote={getQuote} />
          <TweetButton quote={quote} author={author} />
        </div>
      </div>
      <a
        id="github-link"
        href="https://github.com/Adrien-25/clock_pomodoro.git"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          version="1.1"
          data-view-component="true"
          height="25px"
          width="25"
          fill="white"
        >
          <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
        </svg>
        GitHub Repo
      </a>
    </>
  );
};

export default App;
