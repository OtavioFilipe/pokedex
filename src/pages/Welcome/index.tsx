import AnimatedLottieView from "lottie-react-native";
import React from "react";
import pokemonAnimation from "../../assets/images/pokemon.json";
import { Button } from "../../components/Button";

import * as S from "./styles";

export function Welcome({ navigation }) {
  function handleNavigation() {
    navigation.navigate("Home");
  }

  return (
    <S.Container>
      <S.Content>
        <S.WrapperAnimation>
          <S.WrapperImage>
            <AnimatedLottieView
              style={{ width: 200 }}
              autoPlay
              source={pokemonAnimation}
              loop
            />
          </S.WrapperImage>
        </S.WrapperAnimation>
        <S.Title>Bem Vindo</S.Title>
        <S.SubTitle>Encontre todos os pokémons em um só lugar</S.SubTitle>
      </S.Content>
      <S.Footer>
        <Button title="Iniciar" onPress={handleNavigation} />
      </S.Footer>
    </S.Container>
  );
}
