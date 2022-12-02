import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Circle,
  Collapse,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  SimpleGrid,
  Spacer,
  Spinner,
  Square,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useCheckboxGroup,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { GoComment } from "react-icons/go";
import { AiOutlineCloseCircle, AiOutlineHeart } from "react-icons/ai";

import { ChevronDownIcon, PhoneIcon, StarIcon } from "@chakra-ui/icons";
import Product from "../components/Product";
import Brands from "../components/Brands";
import PriceRange from "../components/PriceRange";
import Colors from "../components/Colors";
import Gender from "../components/Gender";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { brandfilter, clearfilter, genderfilter, pricefilter } from "../Redux/action";
const url = `https://my-json-server-uk9r.onrender.com`;

const Products = () => {
  const { value, getCheckboxProps } = useCheckboxGroup();
  const [data, setData] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  let { cat } = useParams();
  const [genderValue, setGenderValue] = useState(cat);
  const { genderarr, brandarr, pricearr } = useSelector((state) => state);
  // console.log(pricearr);

  const UpdatePriceRange = () => {
    if (pricearr.length != 0) {
      if (pricearr[pricearr.length - 1] == "$50.00 and Under") {
        setPriceRange([0, 50]);
      } else if (pricearr[pricearr.length - 1] == "$100.00 and Under") {
        setPriceRange([0, 100]);
      } else if (pricearr[pricearr.length - 1] == "$200.00 and Under") {
        setPriceRange([0, 200]);
      } else if (pricearr[pricearr.length - 1] == "$200.00 and Over") {
        setPriceRange([200, 10000000000]);
      }
    } else {
      setPriceRange([]);
    }
  };

  const UpdateGender = () => {
    // console.log("Update GEnder");
    if (genderarr.length == 2) {
      setGenderValue("mix");
    } else if (genderarr[0] == "Women") {
      setGenderValue("womencloths");
    } else if (genderarr[0] == "Men") {
      setGenderValue("menscloths");
    } else {
      setGenderValue(cat);
    }
  };

  useEffect(() => {
    UpdateGender();
    UpdatePriceRange();
  }, [genderarr, pricearr]);


  useEffect(() => {
    const cleanup = () => {
      dispatch(clearfilter());    //for clearing filters
    };

    return cleanup;
  }, []);
  

  // console.log(genderarr, brandarr);
  // console.log("PriceRange", priceRange);
  const priceRangeUrl =
    priceRange[0] >= 0
      ? `&price_gte=${priceRange[0]}&price_lte=${priceRange[1]}`
      : "";
  const [sortPrice, setSortPrice] = useState("");
  const [sortRatings, setSortRatings] = useState("");
  const [sortBrandName, setSortBrandName] = useState("");
  const [brandFilterUrl, setBrandFilterUrl] = useState("");

  const sortPriceUrl =
    sortPrice === "" ? "" : `&_sort=price&_order=${sortPrice}`;
  const sortRatingsUrl = sortRatings === "" ? "" : `&_sort=ratings&_order=desc`;
  const sortBrandNameUrl =
    sortBrandName === "" ? "" : `&_sort=brand&_order=asc`;

  const UpdateBrand = () => {
    // console.log("Update Brand");
    let newBrandURl = "&brand_like=";
    for (var i = 0; i < brandarr.length; i++) {
      if (i == brandarr.length - 1) {
        newBrandURl += brandarr[i];
      } else {
        newBrandURl += brandarr[i] + "&brand_like=";
      }
    }
    if (brandarr.length !== 0) {
      setBrandFilterUrl(newBrandURl);
    } else {
      setBrandFilterUrl("");
    }
  };

  useEffect(() => {
    UpdateBrand();
  }, [brandarr]);

  useEffect(() => {
    fetchData();
  }, [
    sortPrice,
    priceRangeUrl,
    sortRatings,
    sortBrandName,
    genderValue,
    brandFilterUrl,
  ]);
  const fetchData = () => {
    setLoading(true);
    const gender = genderValue;
    fetch(
      `${url}/${gender}?_limit=100&_page=1${sortPriceUrl}${priceRangeUrl}${sortRatingsUrl}${sortBrandNameUrl}${brandFilterUrl}`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleChange = (event) => {
    let val = event.target.value;
    if (val == "asc" || val == "desc") {
      setSortPrice(event.target.value);
    } else if (val == "customerRating") {
      setSortRatings("sortRatingsDesc");
    } else {
      setSortBrandName("brandName");
    }
  };
  const scrollStyle = {
    overflow: "auto",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "0.3em",
      height: "1em",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      height: "1em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
      height: "1em",
    },
  };
  const scrollStyleH = {
    overflow: "auto",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "0.3em",
      height: "0.3em",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      height: "1em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
      height: "1em",
    },
  };

  // if(genderarr.length !== 0){
  //   let gender = "";

  //   fetch(`${url}/mix`).then((res)=>res.json()).then((res1)=>{

  //   })
  // }
  const suggestionValue = [...genderarr, ...pricearr, ...brandarr];
  return (
    <>
      <SimpleGrid
        minChildWidth="280px"
        w="95vw"
        marginX={"auto"}
        spacingX={{
          base: "0vm",
          sm: "10vw",
          md: "20vw",
          lg: "30vw",
          xl: "40vw",
          "2xl": "52vw",
        }}
      >
        <Box p="4">
          <Heading size="lg">
            {cat === "menscloths"
              ? "Men's Clothings"
              : cat === "womencloths"
              ? "Women's Clothings"
              : cat === "menssneakers"
              ? "Men's Sneakers & Shoes"
              : "Women's Sneakers & Shoes"}
          </Heading>
          <Text fontSize="xl">5099 items found</Text>
          <Flex>
            <Box marginRight="5px">
              <Text fontSize="sm">Have Feedback?</Text>
            </Box>
            <Center>
              <Box>
                <GoComment />
              </Box>
            </Center>
          </Flex>
        </Box>
        <Box p="4">
          <Flex>
            <Center>
              <Box marginRight="10px" verticalAlign="Center">
                <Text fontSize={{ base: "sm", sm: "lg" }}>Sort By:</Text>
              </Box>
            </Center>
            <Box>
              <Select placeholder="Select" onChange={handleChange}>
                <option value="customerRating">Customer Rating</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
                <option value="brandName">Brand Name</option>
              </Select>
            </Box>
          </Flex>
        </Box>
      </SimpleGrid>
      <Center>
        <Flex w="95%" spacing="10px" m={"8px"}>
          <Box
            mr={3}
            display={{
              base: "none",
              sm: "none",
              md: "block",
              lg: "block",
              xl: "block",
              "2xl": "block",
            }}
          >
            <Box w={"17rem"} bg="#fff" flexDirection="0 0 280px">
              <VStack align="stretch">
                <Accordion defaultIndex={[0, 1, 2, 3]} allowMultiple>
                  <Gender getCheckboxProps={getCheckboxProps} />
                  <PriceRange
                    setPriceRange={setPriceRange}
                    getCheckboxProps={getCheckboxProps}
                  />
                  <Brands
                    getCheckboxProps={getCheckboxProps}
                    scrollStyle={scrollStyle}
                  />
                  <Colors
                    getCheckboxProps={getCheckboxProps}
                    scrollStyle={scrollStyle}
                  />
                </Accordion>
              </VStack>
            </Box>
          </Box>
          <Box
            w="90vw"
            maxW={{
              base: "full",
              md: "container.xl",
              xl: "container.2xl",
            }}
          >
            <Text fontSize={"2xl"}>Your Selection</Text>
            <Box
              sx={scrollStyleH}
              w={{
                base: "90vw",
                sm: "90vw",
                md: "61vw",
                lg: "67vw",
                xl: "73vw",
              }}
            >
              <HStack mt="10px" mb="10px">
                {genderarr.map(
                  (el, i) =>
                    el != "" && (
                      <Box key={Math.random()*Date.now()+el+Math.random()}
                      >
                        <Button
                          
                          alignItems="center"
                          borderRadius={50}
                          bg="#e5f1f8"
                          color="#0076bd"
                        >
                          {el}
                          <Center
                            ml="4px"
                            mt="4px"
                            onClick={() =>
                              dispatch(
                                genderfilter({
                                  checked: false,
                                  value: el,
                                })
                              )
                            }
                          >
                            <AiOutlineCloseCircle />
                          </Center>
                        </Button>
                      </Box>
                    )
                )}
                {pricearr.map(
                  (el, i) =>
                    el != "" && (
                      <Box
                      key={Math.random()*Date.now()+el+Math.random()}
                      >
                        <Button
                          
                          alignItems="center"
                          borderRadius={50}
                          bg="#e5f1f8"
                          color="#0076bd"
                        >
                          {el}
                          <Center
                            ml="4px"
                            mt="4px"
                            onClick={() =>
                              dispatch(
                                pricefilter({
                                  checked: false,
                                  value: el,
                                })
                              )
                            }
                          >
                            <AiOutlineCloseCircle />
                          </Center>
                        </Button>
                      </Box>
                    )
                )}
                {brandarr.map(
                  (el, i) =>
                    el != "" && (
                      <Box
                      key={Math.random()*Date.now()+el+Math.random()}
                      >
                        <Button
                          
                          alignItems="center"
                          borderRadius={50}
                          bg="#e5f1f8"
                          color="#0076bd"
                        >
                          {el}
                          <Center
                            ml="4px"
                            mt="4px"
                            onClick={() =>
                              dispatch(
                                brandfilter({
                                  checked: false,
                                  value: el,
                                })
                              )
                            }
                          >
                            <AiOutlineCloseCircle />
                          </Center>
                        </Button>
                      </Box>
                    )
                )}

                {/* <Button
                alignItems="center"
                borderRadius={50}
                bg="#e5f1f8"
                color="#0076bd"
              >
                Women's
                <Center ml="4px" mt="4px">
                  <AiOutlineCloseCircle />
                </Center>
              </Button>
              <Button
                alignItems="center"
                borderRadius={50}
                bg="#e5f1f8"
                color="#0076bd"
              >
                Girls
                <Center ml="4px" mt="4px">
                  <AiOutlineCloseCircle />
                </Center>
              </Button>

              <Button
                alignItems="center"
                borderRadius={50}
                bg="transparent"
                border="1px solid #ddd"
                color="#003953"
              >
                Girls
              </Button>
              <Button
                alignItems="center"
                borderRadius={50}
                bg="transparent"
                border="1px solid #ddd"
                color="#003953"
              >
                Girls
              </Button>
              <Button
                alignItems="center"
                borderRadius={50}
                bg="transparent"
                border="1px solid #ddd"
                color="#003953"
              >
                Girls
              </Button> */}
              </HStack>
            </Box>
            <Box mt={"5px"}>
              {loading ? (
                <Center>
                  <Spinner
                    mt="100px"
                    w="100px"
                    h="100px"
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </Center>
              ) : (
                <SimpleGrid minChildWidth="220px" spacing="10px" m={5}>
                  {data.map((elem, i) => (
                    <NavLink to={`/category/${genderValue}/${elem.id}`}
                    key={Math.random()*Date.now()+i+Math.random()}
                    >
                      <Product elem={elem} i={i} />
                    </NavLink>
                  ))}
                </SimpleGrid>
              )}
            </Box>
            {/* <Grid
            templateColumns={{
              base: "repeat(1,1fr)",
              md: "repeat(2,1fr)",
              lg: "repeat(3,1fr)",
              xl: "repeat(4,1fr)",
              "2xl": "repeat(4,1fr)",
            }}
            gap={6}
            m="10px"
          >
            <GridItem>
              <Box maxW="sm" overflow="hidden">
                <Flex pos="relative">
                  <Image src={property.imageUrl} alt={property.imageAlt} />
                  <Flex
                    pos="absolute"
                    w="40px"
                    zIndex={4}
                    bg="white"
                    right="0"
                    justifyContent="space-around"
                    borderEndStartRadius="5px"
                  >
                    <Box as="button">
                      <AiOutlineHeart />
                    </Box>

                    <Box>
                      <Text>7</Text>
                    </Box>
                  </Flex>
                </Flex>
                <Box p="1">
                  <Link>
                    <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1}>
                      {property.brandName}
                    </Box>
                    <Box as="p" noOfLines={1}>
                      {property.title}
                    </Box>
                  </Link>

                  <Box>{property.formattedPrice}</Box>

                  <Box display="flex" mt="1" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < property.rating ? "teal.500" : "gray.300"}
                        />
                      ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      ({property.reviewCount})
                    </Box>
                  </Box>
                </Box>
              </Box>
            </GridItem>
            <GridItem>
              <Box maxW="sm" overflow="hidden">
                <Flex pos="relative">
                  <Image src={property.imageUrl} alt={property.imageAlt} />
                  <Flex
                    pos="absolute"
                    w="40px"
                    zIndex={4}
                    bg="white"
                    right="0"
                    justifyContent="space-around"
                    borderEndStartRadius="5px"
                  >
                    <Box as="button">
                      <AiOutlineHeart />
                    </Box>

                    <Box>
                      <Text>7</Text>
                    </Box>
                  </Flex>
                </Flex>

                <Box p="1">
                  <Link>
                    <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1}>
                      {property.brandName}
                    </Box>
                    <Box as="p" noOfLines={1}>
                      {property.title}
                    </Box>
                  </Link>

                  <Box>{property.formattedPrice}</Box>

                  <Box display="flex" mt="1" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < property.rating ? "teal.500" : "gray.300"}
                        />
                      ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      ({property.reviewCount})
                    </Box>
                  </Box>
                </Box>
              </Box>
            </GridItem>
            <GridItem>
              <Box maxW="sm" overflow="hidden">
                <Flex pos="relative">
                  <Image src={property.imageUrl} alt={property.imageAlt} />
                  <Flex
                    pos="absolute"
                    w="40px"
                    zIndex={4}
                    bg="white"
                    right="0"
                    justifyContent="space-around"
                    borderEndStartRadius="5px"
                  >
                    <Box as="button">
                      <AiOutlineHeart />
                    </Box>

                    <Box>
                      <Text>7</Text>
                    </Box>
                  </Flex>
                </Flex>
                <Box p="1">
                  <Link>
                    <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1}>
                      {property.brandName}
                    </Box>
                    <Box as="p" noOfLines={1}>
                      {property.title}
                    </Box>
                  </Link>

                  <Box>{property.formattedPrice}</Box>

                  <Box display="flex" mt="1" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < property.rating ? "teal.500" : "gray.300"}
                        />
                      ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      ({property.reviewCount})
                    </Box>
                  </Box>
                </Box>
              </Box>
            </GridItem>
            <GridItem>
              <Box maxW="sm" overflow="hidden">
                <Flex pos="relative">
                  <Image src={property.imageUrl} alt={property.imageAlt} />
                  <Flex
                    pos="absolute"
                    w="40px"
                    zIndex={4}
                    bg="white"
                    right="0"
                    justifyContent="space-around"
                    borderEndStartRadius="5px"
                  >
                    <Box as="button">
                      <AiOutlineHeart />
                    </Box>

                    <Box>
                      <Text>7</Text>
                    </Box>
                  </Flex>
                </Flex>

                <Box p="1">
                  <Link>
                    <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1}>
                      {property.brandName}
                    </Box>
                    <Box as="p" noOfLines={1}>
                      {property.title}
                    </Box>
                  </Link>

                  <Box>{property.formattedPrice}</Box>

                  <Box display="flex" mt="1" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < property.rating ? "teal.500" : "gray.300"}
                        />
                      ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      ({property.reviewCount})
                    </Box>
                  </Box>
                </Box>
              </Box>
            </GridItem>
            <GridItem>
              <Box maxW="sm" overflow="hidden">
                <Flex pos="relative">
                  <Image src={property.imageUrl} alt={property.imageAlt} />
                  <Flex
                    pos="absolute"
                    w="40px"
                    zIndex={4}
                    bg="white"
                    right="0"
                    justifyContent="space-around"
                    borderEndStartRadius="5px"
                  >
                    <Box as="button">
                      <AiOutlineHeart />
                    </Box>

                    <Box>
                      <Text>7</Text>
                    </Box>
                  </Flex>
                </Flex>
                <Box p="1">
                  <Link>
                    <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1}>
                      {property.brandName}
                    </Box>
                    <Box as="p" noOfLines={1}>
                      {property.title}
                    </Box>
                  </Link>

                  <Box>{property.formattedPrice}</Box>

                  <Box display="flex" mt="1" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < property.rating ? "teal.500" : "gray.300"}
                        />
                      ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      ({property.reviewCount})
                    </Box>
                  </Box>
                </Box>
              </Box>
            </GridItem>
            <GridItem>
              <Box maxW="sm" overflow="hidden">
                <Flex pos="relative">
                  <Image src={property.imageUrl} alt={property.imageAlt} />
                  <Flex
                    pos="absolute"
                    w="40px"
                    zIndex={4}
                    bg="white"
                    right="0"
                    justifyContent="space-around"
                    borderEndStartRadius="5px"
                  >
                    <Box as="button">
                      <AiOutlineHeart />
                    </Box>

                    <Box>
                      <Text>7</Text>
                    </Box>
                  </Flex>
                </Flex>

                <Box p="1">
                  <Link>
                    <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1}>
                      {property.brandName}
                    </Box>
                    <Box as="p" noOfLines={1}>
                      {property.title}
                    </Box>
                  </Link>

                  <Box>{property.formattedPrice}</Box>

                  <Box display="flex" mt="1" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < property.rating ? "teal.500" : "gray.300"}
                        />
                      ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      ({property.reviewCount})
                    </Box>
                  </Box>
                </Box>
              </Box>
            </GridItem>
          </Grid> */}{" "}
          </Box>
        </Flex>
      </Center>
    </>
  );
};

export default Products;
