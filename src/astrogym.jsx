import { Link } from 'react-router-dom';
import GalaxyBackground from './galaxybackground';
import ScrollStack, { ScrollStackItem } from './scrollstack'
import FeaturesCard from './features';
import features from './featuresdata';
import { useState } from 'react';
import PricingComponent from './pricingComponent';
import TestimonialCard from './testimonials';
import alex from "./images/image-john.jpg"
import priya from "./images/image-tanya.jpg"
import sam from "./images/sam.jpg"
import x from "./images/x.png"
import instagram from "./images/instagram.png"
import discord from "./images/discord.png"
import useInView from './useInView';
    const AstroGym = () => {
        const [plan, setPlan] = useState("annual");

        const switchPlan = () => {
            if (plan === "annual") {
            setPlan("monthly");
            } else {
            setPlan("annual");
            }
        }

        
  const [titleRef, titleVisible] = useInView();
  const [descRef, descVisible] = useInView();
  const [linkRef, linkVisible] = useInView();

        return (
            <>
                <GalaxyBackground />
                    <div className='hero'>
                        <div>
                            <h1>
                                Escape Gravity. Define Your Limits.
                            </h1>
                            <p ref={descRef} className={descVisible ? "visible" : ""}>Step into the ultimate VR fitness adventure among the stars.</p>
                            <a ref={linkRef}
                            className={`link ${linkVisible ? "visible" : ""}`}
                             onClick={(e) => {
                                e.preventDefault();
                                const section = document.getElementById("reason");
                                if (section) {
                                section.scrollIntoView({ behavior: "smooth" });
                                }
                            }}>Learn more</a>
                        </div>

                    </div>
                    <div className='reason' id='reason'>
                        <h1 ref={titleRef}
                            className={`section-title ${titleVisible ? "visible" : ""}`}>Why AstroGym is Out of This World</h1>
                        <p>Tired of the same old routine? AstroGym takes you beyond the boring gym floor and into the cosmos. Our features are built to make every workout feel like a mission.</p>
                        <ScrollStack>
                        {features.map((feature, index) => (
                            <ScrollStackItem key={index}>
                            <FeaturesCard
                                title={feature.title}
                                description={feature.description}
                                image={feature.image}
                                imagename={feature.imagename}
                            />
                            </ScrollStackItem>
                        ))}
                        </ScrollStack>
                    </div> 
                    <div className='pricing'>
                        <h1>Choose Your Cosmic Plan.</h1>
                        <div className='all'>
                            <div className="switch">
                                <p>Monthly</p>
                                <div>
                                    <label className="switch">
                                    <input type="checkbox" onChange={switchPlan}/>
                                    <span className="slider round"></span>
                                    </label>
                                </div>
                                <p>Annually</p>
                            </div>
                            <section>
                            <PricingComponent 
                                title={"Orbit Pass"}
                                theme={"first"}
                                price={plan === "annual" ? 18.99 : 189.99}
                                point1={"Access to 3 core VR worlds"}
                                point2={"Daily workout challenges"}
                                point3={"Basic progress tracking"}
                            />
                            <PricingComponent 
                                title={"Galaxy Pass"}
                                theme={"second"}
                                price={plan === "annual" ? 38.99 : 389.99}
                                point1={"Access to 10+ VR worlds"}
                                point2={"Advanced analytics dashboard"}
                                point3={"Multiplayer access and monthly events"}
                            />
                            <PricingComponent 
                                title={"Cosmic Elite"}
                                theme={"first"}
                                price={plan === "annual" ?  58.99 : 589.99}
                                point1={"Unlimited access to all VR worlds"}
                                point2={"Personal VR fitness coach"}
                                point3={"VIP leaderboard status and early access"}
                            />
                            </section>
                        </div>
                    </div>
                    <div className='testimonials'>
                        <h1>Testimonials</h1>
                        <div className='slide'>
                            <div className='slider-track'>
                                <TestimonialCard 
                                    name={"Alex P."}
                                    message={"I burned 500 calories on Mars. Unreal!"}
                                    image={alex}
                                    imagename={"alexpic"}
                                />
                                <TestimonialCard 
                                    name={"Sam R."}
                                    message={"Feels like a game, but I’m actually working out."}
                                    image={sam}
                                    imagename={"sampic"}
                                />
                                <TestimonialCard 
                                    name={"Priya L."}
                                    message={"Best fitness experience in the galaxy!"}
                                    image={priya}
                                    imagename={"priyapic"}
                                />
                                <TestimonialCard 
                                    name={"Sam R."}
                                    message={"Feels like a game, but I’m actually working out."}
                                    image={sam}
                                    imagename={"sampic"}
                                />
                                <TestimonialCard 
                                    name={"Sam R."}
                                    message={"Feels like a game, but I’m actually working out."}
                                    image={sam}
                                    imagename={"sampic"}
                                />
                                <TestimonialCard 
                                    name={"Priya L."}
                                    message={"Best fitness experience in the galaxy!"}
                                    image={priya}
                                    imagename={"priyapic"}
                                />
                                <TestimonialCard 
                                    name={"Sam R."}
                                    message={"Feels like a game, but I’m actually working out."}
                                    image={sam}
                                    imagename={"sampic"}
                                />
                                <TestimonialCard 
                                    name={"Sam R."}
                                    message={"Feels like a game, but I’m actually working out."}
                                    image={sam}
                                    imagename={"sampic"}
                                />
                                <TestimonialCard 
                                    name={"Sam R."}
                                    message={"Feels like a game, but I’m actually working out."}
                                    image={sam}
                                    imagename={"sampic"}
                                />
                                <TestimonialCard 
                                    name={"Sam R."}
                                    message={"Feels like a game, but I’m actually working out."}
                                    image={sam}
                                    imagename={"sampic"}
                                />
                                <TestimonialCard 
                                    name={"Sam R."}
                                    message={"Feels like a game, but I’m actually working out."}
                                    image={sam}
                                    imagename={"sampic"}
                                />
                                <TestimonialCard 
                                    name={"Sam R."}
                                    message={"Feels like a game, but I’m actually working out."}
                                    image={sam}
                                    imagename={"sampic"}
                                />
                            </div>

                        </div>
                    </div>
                    <footer>
                        <p>Connect with us on our social media handles</p>
                        <div>
                            <Link><img src={x} alt="ximage" /></Link>
                            <Link><img src={instagram} alt="instagramimage" /></Link>
                            <Link><img src={discord} alt="discordimage" /></Link>
                            
                        </div>
                        <p>&copy; 2025 AstroGym. All rights reserved.</p>
                    </footer>
            </>
           
        )
    };
    

export default AstroGym;



