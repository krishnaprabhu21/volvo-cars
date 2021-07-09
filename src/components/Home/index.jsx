import React, { useState, useEffect, Fragment } from "react";
import { Grid, Row, Spacer, SelectInput, View } from "vcc-ui";

import ImageCarousel from "../../common/ImageCarousel/ImageCarousel";

const carBodyTypeOptions = [
  {
    bodyType: "suv",
  },
  {
    bodyType: "estate",
  },
  {
    bodyType: "sedan",
  },
];

const HomeComponent = () => {
  const [data, setData] = useState([]);
  const dataCpy = [...data];

  const getData = () => {
    fetch("api/cars.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, [data]);

  const onSelectChangeHandler = (e) => {
    const filteredData = data.filter((item) => {
      return item.bodyType === e.target.value;
    });

    setData(filteredData);
  };

  return (
    <Grid>
      <Row>
        <SelectInput
          value=""
          className="car_select"
          onChange={(e) => onSelectChangeHandler(e)}
        >
          {carBodyTypeOptions?.map((opt) => (
            <option key={opt.id} value={opt.bodyType}>
              {opt.bodyType.toUpperCase()}
            </option>
          ))}
        </SelectInput>
      </Row>
      <Row>
        <Spacer size={10} />
        <Fragment>
          {data?.length ? (
            <ImageCarousel carouselData={data} active={0} />
          ) : (
            <View
              extend={{
                padding: 20,
              }}
            >
              No data Available!
            </View>
          )}
        </Fragment>
      </Row>
    </Grid>
  );
};

export default HomeComponent;
