import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Checkbox,
  CheckboxGroup,
  Input,
  Spinner,
  Stack,
  Text,
  useCheckboxGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { brandfilter } from "../Redux/action";
const url = `https://my-json-server-uk9r.onrender.com/brands`;
const Brands = (props) => {
  const [brands, setBrands] = useState([]);
  // const { value, getCheckboxProps } = useCheckboxGroup();
  const [loading, setLoading] = useState(false);
  const { scrollStyle, getCheckboxProps } = props;
  const [searchBrand, setSearchBrand] = useState("");
  const dispatch = useDispatch();
  const brandarr = useSelector((state) => state.brandarr);
  const searchBrandUrl = searchBrand === "" ? "" : `?name_like=${searchBrand}`;
  useEffect(() => {
    fetchData();
  }, [searchBrand]);
  const fetchData = () => {
    setLoading(true);
    fetch(`${url}${searchBrandUrl}`)
      .then((res) => res.json())
      .then((res) => {
        setBrands(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleChange = (event) => {
    // console.log("HandleChange ", event.target.value);
    setSearchBrand(event.target.value);
  };
  // function debouncingbyumesh(event) {
  //   console.log("Deb");
  //   let timer;
  //   return () => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       handleChange();
  //     }, 1);
  //   };
  // }

  return (
    <AccordionItem p={"5px"}>
      <h4>
        <AccordionButton>
          <Box
            flex="1"
            textAlign="left"
            fontWeight="bold"
            fontSize="small"
            textTransform={"uppercase"}
          >
            Brand
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h4>
      <AccordionPanel pb={4} h="200px" sx={scrollStyle}>
        <Input onKeyDown={handleChange} mb="8px" placeholder="Search Brand" />
        <CheckboxGroup defaultValue={[""]}>
          {loading ? (
            <Center>
              <Spinner
                mt="40px"
                w="50px"
                h="50px"
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Center>
          ) : (
            <Stack spacing={[1]} direction={["column"]}>
              {brands.map((elem) => (
                <Checkbox
                  key={Math.random()*Date.now()+elem.name+Math.random()}
                  spacing="0.8rem"
                  isChecked={brandarr.includes(elem.name)}
                  onChange={(e) => {
                    dispatch(
                      brandfilter({
                        checked: e.target.checked,
                        value: elem.name,
                      })
                    );
                  }}
                  // {...getCheckboxProps({ value: elem.name })}
                >
                  <Text fontSize={"sm"} fontWeight="500">
                    {elem.name} ({elem.count})
                  </Text>
                </Checkbox>
              ))}
            </Stack>
          )}
        </CheckboxGroup>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Brands;
