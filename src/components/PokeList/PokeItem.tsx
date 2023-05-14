// @ts-nocheck
import { FC } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { getBackground } from "../../common/getBackground";
import { setSelectedPokemon } from "../../store/reducers/pokemonSlice";

const PokeItem: FC = ({ pokemon }) => {
  const dispatch = useAppDispatch();
  const selectPokemon = () => {
    dispatch(setSelectedPokemon(pokemon));
  };

  return (
    <div className={"pokeItem"} onClick={selectPokemon}>
      <div className="name">{pokemon.name.toUpperCase()}</div>
      <div className="id">id: {pokemon.id}</div>
      <div className="weight">Weight: {pokemon.weight}</div>
      <div className="height">Height: {pokemon.height}</div>
      <div
        className="type"
        style={{ display: "flex", flexDirection: "row", gap: "10px" }}
      >
        {pokemon.types.map((type, id) => {
          const background = getBackground(type.type.name);
          return (
            <div
              key={id}
              style={{
                background: background,
                padding: "3px 8px",
                borderRadius: "4px",
                color: "white",
              }}
            >
              {type.type.name}
            </div>
          );
        })}
      </div>

      <img src={pokemon.sprites.front_default} alt="" />
    </div>
  );
};

export default PokeItem;
