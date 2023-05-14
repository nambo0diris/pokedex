// @ts-nocheck
import React, { FC, useEffect, useState } from "react";
import { Input, Space, Tag } from "antd";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setCount,
  setIsLoading,
  setIsUsingFilters,
  setOffset,
  setPokemons,
} from "../../store/reducers/pokemonSlice";
import { getBackground } from "../../common/getBackground";
import CheckableTag from "antd/es/tag/CheckableTag";
import { fetchData, fetchDataFromArray } from "../../common/fetchData";
import {POKEMON_API} from "../../params/params";

const options = [
  { value: "gold" },
  { value: "lime" },
  { value: "green" },
  { value: "cyan" },
];

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

const Filters: FC = () => {
  const { isUsingFilters, pageSize, offset } = useAppSelector(
    (state) => state.pokemonReducer
  );
  const [nameFilter, setNameFilter] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { CheckableTag } = Tag;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    fetchData(POKEMON_API + "type/").then((response) => {
      const tagsCollection = [...response.results];
      tagsCollection.forEach((type) => {
        type.value = getBackground(type.name);
        type.label = type.name;
        delete type.name;
      });
      setTagsList(tagsCollection);
      dispatch(setIsLoading(false));
    });
  }, []);

  useEffect(() => {
    const list = [];
    if (selectedTags.length) {
      dispatch(setIsUsingFilters(true));
      selectedTags.forEach((tag) => {
        list.push(tag);
      });

      const pokeList = [];
      dispatch(setIsLoading(true));
      fetchDataFromArray(list).then((response) => {
        response.forEach((pokemons) => {
          pokemons.pokemon.forEach((pokemon) => {
            pokeList.push({ ...pokemon.pokemon });
          });
        });
        dispatch(setPokemons(pokeList));
        dispatch(setCount(pokeList.length));
        dispatch(setIsLoading(false));
      });
    } else {
      dispatch(setIsUsingFilters(false));
      dispatch(setOffset(0));
    }
  }, [selectedTags]);

  const onChangeInputHandler = (e) => {
    setSelectedTags([]);
    setNameFilter(e.target.value);
    if (
      e.target.value.length > 0 &&
      e.target.value[e.target.value.length - 1] !== " "
    ) {
      dispatch(
        setPokemons([
          {
            name: e.target.value,
            url: POKEMON_API + "pokemon/" + e.target.value.toLowerCase(),
          },
        ])
      );
      dispatch(setCount(1));
    }
    if (e.target.value === "") {
      dispatch(setPokemons([]));
      dispatch(setOffset(0));
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
    }
  };

  const onPressEnterHandler = (e) => {};

  const handleChange = (tag: string, checked: boolean) => {
    setNameFilter("");
    let prevSelectedTags = selectedTags;
    let nextSelectedTags;
    if (checked && selectedTags.length < 2) {
      nextSelectedTags = [...selectedTags, tag];
    } else {
      nextSelectedTags = selectedTags.filter((t) => t !== tag);
    }

    if (
      nextSelectedTags &&
      prevSelectedTags.length !== nextSelectedTags.length
    ) {
      setSelectedTags(nextSelectedTags);
    }
  };

  return (
    <div className={"filters__wrapper"}>
      <div className="filter__name">
        <Input
          value={nameFilter}
          placeholder="Enter the name"
          onChange={onChangeInputHandler}
          onPressEnter={onPressEnterHandler}
        />
      </div>
      <div className="filter__tag">
        <Space size={[0, 8]} wrap>
          {tagsList &&
            tagsList.map((tag, idx) => {
              return (
                <CheckableTag
                  key={idx}
                  checked={selectedTags.includes(tag)}
                  onChange={(checked) => handleChange(tag, checked)}
                >
                  {tag.label}
                </CheckableTag>
              );
            })}
        </Space>
      </div>
    </div>
  );
};

export default Filters;
