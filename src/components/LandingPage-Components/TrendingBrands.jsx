import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Flickity from "react-flickity-component";
import "./flickity.css";
import { useEffect, useState } from "react";

const TrandingBrands = () => {
  const [cardata, setCardata] = useState([]);

  useEffect(() => {
    const getCarosuledata = () => {
      fetch(`https://my-json-server-uk9r.onrender.com/Trendingbrands`)
        .then((res) => res.json())
        .then((data) => setCardata(data))
        .catch((err) => {
          console.log(err);
        });
    };

    getCarosuledata();
  }, []);

  return (
    <>
      <Text ml="50px" fontSize="30px" fontWeight="bold.500" mb="20px">
        Trending Brands
      </Text>
      <Flickity>
        {cardata.map((elem) => (
          <Box
            key={elem.id}
            mr="20px"
            border="1px solid white"
            h={{
              base: "280px",
              sm: "250px",
              md: "280px",
              lg: "280px",
              xl: "280px",
            }}
            w={{ base: "50%", sm: "28%", md: "20%", lg: "15%", xl: "15%" }}
          >
            <Flex
              bg="#f5f5f5"
              border="1px solid #f5f5f5"
              h="85%"
              alignItems="center"
            >
              <Image display="flex" m="auto" src={elem.imgurl} alt="img" />
            </Flex>

            <Text textAlign="center" m="10px" mb="-5px">
              {elem.name}
            </Text>
          </Box>
        ))}
      </Flickity>
    </>
  );
};

export default TrandingBrands;
