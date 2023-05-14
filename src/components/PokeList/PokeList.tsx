// @ts-nocheck
import React, { useEffect, useState } from "react";
import PokeItem from "./PokeItem";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchDataFromArray } from "../../common/fetchData";
import { setIsLoading } from "../../store/reducers/pokemonSlice";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

const PokeList = () => {
  const [pokeList, setPokeList] = useState([]);
  const { pokemons, isLoading, isUsingFilters, offset, pageSize } =
    useAppSelector((state) => state.pokemonReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    fetchDataFromArray(pokemons).then((response) => {
      setPokeList(response);
    });
    dispatch(setIsLoading(false));
  }, [pokemons]);

  if (isLoading) {
    return (
      <div style={{ width: "100%", display: "flex", height: "100%" }}>
        <Spin style={{ margin: "auto" }} indicator={antIcon} />
      </div>
    );
  }
  return (
    <div className={"pokeList"}>
      {pokeList.length &&
        pokeList.map((pokemon, index) => {
          if (pokemon) {
            if (!isUsingFilters) {
              return <PokeItem key={index} pokemon={pokemon} />;
            } else {
              if (index > offset && index < offset + pageSize) {
                return <PokeItem key={index} pokemon={pokemon} />;
              }
            }
          }
        })}
    </div>
  );
};

export default PokeList;
