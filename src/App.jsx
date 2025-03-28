import { useEffect, useState } from "react";

const baseUrl = `https://boolean-spec-frontend.vercel.app/freetestapi/politicians`

function App() {
  const [politician, setPolitician] = useState([]);

  async function getPoliticians() {
    const resp = await fetch(baseUrl);
    const data = await resp.json();
    setPolitician(data);
    console.log(data);
  }

  useEffect(() => {
    getPoliticians();
  }, []);

  function Card({ name, image, position, biography }) {
    return (
      <div className="card">
        <img src={image} alt={name}/>
        <h2>{name}</h2>
        <p>{position}</p>
        <p>{biography}</p>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Politici</h1>
      {politician.length > 0 ? (
        <div className="card-container">
          {politician.map((pol, index) => (
            <Card
              key={index}
              name={pol.name}
              image={pol.image}
              position={pol.position}
              biography={pol.biography}
            />
          ))}
        </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  )
}

export default App
