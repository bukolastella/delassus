import React, { useLayoutEffect, useRef } from "react";
import { styled } from "styled-components";
import Constaint from "../../Layout/Constaint";
import { gsap } from "gsap";

const Hero = () => {
  const container = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const slideWrapperBox = self.selector && self.selector(".slideWrapper");
      const boxes = self.selector && self.selector(".box");
      const duration = 1;
      const tl = gsap.timeline({
        repeat: -1,
        delay: 1,
      });

      boxes.forEach((element: any, i: number) => {
        const miniTl = gsap
          .timeline()
          .to(slideWrapperBox, { x: `-${i + 1}00vw`, duration: duration });

        console.log(boxes, "boxes");
        // .addPause(2);
        // .to(slideWrapperBox, { duration: duration });
        tl.add(miniTl);
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <Container>
      <Wrapper ref={container}>
        <SlideWrapper className="slideWrapper">
          <Slide bg="red" className="box">
            Slide 1
          </Slide>
          <Slide bg="yellow" className="box">
            Slide 2
          </Slide>
          <Slide bg="orange" className="box">
            Slide 3
          </Slide>
          <Slide bg="green" className="box">
            Slide 4
          </Slide>
        </SlideWrapper>
      </Wrapper>
    </Container>
  );
};

export default Hero;

const Container = styled.div`
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  display: inline-block;
  height: 100vh;
`;

const SlideWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* transform: translateX(0); */
  height: 100%;
`;

interface SlideProps {
  bg: string;
}

const Slide = styled.div<SlideProps>`
  width: 100vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ bg }) => bg};
`;
