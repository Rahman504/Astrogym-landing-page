import { useEffect, useRef, useState } from "react";

const useInView = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Do NOT unobserve, so animation works again if you scroll away and back
        } else {
          setIsVisible(false); // reset when scrolled out
        }
      },
      { threshold: 0.2 } // trigger when 20% of card is visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

export default useInView;
