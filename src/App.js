import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const limit = 15;
function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fecthCharacters();
  }, []);

  const fecthCharacters = async (page) => {
    const apiUrl = "https://narutodb.xyz/api/character";
    setIsLoading(true);
    const result = await axios.get(apiUrl, { params: { page: page } });
    console.log(result.data.characters);
    setCharacters(result.data.characters);
    setIsLoading(false);
  };

  const handleNext = async () => {
    const nextPage = page + 1;
    await fecthCharacters(nextPage);
    setPage(nextPage);
  };

  const handlePrev = async () => {
    const prevPage = page - 1;
    await fecthCharacters(prevPage);
    setPage(prevPage);
  };

  return (
    <>
      <div className="container">
        {isLoading ? (
          <div>Now loading...</div>
        ) : (
          <main>
            <div className="cards-container">
              {characters.map((character) => {
                return (
                  <div className="card" key={character.id}>
                    <img
                      src={
                        character.images[0] != null
                          ? character.images[0]
                          : "dummy.png"
                      }
                      alt="character"
                      className="card-image"
                    />
                  </div>
                );
              })}
            </div>
            <div className="pager">
              <button
                disabled={page === 1}
                className="prev"
                onClick={handlePrev}
              >
                Prev
              </button>
              <span className="page-number">1</span>
              <button
                disabled={limit > characters.length}
                className="next"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </main>
        )}
      </div>
    </>
  );
}

export default App;
