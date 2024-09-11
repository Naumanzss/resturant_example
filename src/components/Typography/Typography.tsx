import { Color } from "@/constants/Colors";
import { FontFamily } from "@/constants/Font";
import styled, { css } from "styled-components";

interface TypographyProps {
  variant?:
    | "heading"
    | "subheading"
    | "title"
    | "large"
    | "medium"
    | "small"
    | "base";
  marginTop?: string;
  color?: string;
  fontFamily?: string;
  fontWeight?: string;
}

const variantStyles = (color?: string, fontFamily?: string) => ({
  heading: css`
    font-size: clamp(2.1em, 5vw, 3.3em);
    font-weight: bold;
    color: ${color ?? Color.headingColor};
    font-family: ${fontFamily ?? FontFamily.secondary};
  `,
  title: css`
    font-size: clamp(1.6rem, 5vw, 2rem);
    color: ${color ?? Color.subHeading};
    font-family: ${fontFamily ?? FontFamily.bold};
  `,
  subheading: css`
    font-size: clamp(1.35rem, 5vw, 1.6rem);
    color: ${color ?? Color.subHeading};
    font-family: ${fontFamily ?? FontFamily.medium};
  `,
  large: css`
    font-size: clamp(3em, 5vw, 3.3em);
    font-weight: bold;
    color: ${color ?? Color.headingColor};
    font-family: ${fontFamily ?? FontFamily.secondary};
  `,
  medium: css`
    font-size: clamp(1rem, 5vw, 1.3rem);
    font-family: ${fontFamily ?? FontFamily.medium};
  `,
  small: css`
    font-size: clamp(1rem, 5vw, 1.2rem);
    line-height: 1.6;
    font-family: ${fontFamily ?? FontFamily.medium};
  `,
  base: css`
    font-size: clamp(0.65rem, 5vw, 1rem);
    line-height: 1.7;
    color: ${color ?? Color.textColor};
    font-family: ${fontFamily ?? FontFamily.medium};
  `,
});

const Typography = styled.p<TypographyProps>`
  ${({ variant, color, fontFamily }) =>
    variantStyles(color, fontFamily)[variant || "base"]}
  margin-top: ${({ marginTop }) => marginTop || "0"};
`;

export default Typography;
