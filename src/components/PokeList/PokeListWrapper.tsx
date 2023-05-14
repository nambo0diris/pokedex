// @ts-nocheck
import "./PokeList.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import PokeList from "./PokeList";
import { useEffect, useState } from "react";
import { fetchData } from "../../common/fetchData";
import { POKEMON_API } from "../../params/params";
import {
  setCount,
  setIsLoading,
  setOffset,
  setPageSize,
  setPokemons,
  setSelectedPokemon,
} from "../../store/reducers/pokemonSlice";
import { Modal, Pagination, Spin } from "antd";
import "./PokeList.css";
import Filters from "./Filters";

const PokeListWrapper = () => {
  const [total, setTotal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pokemons, selectedPokemon, count, pageSize, isUsingFilters, offset } =
    useAppSelector((state) => state.pokemonReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    if (!isUsingFilters) {
      fetchData(POKEMON_API + "pokemon/", {
        params: { limit: pageSize, offset: offset },
      }).then((response) => {
        dispatch(setPokemons(response.results));
        dispatch(setCount(response.count));
        dispatch(setIsLoading(false));
      });
    } else {
      dispatch(setIsLoading(false));
    }
  }, [pageSize, offset, isUsingFilters]);

  useEffect(() => {
    if (selectedPokemon) {
      setIsModalOpen(true);
    }
  }, [selectedPokemon]);

  useEffect(() => {
    if (count) {
      setTotal(count);
    } else {
      setTotal(pokemons.length);
    }
  }, [count]);
  const handleCancel = () => {
    dispatch(setSelectedPokemon(null));
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    dispatch(setOffset(page * pageSize - pageSize));
    dispatch(setPageSize(pageSize));
  };

  return (
    <div>
      <Filters />
      {pokemons.length > 1 && (
        <Pagination
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px 0",
          }}
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          showSizeChanger
        />
      )}
      <PokeList />
      {selectedPokemon && (
        <Modal
          title={selectedPokemon.name.toUpperCase()}
          open={isModalOpen}
          footer={null}
          onCancel={handleCancel}
        >
          <img src={selectedPokemon.sprites.front_default} alt="" />
          <p>
            <b>Weight:</b> {selectedPokemon.weight}
          </p>
          <p>
            <b>Height:</b> {selectedPokemon.height}
          </p>
          <p>
            <b>Base Experience:</b> {selectedPokemon.base_experience}
          </p>
          <p>
            <b>Abilities:</b> {selectedPokemon.abilities.length}
          </p>
          <p>
            <b>Moves:</b> {selectedPokemon.moves.length}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default PokeListWrapper;
