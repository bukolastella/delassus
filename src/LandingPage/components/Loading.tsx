import React, { useLayoutEffect, useRef } from "react";
import { styled } from "styled-components";
import Constaint from "../../Layout/Constaint";
import GsapEffect, { effectNames } from "./GsapEffect";
import AvocadoImage from "../../images/avocado.png";
import FlowerImage from "../../images/flower.png";
import GrapesImage from "../../images/grapes.png";
import OrangeImage from "../../images/orange.png";
import TomatoImage from "../../images/tomato.png";
import { gsap } from "gsap";

const Loading = () => {
  const container = useRef<HTMLImageElement>(null);
  const imgWrapperRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const box = self.selector && self.selector(".container");
      const background = ["green", "orange", "yellow", "pink", "#ffe5b4"];

      const mainTl = gsap.timeline({ repeat: -1 });

      background.forEach((bg) => {
        const tl = gsap.to(box, { backgroundColor: bg, duration: 1.01 });
        mainTl.add(tl);
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container}>
      <Container className="container">
        <Constaint>
          <Wrapper>
            <GsapEffect targetRef={imgWrapperRef} effect={effectNames.loading}>
              <ImgWrapper ref={imgWrapperRef}>
                <img src={AvocadoImage} alt="" />
                <img src={FlowerImage} alt="" />
                <img src={GrapesImage} alt="" />
                <img src={OrangeImage} alt="" />
                <img src={TomatoImage} alt="" />
              </ImgWrapper>
            </GsapEffect>
          </Wrapper>
        </Constaint>
      </Container>
    </div>
  );
};

export default Loading;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: grey;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ImgWrapper = styled.div`
  width: 24px;
  height: 24px;
  /* background-color: red; */
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;
