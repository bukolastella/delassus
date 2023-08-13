import React, { FC, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { styled } from "styled-components";

interface Props {}

const Nav: FC<Props> = () => {
  const container = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      if (!self.selector) return;

      const containerBox = self.selector(".container");
      const boxes = self.selector(".box");
      const transLine = self.selector(".transLine");

      gsap.to(containerBox, { bottom: 300 });

      const mainTl = gsap.timeline();

      boxes.forEach((box: HTMLDivElement, index: number) => {
        const progress = gsap
          .timeline()
          .set(box, { "--opacity": 1 })
          .set(transLine, {
            width: boxes[index].clientWidth,
            x: boxes[index].offsetLeft,
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
              boxes[index === boxes.length - 1 ? 0 : index + 1].clientWidth,
            x: boxes[index === boxes.length - 1 ? 0 : index + 1].offsetLeft,
          })
          .set(transLine, {
            opacity: 0,
          });

        mainTl.addLabel(`${index}`).add(progress);

        box.addEventListener("click", () => {
          gsap
            .timeline()
            .set(transLine, {
              opacity: 1,
            })
            .to(transLine, {
              width: box.clientWidth,
              x: box.offsetLeft,
              onComplete: () => {
                mainTl.play(`${index}`);
              },
            });
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container}>
      <Container className="container">
        <Wrapper>
          <TransLine className="transLine" />
          <Box className="box">Snacking tomatoes</Box>
          <Box className="box">Citrus</Box>
          <Box className="box">Grapes</Box>
          <Box className="box">Avocados</Box>
          <Box className="box">Flowers</Box>
        </Wrapper>
        <Button>Discover</Button>
      </Container>
    </div>
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
