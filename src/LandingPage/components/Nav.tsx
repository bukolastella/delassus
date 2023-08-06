import React from "react";
import { styled } from "styled-components";

const Nav = () => {
  return (
    <Container>
      <Wrapper>
        <div>Snacking tomatoes</div>
        <div>Citrus</div>
        <div>Grapes</div>
        <div>Avocados</div>
        <div>Flowers</div>
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
  z-index: 10;
  bottom: 300px;
  left: 200px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  & > div {
    position: relative;
    font-size: 1.5rem;
    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -10px;
      width: 100%;
      height: 2px;
    }

    &::before {
      background-color: red;
    }

    &::after {
      background-color: white;
    }
  }
`;

const Button = styled.button`
  width: max-content;
  padding: 20px;
  border-radius: 20px;
`;
