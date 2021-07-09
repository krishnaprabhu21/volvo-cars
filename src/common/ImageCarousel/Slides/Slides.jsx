import React from "react";
import { Text } from "vcc-ui";

class Slides extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: this.props.level,
    };
  }

  render() {
    const {
      level,
      item: { bodyType, modelType, imageUrl, modelName },
    } = this.props;
    const className = "item level" + level;

    return (
      <div className={className}>
        <Text
          subStyle="inline-link"
          style={{ textDecoration: "none", fontSize: "0.8rem" }}
        >
          {bodyType?.toUpperCase()}
        </Text>
        <Text
          subStyle="emphasis"
          style={{ textDecoration: "none", fontSize: "0.9rem" }}
        >
          {modelName}
        </Text>
        <Text
          subStyle="inline-link"
          style={{ textDecoration: "none", fontSize: "0.9rem" }}
        >
          {modelType}
        </Text>
        <img src={imageUrl} style={{ width: "250px" }} />
      </div>
    );
  }
}

export default Slides;
