import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { styled } from "styled-components";

const Nav = () => {
  const container = useRef<HTMLImageElement>(null);
  const animation = useRef<any>(null);
  const stretch = useRef<any>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const boxes = self.selector && self.selector(".box");
      const wrap = self.selector && self.selector(".wrap");

      gsap.timeline().fromTo(
        container.current,
        {
          opacity: 0,
          ease: "none",
        },
        {
          opacity: 1,
          bottom: "300px",
          ease: "none",
        }
      );

      animation.current = gsap.timeline({ repeat: -1 });

      boxes.forEach((element: HTMLElement, index: number) => {
        const boxTl = gsap
          .timeline()
          .to(element, {
            "--opacity": 1,
            ease: "none",
          })
          .to(element, {
            "--width": "100%",
            ease: "none",
            duration: 5,
          });

        stretch.current = gsap
          .timeline()
          .set(wrap, {
            x: boxes[index].offsetLeft,
            width: boxes[index].clientWidth,
            opacity: 1,
          })
          .to(wrap, {
            x: boxes[index === boxes.length - 1 ? 0 : index + 1].offsetLeft,
            width:
              boxes[index === boxes.length - 1 ? 0 : index + 1].clientWidth,
          })
          .to(
            element,
            {
              color: "white",
              ease: "none",
              duration: 0.1,
            },
            "<"
          )
          .to(
            element,
            {
              "--opacity": 0,
              color: "#cdcccc",
              ease: "none",
              duration: 0.1,
            },
            "<"
          )
          .to(
            wrap,
            {
              opacity: 0,
            },
            "=-0.2"
          );

        animation.current?.addLabel(`${index}`).add(boxTl).add(stretch.current);

        const toggle = (el: any) => {
          animation.current.progress(1);
          animation.current.kill();
          const clickedElement = el.target;
          const temp = gsap
            .timeline()
            .to(wrap, {
              opacity: 1,
              x: clickedElement.offsetLeft,
              width: clickedElement.clientWidth,
            })
            .to(
              wrap,
              {
                opacity: 0,
                onComplete: () => animation.current?.play(`${index}`),
              },
              "=-0.2"
            );
          temp.play();
        };

        element.addEventListener("click", toggle);
      });

      // return () =>
      //   boxes.forEach((element: any) =>
      //     element.removeEventListener("click", toggle)
      //   );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <Container ref={container}>
      <Wrapper>
        <div className="wrap"></div>
        <div className="box">Snacking tomatoes</div>
        <div className="box" onClick={() => {}}>
          Citrus
        </div>
        <div className="box">Grapes</div>
        <div className="box">Avocados</div>
        <div className="box">Flowers</div>
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
  bottom: 100px;
  left: 200px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;

  .wrap {
    background-color: white;
    height: 2px;
    position: absolute;
    bottom: -10px;
    opacity: 1; //
    width: 200px; //
    left: 0;
  }

  .box {
    cursor: pointer;
    position: relative;
    font-size: 1.5rem;
    color: #cdcccc;
    --width: 0;
    --opacity: 0;
    --left: 0;
    --right: unset;

    &::before,
    &::after {
      content: "";
      position: absolute;
      left: 0;
      left: var(--left);
      bottom: -10px;
      height: 2px;
      opacity: var(--opacity);
    }

    &::before {
      width: 100%;
      background-color: #908f8f;
    }

    &::after {
      width: var(--width);
      background-color: white;
      left: var(--left);
      right: var(--right);
    }
  }
`;

const Button = styled.button`
  width: max-content;
  padding: 20px;
  border-radius: 20px;
`;
