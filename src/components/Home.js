import React from 'react'
import Header from './Header'
import Food from '../assessts/fooddonation.png'
import Clothe from '../assessts/clothedonation.png'
import Others from '../assessts/otherdonation.jpeg'
import Services from './Services'
import Footer from './Footer'
import Countsection from './Countsection'



function Home() {
    return (
        <>
            <Header />
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="3000">
                        <img src={Food} class="d-block img-fluid w-100" alt="1..." style={{ height: "30rem" }} />
                    </div>
                    <div class="carousel-item" data-bs-interval="3000">
                        <img src={Clothe} class="d-block img-fluid w-100" alt="2..." style={{ height: "30rem" }} />
                    </div>
                    <div class="carousel-item" data-bs-interval="3000">
                        <img src={Others} class="d-block img-fluid w-100" alt="3..." style={{ height: "30rem" }} />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
<Countsection/>
            <Services />


           
            <Footer />
        </>
    )
}

export default Home