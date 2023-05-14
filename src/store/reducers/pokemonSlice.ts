import { createSlice } from "@reduxjs/toolkit";

interface IPokemonsInitialState {
  isUsingFilters: boolean;
  pageSize: number;
  isLoading: boolean;
  selectedPokemon: {} | null;
  pokemons: [];
  count: number | null;
  offset: number;
}

const initialState: IPokemonsInitialState = {
  pageSize: window.localStorage.pageSize ?? 10,
  isLoading: false,
  selectedPokemon: null,
  pokemons: [],
  count: null,
  isUsingFilters: false,
  offset: 0,
};

export const slice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemons: (state: IPokemonsInitialState, action): void => {
      state.pokemons = action.payload;
    },
    setCount: (state: IPokemonsInitialState, action): void => {
      state.count = action.payload;
    },
    setPageSize: (state: IPokemonsInitialState, action): void => {
      window.localStorage.pageSize = action.payload;
      state.pageSize = action.payload;
    },
    setIsLoading: (state: IPokemonsInitialState, action): void => {
      state.isLoading = action.payload;
    },
    setSelectedPokemon: (state: IPokemonsInitialState, action): void => {
      state.selectedPokemon = action.payload;
    },
    setIsUsingFilters: (state: IPokemonsInitialState, action): void => {
      state.isUsingFilters = action.payload;
    },

    setOffset: (state: IPokemonsInitialState, action): void => {
      state.offset = action.payload;
    },
  },
});

export default slice.reducer;
export const {
  setPokemons,
  setCount,
  setPageSize,
  setIsLoading,
  setSelectedPokemon,
  setIsUsingFilters,
  setOffset,
} = slice.actions;
