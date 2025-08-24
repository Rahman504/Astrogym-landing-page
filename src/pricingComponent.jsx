import useInView from "./useInView";

const PricingComponent = ({ theme, title, price, point1, point2, point3 }) => {
  const [ref, isVisible] = useInView();

  return (
    <article ref={ref} className={`price ${theme} ${isVisible ? "visible" : ""}`}>
      <p>{title}</p>
      <h1>${price}</h1>
      <hr />
      <article>
        <p>{point1}</p>
        <hr />
        <p>{point2}</p>
        <hr />
        <p>{point3}</p>
        <hr />
      </article>
      <button>LEARN MORE</button>
    </article>
  );
};

export default PricingComponent;
