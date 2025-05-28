"use client";

import { useState } from "react";

export default function Details() {
  const [data, setData] = useState();
  const [details, setDetails] = useState();

  const fetchPokemonData = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const mydata = await response.json();
    setData(mydata);
  };

  const fetchPokemonDetails = async (url) => {
    setDetails(null);
    const response = await fetch(url);
    const pokemonDetails = await response.json();
    setDetails(pokemonDetails);
  };

  const test = () => {
    console.log(details);
    console.log(data);
  };

  return (
    <div className="container my-4">
      <div className="mb-3">
        <button className="btn btn-secondary me-2" onClick={test}>
          Run Test
        </button>
        <button className="btn btn-primary" onClick={fetchPokemonData}>
          Get Data
        </button>
      </div>

      {data && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {data.results.map((pokemon, index) => (
            <div key={index} className="col">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-capitalize">{pokemon.name}</h5>
                  <button
                    className="btn btn-outline-info"
                    onClick={() => fetchPokemonDetails(pokemon.url)}
                  >
                    Get Pokemon Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {details && (
  <div className="card mt-4 p-4 shadow">
    <h3 className="card-title text-capitalize">{details.name}</h3>
    <p><strong>ID:</strong> {details.id}</p>
    <p><strong>Base Experience:</strong> {details.base_experience}</p>
    <p><strong>Height:</strong> {details.height}</p>
    <p><strong>Weight:</strong> {details.weight}</p>

    {/* Sprites */}
    <div className="mb-3">
      <h5>Sprites</h5>
      <div className="d-flex flex-wrap gap-2">
        <img src={details.sprites.front_default} alt="Front" className="img-thumbnail" />
        <img src={details.sprites.back_default} alt="Back" className="img-thumbnail" />
        <img src={details.sprites.front_shiny} alt="Shiny Front" className="img-thumbnail" />
        <img src={details.sprites.back_shiny} alt="Shiny Back" className="img-thumbnail" />
      </div>
    </div>

    {/* Abilities */}
    <div className="mb-3">
      <h5>Abilities</h5>
      <ul>
        {details.abilities.map((ab, idx) => (
          <li key={idx}>
            {ab.ability.name} {ab.is_hidden && <span className="badge bg-secondary ms-1">Hidden</span>}
          </li>
        ))}
      </ul>
    </div>

    {/* Types */}
    <div className="mb-3">
      <h5>Types</h5>
      <ul className="list-inline">
        {details.types.map((t, idx) => (
          <li key={idx} className="list-inline-item badge bg-success me-2">{t.type.name}</li>
        ))}
      </ul>
    </div>

    {/* Stats */}
    <div className="mb-3">
      <h5>Stats</h5>
      {details.stats.map((s, idx) => (
        <div key={idx} className="mb-2">
          <strong className="text-capitalize">{s.stat.name}:</strong>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: `${s.base_stat}%` }}>
              {s.base_stat}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Cries */}
    <div className="mb-3">
      <h5>Cries</h5>
      <audio controls src={details.cries.latest}></audio>
    </div>

    {/* Moves */}
    <div className="mb-3">
      <h5>Moves (First 5)</h5>
      <ul>
        {details.moves.slice(0, 5).map((m, idx) => (
          <li key={idx}>
            <strong>{m.move.name}</strong>
            <ul>
              {m.version_group_details.map((v, vidx) => (
                <li key={vidx}>
                  Level: {v.level_learned_at} via {v.move_learn_method.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>

    {/* Game Versions */}
    <div className="mb-3">
      <h5>Game Versions</h5>
      <div className="d-flex flex-wrap gap-2">
        {details.game_indices.map((v, idx) => (
          <span key={idx} className="badge bg-info text-dark">{v.version.name}</span>
        ))}
      </div>
    </div>

    {/* Forms */}
    <div className="mb-3">
      <h5>Forms</h5>
      <ul>
        {details.forms.map((f, idx) => (
          <li key={idx}>{f.name}</li>
        ))}
      </ul>
    </div>
  </div>
)}

    </div>
  );
}
