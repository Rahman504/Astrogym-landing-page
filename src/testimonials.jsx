

const TestimonialCard = ({ name, image, imagename, message}) => {
    return (
        <div className="testimonial">
            <img src={image} alt={imagename} />
            <div>
                <h2>{name}</h2>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default TestimonialCard