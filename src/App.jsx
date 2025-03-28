import React, { useEffect, useMemo, useState } from "react";

const baseUrl = `https://boolean-spec-frontend.vercel.app/freetestapi/politicians`

function Card({ name, image, position, biography }) {
  console.log(`Card`);
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{position}</p>
      <p>{biography}</p>
    </div>
  );
};

const MemorizedCard = React.memo(Card);

function App() {
  const [politician, setPolitician] = useState([]);
  const [search, setSearch] = useState("");

  async function getPoliticians() {
    const resp = await fetch(baseUrl);
    const data = await resp.json();
    setPolitician(data);
  };

  useEffect(() => {
    getPoliticians();
  }, []);

  const filteredPoliticians = useMemo(() => {
    return politician.filter(politician =>
      politician.name.toLowerCase().includes(search.toLowerCase()) ||
      politician.biography.toLowerCase().includes(search.toLowerCase())
    );
  }, [politician, search]);

  return (
    <div className="container">
      <h1>Politici</h1>
      <input
        type="text"
        placeholder="Cerca un politico..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredPoliticians.length > 0 ? (
        <div className="card-container">
          {filteredPoliticians.map((pol) => (
            <MemorizedCard key={pol.id} {...pol}/>
          ))}
        </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
};

export default App;