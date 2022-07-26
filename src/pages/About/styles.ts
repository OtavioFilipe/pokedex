import styled, { css } from 'styled-components/native';
import { TypeName } from './index';

type TypeProps = {
    type: TypeName
}

export const Header = styled.View<TypeProps>`
    ${({ theme, type }) => css`
        background-color: ${ theme.colors.backgroundCard[type]};
        height: 340px;
        padding: 20px;

        flex-direction: row;
        align-items: center;

        position: relative;
    `}
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    top: 70px;
    left: 40px;
`;