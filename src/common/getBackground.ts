export const getBackground = (type) => {
  switch (type) {
    case "fighting":
      return "gold";
    case "flying":
      return "dodgerblue";
    case "poison":
      return "darkgreen";
    case "ground":
      return "darkred";
    case "rock":
      return "brown";
    case "bug":
      return "darkgoldenrod";
    case "ghost":
      return "lightslategray";
    case "steel":
      return "slategray";
    case "fire":
      return "orangered";
    case "water":
      return "aqua";
    case "grass":
      return "forestgreen";
    case "electric":
      return "royalblue";
    case "psychic":
      return "";
    case "ice":
      return "cyan";
    case "dragon":
      return "red";
    case "dark":
      return "indigo";
    case "fairy":
      return "skyblue";
    case "unknown":
      return "darkkhaki";
    case "shadow":
      return "black";
    default:
      return "darksalmon";
  }
};
