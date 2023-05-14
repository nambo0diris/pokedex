// @ts-nocheck
import { FC } from "react";
import RegularTemplate from "../layouts/RegularTemplate";
import PokeListWrapper from "../components/PokeList/PokeListWrapper";

const Main: FC = () => {
  return (
    <RegularTemplate>
      <PokeListWrapper />
    </RegularTemplate>
  );
};

export default Main;
