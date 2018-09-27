import React, { Component } from "react";
import { render } from "react-dom";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

import { Link } from "react-router-dom";
import gif from "../../assets/Eclipse-1s-200px (1).gif"

const items = [
  {
    title: "Share your stories",
    text:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    src:
      "https://images.unsplash.com/photo-1531904709672-86d3307b3d28?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=235aa37202a667453c37656575c71d31&auto=format&fit=crop&w=750&q=80"
  },
  {
    title: "Be part of a community of writers",
    text:
      "Lorem ipsum dolor sit sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    src:
      "https://images.unsplash.com/photo-1537883927710-61d5d1a2c1e9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0bf498a63b771656f26a8124eeb3e6be&auto=format&fit=crop&w=668&q=80"
  },
  {
    title: "Start the journey",
    text:
      "Lorem ipsum dolor sit amet, consetetur sadipscing. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    src:
      "https://images.unsplash.com/photo-1537910885113-9b060713da20?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=018d39f323d3618549f909f813e8a5ba&auto=format&fit=crop&w=750&q=80"
  }
];

class CarouselHome extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <div className="carousel-content">
            <h1 className="mb-4">Share your stories</h1>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet.
            </p>
            <br/>
            <h5>
              <Link className="link" to="/auth/sign-up">Sign up</Link> and start your journey!
            </h5>
            
            <p>Already have an account? <Link className="link" to="/auth/sign-in">Sign in</Link> here</p>
           <br/>
            <h5>
              <Link className="link" to="/stories/all">See what others have already contributed</Link>
            </h5>
          </div>
          <img src={item.src} alt={item.altText} className="img-fluid" />
        </CarouselItem>
      );
    });

    if(!slides) return <img src={gif} />

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        keyboard={false}
        pause={false}
        ride="carousel"
        interval="10000"
        slide={false}
        className="carousel-fade"
      >
        <CarouselIndicators
          items={[]}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
      </Carousel>
    );
  }
}

export default CarouselHome;
