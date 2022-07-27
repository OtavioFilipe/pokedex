import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text } from "react-native";
import { useTheme } from "styled-components/native";
import api from "../../services/api";

import { Feather } from "@expo/vector-icons";

import circle from "../../assets/images/circle.png";
import dots from "../../assets/images/dots.png";

import { FadeAnimation } from "../../components/FadeAnimation";
import * as S from "./styles";

type RouteParams = {
  pokemonId: number;
};

type Stats = {
  base_stat: 62;
  stat: {
    name: string;
  };
};

type Ability = {
  ability: {
    name: string;
  };
};

export type TypeName =
  | "grass"
  | "fire"
  | "water"
  | "poison"
  | "normal"
  | "bug"
  | "flying"
  | "eletric"
  | "ground";

type PokemonType = {
  type: {
    name: TypeName;
  };
};

type PokemonProps = {
  id: number;
  name: string;
  stats: Stats[];
  abilities: Ability[];
  color: string;
  types: PokemonType[];
};

export function About() {
  const route = useRoute();
  const { goBack } = useNavigation();
  const { pokemonId } = route.params as RouteParams;
  const { colors } = useTheme();

  const [pokemon, setPokemon] = useState({} as PokemonProps);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function getPokemonDetails() {
      try {
        const response = await api.get(`/pokemon/${pokemonId}`);
        const { stats, abilities, id, name, types } = response.data;

        const currentType = types[0].type.name as TypeName;
        const color = colors.backgroundCard[currentType];

        setPokemon({
          stats,
          abilities,
          id,
          name,
          types,
          color,
        });
      } catch (error) {
        Alert.alert("Ops, ocorreu algum erro");
      } finally {
        setLoad(false);
      }
    }

    getPokemonDetails();
  }, []);

  function HandleGoBack() {
    goBack();
  }

  return (
    <>
      {load ? (
        <>
          <Text style={{ marginTop: 200 }}></Text>
        </>
      ) : (
        <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
          <S.Header type={pokemon.types[0].type.name}>
            <S.BackButton onPress={HandleGoBack}>
              <Feather name="chevron-left" size={24} color="#FFFFFF" />
            </S.BackButton>

            <S.ContentImage>
              <S.CircleImage source={circle} />
              <FadeAnimation>
                <S.PokemonImage
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
                  }}
                />
              </FadeAnimation>
            </S.ContentImage>

            <S.Content>
              <S.PokemonId>#{pokemon.id}</S.PokemonId>
              <S.PokemonName>{pokemon.name}</S.PokemonName>

              <S.PokemonTypeContainer>
                {pokemon.types.map(({ type }) => (
                  <S.PokemonType type={type.name} key={type.name}>
                    <S.PokemonTypeText>{type.name}</S.PokemonTypeText>
                  </S.PokemonType>
                ))}
              </S.PokemonTypeContainer>
            </S.Content>
            <S.DotsImage source={dots} />
          </S.Header>

          <S.Container>
            <S.Title type={pokemon.types[0].type.name}>Base States</S.Title>
            {pokemon.stats.map((attribute) => (
              <S.StatusBar key={attribute.stat.name}>
                <S.Attributes>{attribute.stat.name}</S.Attributes>
                <S.AttributeValue>{attribute.base_stat}</S.AttributeValue>

                <S.ContentBar>
                  <S.ProgressBar
                    type={pokemon.types[0].type.name}
                    borderWidth={0}
                    progress={100}
                    width={attribute.base_stat}
                    color={pokemon.color}
                    borderColor={pokemon.color}
                  />
                </S.ContentBar>
              </S.StatusBar>
            ))}

            <S.Title type={pokemon.types[0].type.name}>Abilities</S.Title>

            {pokemon.abilities.map((currentAbility) => (
              <S.Ability>{currentAbility.ability.name}</S.Ability>
            ))}
          </S.Container>
        </ScrollView>
      )}
    </>
  );
}
