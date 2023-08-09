import React, { useLayoutEffect, useRef } from "react";
import { styled } from "styled-components";
import Constaint from "../../Layout/Constaint";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Nav from "./Nav";

const Hero = () => {
  const container = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const slideWrapperBox = self.selector && self.selector(".slideWrapper");
      const targets = slideWrapperBox[0].children;

      let numberOfTargets = targets.length;

      let duration = 2; //change this
      let pause = 0.4; // change this

      let stagger = duration + pause;
      let repeatDelay = stagger * (numberOfTargets - 1) + pause;

      let animation = gsap.timeline({
        defaults: {
          ease: "circ.in",
          duration: duration,
          stagger: {
            each: stagger,
            repeat: -1,
            repeatDelay: repeatDelay,
          },
        },
      });

      // animation
      //   .from(targets, {
      //     x: "100vw",
      //   })
      //   .to(
      //     targets,
      //     {
      //       x: "-100vw",
      //     },
      //     stagger
      //   );
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
      <Nav />
    </Container>
  );
};

export default Hero;

const Container = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Wrapper = styled.div`
  position: absolute;
  /* display: inline-block; */
  width: 100%;
  height: 100%;
`;

const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

interface SlideProps {
  bg: string;
}

const Slide = styled.div<SlideProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ bg }) => bg};
`;
