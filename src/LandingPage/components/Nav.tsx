import React, { FC } from "react";
import { styled } from "styled-components";
import { Eclasses } from "./Hero";

interface Props {}

const Nav: FC<Props> = () => {
  return (
    <Container className={Eclasses.container}>
      <Wrapper>
        <TransLine className={Eclasses.transLine} />
        <Box className={Eclasses.nav_box}>Snacking tomatoes</Box>
        <Box className={Eclasses.nav_box}>Citrus</Box>
        <Box className={Eclasses.nav_box}>Grapes</Box>
        <Box className={Eclasses.nav_box}>Avocados</Box>
        <Box className={Eclasses.nav_box}>Flowers</Box>
      </Wrapper>
      <Button>Discover</Button>
    </Container>
  );
};

export default Nav;

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 40px;
  bottom: 100px;
  left: 200px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
`;

const TransLine = styled.div`
  background-color: white;
  height: 2px;
  position: absolute;
  bottom: -10px;
  opacity: 0;
  left: 0;
`;

const Box = styled.div`
  cursor: pointer;
  position: relative;
  font-size: 1.5rem;
  color: #cdcccc;
  --opacity: 0;
  --afterWidth: 0;
  /* --width: 0;
  --opacity: 0;
  --left: 0;
  --right: unset; */

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    height: 2px;
    opacity: var(--opacity);
  }

  &::before {
    width: 100%;
    background-color: #908f8f;
    /* left: var(--left); */
  }

  &::after {
    background-color: white;
    width: var(--afterWidth);
    /* width: var(--width);
    left: var(--left);
    right: var(--right); */
  }
`;

const Button = styled.button`
  width: max-content;
  padding: 20px;
  border-radius: 20px;
`;
