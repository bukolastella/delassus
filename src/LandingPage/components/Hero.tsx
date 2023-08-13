import React, { useLayoutEffect, useRef } from "react";
import { styled } from "styled-components";
import { gsap } from "gsap";
import Nav from "./Nav";

const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  const mainTl = useRef<any>(null);
  const pause = 6.5;
  const duration = 1;
  const bgDuration = pause / 1.3;

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      if (!self.selector) return;
      const boxes = self.selector(".box");

      mainTl.current = gsap.timeline();

      const tl = gsap
        .timeline({
          defaults: {
            duration: duration,
            stagger: {
              each: pause,
            },
          },
        })
        .to(boxes, { left: "0" })
        .to(boxes, { left: "-100%" }, pause);

      mainTl.current.add(tl).addPause();
    }, container);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      if (!self.selector) return;
      const slideWrapper = self.selector(".slideWrapper");

      const bgTl = gsap.timeline();

      const background = ["green", "orange", "yellow", "#ffe5b4", "pink"];

      const wait = () => {
        gsap.delayedCall(5.8, () => bgTl.play());
      };

      background.forEach((bg) => {
        const tl = gsap.timeline().to(slideWrapper, {
          backgroundColor: bg,
        });

        bgTl.add(tl).addPause(">", wait);
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <Container>
      <Wrapper ref={container}>
        <SlideWrapper className="slideWrapper">
          <Slide className="box">Slide 1</Slide>
          <Slide className="box">Slide 2</Slide>
          <Slide className="box">Slide 3</Slide>
          <Slide className="box">Slide 4</Slide>
        </SlideWrapper>
      </Wrapper>
      <Nav />
    </Container>
  );
};

export default Hero;

const Container = styled.div`
  background-color: red;
  height: 100vh;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;

const Slide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 100%;
`;
