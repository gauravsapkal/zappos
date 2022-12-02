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
const url = `https://my-json-server-uk9r.onrender.com/colors`;
const Colors = (props) => {
  const [colors, setColors] = useState([]);
  // const { value, getCheckboxProps } = useCheckboxGroup();
  const { scrollStyle, getCheckboxProps } = props;
  const [loading, setLoading] = useState(false);
  const [searchColor, setSearchColor] = useState("");
  const searchColorUrl = searchColor === "" ? "" : `?name_like=${searchColor}`;
  useEffect(() => {
    fetchData();
  }, [searchColor]);
  const fetchData = () => {
    setLoading(true);
    fetch(`${url}${searchColorUrl}`)
      .then((res) => res.json())
      .then((res) => {
        setColors(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleChange = (event) => {
    // console.log("HandleChange ", event.target.value);
    setSearchColor(event.target.value);
  };
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
            Color
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h4>
      <AccordionPanel pb={4} h="200px" sx={scrollStyle}>
        <Input onKeyDown={handleChange} mb="8px" placeholder="Search Color" />
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
              {colors.map((elem) => (
                <Checkbox
                  key={Math.random()*Date.now()+elem.name+Math.random()}
                  spacing="0.8rem"
                  {...getCheckboxProps({ value: elem.name })}
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

export default Colors;
