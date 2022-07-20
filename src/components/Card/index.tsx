import React from "react";
import { TouchableOpacityProps } from "react-native";
import dotsImage from "../../assets/images/dots.png";

import * as S from "./styles";

type PokemonType = {
  type: {
    name: string;
  };
};

type Pokemon = {
  name: string;
  url: string;
  id: number;
  types: PokemonType[];
};

type Props = {
  data: Pokemon;
} & TouchableOpacityProps;

export function Card({ data, ...rest }: Props) {
  return (
    <S.Container type={data.types[0].type.name} {...rest}>
      <S.LeftSide>
        <S.PokemonId>#{data.id}</S.PokemonId>
        <S.PokemonName>{data.name}</S.PokemonName>
        <S.ImageCardDetailLeftSide source={dotsImage} />

        <S.PokemonContentType>
          {data.types.map((pokemonType) => (
            <S.PokemonType type="bug">
              <S.PokemonTypeText key={pokemonType.type.name}>
                {pokemonType.type.name}
              </S.PokemonTypeText>
            </S.PokemonType>
          ))}
        </S.PokemonContentType>
      </S.LeftSide>
      {/* <S.RightSide></S.RightSide> */}
    </S.Container>
  );
}
