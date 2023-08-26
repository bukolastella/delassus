import React, { useLayoutEffect, useRef } from "react";
import { styled } from "styled-components";
import { gsap } from "gsap";
import Nav from "./Nav";

export enum Eclasses {
  slideWrapper = "slideWrapper",
  container = "container",
  box = "box",
  nav_box = "nav_box",
  transLine = "transLine",
}

const Hero = () => {
  const container = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      if (!self.selector) return;

      const containerBox = self.selector(`.${Eclasses.container}`);
      const navBoxes = self.selector(`.${Eclasses.nav_box}`);
      const transLine = self.selector(`.${Eclasses.transLine}`);
      const slideWrapper = self.selector(`.${Eclasses.slideWrapper}`);
      const boxes = self.selector(`.${Eclasses.box}`);

      gsap.to(containerBox, { bottom: 300 });
      gsap.set(boxes[0], { left: "0" });

      const background = ["green", "orange", "yellow", "black", "pink"];

      const mainTl = gsap.timeline();

      navBoxes.forEach((box: HTMLDivElement, index: number) => {
        const progress = gsap
          .timeline()
          .set(box, { "--opacity": 1 })
          .set(transLine, {
            width: navBoxes[index].clientWidth,
            x: navBoxes[index].offsetLeft,
          })
          .to(box, { color: "white" })
          .to(box, { "--afterWidth": "100%", duration: 5 })
          .set(box, { "--opacity": 0 })
          .to(box, { color: "#cdcccc" })
          .set(
            transLine,
            {
              opacity: 1,
            },
            "<"
          )
          .to(transLine, {
            width:
              navBoxes[index === navBoxes.length - 1 ? 0 : index + 1]
                .clientWidth,
            x: navBoxes[index === navBoxes.length - 1 ? 0 : index + 1]
              .offsetLeft,
          })
          .set(transLine, {
            opacity: 0,
          });

        const bgTl = gsap.to(slideWrapper, {
          backgroundColor: background[index],
        });

        const slidesTl = gsap
          .timeline()
          .to(boxes[index], { left: "-100%" })
          .to(boxes[index + 1], { left: "0" }, "<");

        mainTl
          .addLabel(`${index}`)
          .add(progress)
          .add(bgTl, "<-0.5")
          .add(slidesTl, "<-0.5");

        box.addEventListener("click", () => {
          mainTl.pause();
          mainTl.kill();

          gsap
            .timeline({
              onComplete: () => {
                mainTl.play(`${index}`);
              },
            })
            .set(transLine, {
              opacity: 1,
            })
            .to(transLine, {
              width: box.clientWidth,
              x: box.offsetLeft,
            })
            .to(slideWrapper, {
              backgroundColor: background[index],
            })
            .to(boxes[index], { left: "-100%" }, "<");
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <Container ref={container}>
      <Wrapper>
        <SlideWrapper className={Eclasses.slideWrapper}>
          <Slide className={Eclasses.box}>Slide 1</Slide>
          <Slide className={Eclasses.box}>Slide 2</Slide>
          <Slide className={Eclasses.box}>Slide 3</Slide>
          <Slide className={Eclasses.box}>Slide 4</Slide>
          <Slide className={Eclasses.box}>Slide 5</Slide>
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
