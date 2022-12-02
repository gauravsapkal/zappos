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
import { genderfilter } from "../Redux/action";
const url = `https://my-json-server-uk9r.onrender.com/gender`;
const Gender = (props) => {
  const [gender, setGender] = useState([]);
  // const { value, getCheckboxProps } = useCheckboxGroup();
  const { getCheckboxProps } = props;
  const [loading, setLoading] = useState(false);
  const genderarr = useSelector((state) => state.genderarr);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    setLoading(true);
    fetch(`${url}`)
      .then((res) => res.json())
      .then((res) => {
        setGender(res);
      })
      .finally(() => {
        setLoading(false);
      });
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
            Gender
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h4>
      <AccordionPanel pb={4} h="60px">
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
              {gender.map((elem) => (
                <Checkbox
                  key={Math.random()*Date.now()+elem.name+Math.random()}
                  spacing="0.8rem"
                  isChecked={genderarr.includes(elem.name)}
                  onChange={(e) => {
                    dispatch(
                      genderfilter({
                        checked: e.target.checked,
                        value: elem.name,
                      })
                    );
                  }}
                  // {...getCheckboxProps({ value: elem.name })}
                >
                  <Text fontSize={"sm"} fontWeight="500">
                    {elem.name}
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

export default Gender;
