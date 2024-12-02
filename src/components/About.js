import React from 'react'
import Header from './Header'
import FeedHunger from '../assessts/FeedHunger.png'
import Matters from '../assessts/matters.jpg'
import Footer from './Footer'
function About() {
    return (
        <>
            <Header />
            <div className="container my-5">

                <h1 className="my-3">About US</h1>
                <h3 className="mt-5">Our Statement:</h3>
                <p>"We make a living by what we get, but we make a life by what we give."</p>
                <h3 className="mt-5">Our Mission:</h3>
                <img src={FeedHunger} class="img-fluid mx-auto d-block my-3" />
                <p>At <span className="text-primary fw-bold ">AAHARA VASTRA,</span> we are driven by a single purpose: to connect those with
                    surplus resources to those in need. Every day, countless celebrations and
                    events produce an abundance of food, much of which goes to waste. Our
                    mission is to bridge this gap by providing a platform where donors can easily
                    share available resources with nearby charities, shelters, and individuals .</p>

                <h3 className="mt-5">How We Help ?</h3>
                <p>"We make a living by what we get, but we make a life by what we give."</p>

                <p> <span className="fw-bold">Post about Surplus Food : </span>
                    Whether it’s leftover food from parties, events, or
                    restaurants, users can quickly update our app, making the information available
                    for charities or individuals nearby who need it.
                </p>


                <p> <span className="fw-bold fs-6">List Old or Gently Used Clothes : </span>
                    Donors can also share details about clothing
                    they no longer need, helping individuals and families get access to essential
                    items without unnecessary waste.<br />
                    By facilitating these connections, Ahara Vastra ensures resources are redirected
                    to benefit those who need them most.
                </p>

                <h3 className="mt-5">Why It Matters ? </h3>
                <img src={Matters} class="img-fluid mx-auto d-block my-3" />
                <p>
                    Food and clothing are essential resources, yet too often they go to waste.
                    Through our platform, we aim to 
                </p>
                <p> <span className="fw-bold">Reduce Waste :  </span>
                    Prevent good food and clothing from ending up in landfills.
                </p>

                <p> <span className="fw-bold">Support the Needy : </span>
                    Make essential resources available to those in need,
                    improving lives and creating a more sustainable community.
                </p>

                <p> <span className="fw-bold">Encourage Generosity : </span>
                     Provide a simple way for people to give back to their
                    community, fostering a spirit of kindness and mutual support.
                </p>


                <h3 class="text-center border border-2 border-black p-3">JOIN US IN MAKING A DIFFERENT</h3>
                <p>With Ahara Vastra, small acts of kindness can create a lasting impact. We invite
                    you to join us in this journey towards a more caring, sustainable, and
                    interconnected world where no resource goes to waste.</p>

                <h2 className="text-primary text-center">AAHARA VASTRA  Connecting Resources, Supporting Lives</h2>

            </div>
            <Footer/>
        </>
    )
}

export default About