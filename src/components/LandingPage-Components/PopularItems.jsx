import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Flickity from "react-flickity-component";
import "./flickity.css";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";

const PopularItems = () => {
  const [cardata, setCardata] = useState([]);

  useEffect(() => {
    const getCarosuledata = () => {
      fetch(`https://my-json-server-uk9r.onrender.com/popularitems`)
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
      <Text ml="50px" fontSize="30px" fontWeight="bold.500" mb="20px" mt="80px">
        Popular Items
      </Text>
      <Flickity>
        {cardata.map((elem) => (
          <Box
            key={elem.id}
            mr="20px"
            bg="white"
            border="1px solid white"
            h={{
              base: "405px",
              sm: "420px",
              md: "420px",
              lg: "400px",
              xl: "400px",
            }}
            w={{ base: "50%", sm: "28%", md: "20%", lg: "13%", xl: "13%" }}
          >
            <Image
              display="flex"
              m="auto"
              h={{
                base: "290px",
                sm: "290px",
                md: "300px",
                lg: "280px",
                xl: "280px",
              }}
              w={{ base: "70%", sm: "70%", md: "70%", lg: "70%", xl: "70%" }}
              src={elem.imgurl}
              alt="img"
            />

            <Flex m="10px" mb="-5px" alignItems="center">
              <AiOutlineHeart /> {elem.favourites}
            </Flex>
            <Text m="10px" mb="-5px">
              {elem.name}
            </Text>
            <Text m="10px" mb="-5px">
              $ {elem.price}
            </Text>
          </Box>
        ))}
      </Flickity>
    </>
  );
};

export default PopularItems;
