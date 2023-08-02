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
    const numberOfTargets = targets[0].children.length;

    const duration = 0.5; //change this

    const secondEntry = duration;
    const thirdEntry = duration * 2;
    const thirdItemDuration = 0.01;
    const stagger = duration + duration;
    const repeatDelay = stagger * (numberOfTargets - 1) + 1;

    return gsap
      .timeline({
        defaults: {
          ease: "none",
          duration: duration,
          stagger: {
            each: stagger,
            repeat: -1,
            repeatDelay: repeatDelay,
          },
        },
      })
      .from(targets[0].children, {
        scale: 0,
        y: 0,
        opacity: 1,
      })
      .to(
        targets[0].children,
        {
          y: 10,
        },
        secondEntry
      )
      .to(
        targets[0].children,
        {
          opacity: 0,
          // duration: thirdItemDuration,
        },
        thirdEntry
      );
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
