import React, { FC } from "react";
import styled from "styled-components";
import { mediaObj } from "../styles/Media";

interface Props {
  children: JSX.Element;
}

const Constaint: FC<Props> = ({ children }) => {
  return <MainWrapper>{children}</MainWrapper>;
};

export default Constaint;

export const MainWrapper = styled.div`
  /* max-width: 1240px; */
  margin-left: auto;
  margin-right: auto;
  padding: 0 5.25rem;

  @media (min-width: 1200px) {
    max-width: 1440px;
    padding: 0 5.25rem;
  }

  ${mediaObj.smallDesktop} {
    padding: 0 5%;
  }

  ${mediaObj.mobile} {
    padding: 0 1.25rem;
  }
`;
