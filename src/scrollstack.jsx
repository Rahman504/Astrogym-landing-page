import { useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "@studio-freight/lenis"; // make sure to install lenis
import "./App.css";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = document.querySelector(".scroll-stack-end");
    const endElementTop = endElement ? endElement.offsetTop : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = card.offsetTop;
      const triggerStart = cardTop - stackPositionPx - i * itemStackDistance;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        cardsRef.current.forEach((c, j) => {
          const jTop = c.offsetTop;
          const jTrigger = jTop - stackPositionPx - j * itemStackDistance;
          if (scrollTop >= jTrigger) topCardIndex = j;
        });
        if (i < topCardIndex) blur = (topCardIndex - i) * blurAmount;
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (isPinned) translateY = scrollTop - cardTop + stackPositionPx + i * itemStackDistance;
      else if (scrollTop > pinEnd) {
        translateY = Math.min(
        scrollTop - cardTop + stackPositionPx + (itemStackDistance * i),
        endElementTop - cardTop
      );
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";
        lastTransformsRef.current.set(i, newTransform);
      }

      // Stack complete callback
      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    blurAmount,
    baseScale,
    itemScale,
    itemStackDistance,
    rotationAmount,
    stackPosition,
    scaleEndPosition,
    onStackComplete,
    parsePercentage,
    calculateProgress,
  ]);

  const handleScroll = useCallback(() => updateCardTransforms(), [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const lenis = new Lenis({
      wrapper: document.body,
      content: document.body,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on("scroll", handleScroll);

    const raf = (time) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
  }, [handleScroll]);

  useLayoutEffect(() => {
    cardsRef.current = Array.from(document.querySelectorAll(".scroll-stack-card"));
    cardsRef.current.forEach((card, i) => {
      if (i < cardsRef.current.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
    });

    setupLenis();
    updateCardTransforms();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      lenisRef.current?.destroy();
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
      stackCompletedRef.current = false;
    };
  }, [itemDistance, setupLenis, updateCardTransforms]);

  return (
    <div className={`scroll-stack ${className}`}>
      {children}
      <div className="scroll-stack-end" />
    </div>
  );
};

export default ScrollStack;
