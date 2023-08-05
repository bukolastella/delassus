import { gsap } from "gsap";
import React, {
  FC,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

export enum effectNames {
  loading = "Loading",
}

gsap.registerEffect({
  name: effectNames.loading,
  effect(targets: any) {
    const duration = 0.1;
    const thirdItemDuration = 0.01;

    const mainTL = gsap.timeline({
      repeat: -1,
      defaults: {
        ease: "power4.out",
        duration: duration,
      },
    });
    const target: HTMLElement[] = Array.from(targets[0].children);

    target.forEach((img) => {
      const imgTL = gsap.timeline();
      imgTL
        .fromTo(
          img,
          {
            scale: 0,
            y: 0,
            opacity: 1,
          },
          {
            scale: 2,
          }
        )
        .to(img, {
          y: 10,
        })
        .to(img, {
          opacity: 0,
          duration: thirdItemDuration,
        });
      mainTL.add(imgTL);
    });

    return mainTL;
  },
});

interface Props {
  children: JSX.Element;
  effect: string;
  targetRef: any;
  vars?: GSAPTweenVars;
}

const GsapEffect: FC<Props> = forwardRef(
  ({ children, effect, targetRef, vars }, ref) => {
    const animation = useRef();
    const ctx = gsap.context(() => {});

    useEffect(() => {
      return () => ctx.revert();
    }, [ctx]);

    useLayoutEffect(() => {
      if (gsap.effects[effect]) {
        ctx.add(() => {
          animation.current = gsap.effects[effect](targetRef.current, vars);
        });
      }
    }, [ctx, effect, targetRef, vars]);

    useEffect(() => {
      // forward the animation instance if a ref is passed
      if (typeof ref === "function") {
        ref(animation.current);
      } else if (ref) {
        ref.current = animation.current;
      }
    }, [ref]);

    return <>{children}</>;
  }
);

export default GsapEffect;
