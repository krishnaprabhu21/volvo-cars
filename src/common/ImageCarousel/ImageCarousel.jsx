import React from "react";
import { Grid, Row } from "vcc-ui";

import nextImgSrc from "../../assets/images/icons/chevron-circled.svg";
import prevImgSrc from "../../assets/images/icons/chevron-circled.svg";
import css from "./ImageCarousel.css";

import Slides from "./Slides/Slides";

class ImageCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.carouselData,
      active: this.props.active,
      direction: "",
    };
    this.rightClick = this.moveRight.bind(this);
    this.leftClick = this.moveLeft.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ items: nextProps.carouselData });
  }

  generateItems() {
    var items = [];
    var level;
    for (var i = this.state.active - 2; i < this.state.active + 2; i++) {
      var index = i;
      if (i < 0) {
        index = this.state.items.length + i;
      } else if (i >= this.state.items.length) {
        index = i % this.state.items.length;
      }

      level = this.state.active - i;
      items.push(
        <Slides
          key={this.state.items[index].id + Math.random()}
          item={this.state.items[index]}
          id={this.state.items[index].id}
          level={level}
        />
      );
    }
    return items;
  }

  moveLeft() {
    var newActive = this.state.active;
    newActive--;
    this.setState({
      active: newActive < 0 ? this.state.items.length - 1 : newActive,
      direction: "left",
    });
  }

  moveRight() {
    var newActive = this.state.active;
    this.setState({
      active: (newActive + 1) % this.state.items.length,
      direction: "right",
    });
  }

  goToSlide(index) {
    this.setState({
      active: index,
    });
  }

  render() {
    const { carouselData, index, active } = this.props;

    return (
      <Grid>
        <Row>
          <div id="carousel" className="noselect">
            <div>{this.generateItems()}</div>

            <div className="carousel__indicators_large_screen">
              <img
                src={prevImgSrc}
                onClick={this.leftClick}
                className="arrow arrow arrow-left"
              />
              <img
                src={nextImgSrc}
                onClick={this.rightClick}
                className="arrow arrow arrow-right"
              />
            </div>

            <ul className="carousel__indicators_small_screen">
              {carouselData.map((slide, index) => (
                <li key={slide.id}>
                  <a
                    className={
                      index == active
                        ? "carousel__indicator carousel__indicator--active"
                        : "carousel__indicator"
                    }
                    onClick={(e) => this.goToSlide(index)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Row>
      </Grid>
    );
  }
}

export default ImageCarousel;
