import React from 'react'
import Header from './Header'
import food from '../assessts/food.png'
import clothes from '../assessts/clothes.png'
import others from '../assessts/other.png'
import {Link} from "react-router-dom";

function Services() {
    return (
        <>



            <div class="container mx-auto d-block">
                <h1 className="mx-3 mt-5 ">Our Services</h1>

                <div class="row text-center mx-auto justify-content-center">
                    <div class="col-12 col-sm-4 my-5"><div class="card" style={{ width: "20rem" }}>
                        <img src={food} class="card-img-top" alt="..." style={{ height: "14rem" }} />
                        <div class="card-body">
                            <h5 class="card-title">Donate Food</h5>
                            <p class="card-text">"One meal shared is hope renewed; one heart touched is a world transformed."</p>
                           <Link to="/donationform" className="nav-link mx-3"><button type="button" class="btn btn-success">Donate</button></Link>
                        </div>
                    </div></div>
                    <div class="col-12 col-sm-4   my-5"><div class="card" style={{ width: "20rem" }}>
                        <img src={clothes} class="card-img-top" alt="..." style={{ height: "14rem" }} />
                        <div class="card-body">
                            <h5 class="card-title">Donate Clothes</h5>
                            <p class="card-text">"Clothes aren’t meant to stay in closets; they’re meant to make a difference."</p>
                           <Link to="/donationform" className="nav-link mx-3"><button type="button" class="btn btn-success">Donate</button></Link>
                            
                        </div>
                    </div></div>
                    <div class="col-12 col-sm-4   my-5"><div class="card" style={{ width: "20rem" }}>
                        <img src={others} class="card-img-top" alt="..." style={{ height: "15rem" }} />
                        <div class="card-body">
                            <h5 class="card-title">Donate Others</h5>
                            <p class="card-text">"We make a living by what we get, but we make a life by what we give."</p>
                            <Link to="/donationform" className="nav-link mx-3"><button type="button" class="btn btn-success">Donate</button></Link>
                        </div>
                    </div></div>
                </div>
            </div>
        </>
    )
}

export default Services