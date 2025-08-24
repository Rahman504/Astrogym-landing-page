

const FeaturesCard = ({ title, image, imagename, description}) => {
    return (
        <div className="features">
            <img src={image} alt={imagename} />
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default FeaturesCard