import React from "react";
import axios from "axios";
import { useState } from "react";

const Dict = () => {
  const [dict, setDict] = useState("");
  const dictFunc = async (e) => {
    const word = document.querySelector("#word").value.toLowerCase();
    e.preventDefault();
    if (word === "" || isNaN(word) === false) {
      alert("404");
      document.querySelector(".container").style.display = "none";
      document.querySelector(".error").style.display = "block";
    } else {
      await axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(function (response) {
          // handle success
          console.log(response.data);
          // console.log(response.data[0].meanings[0].definitions[0].definition);
          const wordName = response.data[0]?.word;
          let audio;
          if (
            response.data[0].phonetics[0].audio === "" &&
            response.data[0].phonetics[1].audio === ""
          ) {
            audio = response.data[0].phonetics[2].audio;
          } else if (response.data[0].phonetics[0].audio === "") {
            audio = response.data[0].phonetics[1].audio;
          } else {
            audio = response.data[0].phonetics[0].audio;
          }
          // const audio1 = response.data[0].phonetics[1].audio;

          const partOfSpeech = response.data[0]?.meanings[0]?.partOfSpeech;
          const meaning1 =
            response.data[0]?.meanings[0]?.definitions[0]?.definition;
          const meaning2 =
            response.data[0]?.meanings[0]?.definitions[1]?.definition;
          const synonyms = response.data[0]?.meanings[0]?.synonyms;
          const synonyms1 = response.data[0]?.meanings[1]?.synonyms;
          console.log(synonyms);
          const partOfSpeech1 = response.data[0]?.meanings[1]?.partOfSpeech;
          const meaning1Verb =
            response.data[0]?.meanings[1]?.definitions[0]?.definition;
          const meaning2Verb =
            response.data[0]?.meanings[1]?.definitions[1]?.definition;
          setDict({
            wordName,
            audio,
            partOfSpeech,
            meaning1,
            meaning2,
            synonyms,
            partOfSpeech1,
            meaning1Verb,
            meaning2Verb,
            synonyms1,
          });
        })

        .catch(function (error) {
          // handle error
          console.log(error.message);
          alert(error.message);
          // document.querySelector(".container").style.backgroundColor = "blue";
        });
      document.querySelector(".error").style.display = "none";
      document.querySelector(".container").style.display = "block";
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          dictFunc(e);
        }}
      >
        <input
          type="text"
          className="searchBar"
          id="word"
          placeholder="search any word"
        />
        <input type="submit" value="Search" className="searchBtn" />
      </form>
      <section className="error">404</section>
      <section className="container">
        <div className="wordName">
          <div className="iconDiv">
            <i
              className="fa-solid fa-volume-high audioIcon"
              onClick={() => {
                document.querySelector("#audio").play();
              }}
            >
              <audio src={dict.audio} id="audio"></audio>
            </i>
          </div>
          <span>{dict.wordName}</span>
        </div>
        <div className="partOfSpeech">
          <i>{dict.partOfSpeech}</i>
        </div>
        <div className="meaningSection">
          <article>1.&nbsp; {dict.meaning1}</article>
          <article className="synonymsDiv">
            <span>Similar:</span>
            {dict.synonyms?.map((syn, index) => {
              return (
                <div className="synonym" key={index}>
                  {syn}
                </div>
              );
            })}
          </article>
          <article>2. &nbsp;{dict.meaning2}</article>
        </div>
        <div className="partOfSpeech">
          <i>{dict.partOfSpeech1}</i>
        </div>
        <div className="meaningSection">
          <article>1.&nbsp; {dict.meaning1Verb}</article>
          <article className="synonymsDiv">
            <span>Similar:</span>
            {dict.synonyms1?.map((syn, index) => {
              return (
                <div className="synonym" key={index}>
                  {syn}
                </div>
              );
            })}
          </article>
          <article>2.&nbsp; {dict.meaning2Verb}</article>
        </div>
      </section>
    </>
  );
};

export default Dict;
