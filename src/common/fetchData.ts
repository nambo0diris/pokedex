import axios from "axios";

export const fetchData = async (url, params = {}) => {
  try {
    const { data, status } = await axios.get(url, params);
    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchDataFromArray = async (pokeList) => {
  return await Promise.all(
    pokeList.map((pokeItem) => {
      return fetchData(pokeItem.url);
    })
  );
};
