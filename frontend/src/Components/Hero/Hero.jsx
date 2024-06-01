import React from 'react'
// import "./Hero.css"
import carousel_img_1 from "../Images/carousel_img-1.webp"
import carousel_img_2 from "../Images/carousel_img-2.webp"
import carousel_img_3 from "../Images/carousel_img-3.webp"
import carousel_img_4 from "../Images/carousel_img-4.webp"
import carousel_img_5 from "../Images/carousel_img-5.webp"
import carousel_img_6 from "../Images/carousel_img-6.webp"

const Hero = () => {
  return (
    <>

      <div id="carouselExampleIndicators" className="carousel slide h-auto" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={carousel_img_1} alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src= {carousel_img_2} alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={carousel_img_3} alt="Third slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={carousel_img_4} alt="Third slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={carousel_img_5} alt="Third slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100 " src={carousel_img_6} alt="Third slide" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next text-dark" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon text-dark" aria-hidden="true"></span>
          <span className="sr-only data-bs-theme='light' ">Next</span>
        </a>
      </div>

    </>
  )
}

export default Hero
