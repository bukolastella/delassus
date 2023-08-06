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
          // ease: "none",
          // ease: CustomEase.create(
          //   "custom",
          //   "M0,0 C0,0 0,0.034 0.066,0.126 0.071,0.151 0.144,0.212 0.156,0.234 0.163,0.248 0.214,0.289 0.226,0.3 0.416,0.478 0.486,0.496 0.66,0.684 0.671,0.696 0.725,0.757 0.736,0.768 0.749,0.781 0.791,0.826 0.8,0.846 0.81,0.869 0.851,0.915 0.856,0.942 0.872,1.036 1,0.99 1,0.99 "
          // ),
          duration: duration,
          stagger: {
            each: stagger,
            repeat: -1,
            repeatDelay: repeatDelay,
          },
        },
      });

      animation
        .from(targets, {
          x: "100vw",
        })
        .to(
          targets,
          {
            x: "-100vw",
          },
          stagger
        );
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
