import {
  Button,
  Grid,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
// import { Text } from '@chakra-ui/react/dist'
import React, { useEffect, useState } from "react";
import { DeleteIcon, EditIcon, EmailIcon, RepeatIcon, Search2Icon } from "@chakra-ui/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAlldata } from "../Redux/action";
import "../App.css";
import { Forecast, ForecastBox } from "./Forecast";
import { Loading } from "./Loading";
import { REQUEST_OF_DATA } from "../Redux/actionTypes";
import { json } from "react-router-dom";
import Popup from "./Popup";

export const HomePage = () => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    forecast,
    isLoading,
    error,
    langitude,
    data,
    currentLocation,
    latitude,
  } = useSelector((state) => {
    return {
      isLoading: state.isLoading,
      langitude: state.langitude,
      data: state.data,
      latitude: state.latitude,
      forecast: state.forecast,
      currentLocation: state.currentLocation,
      error: state.error,
    };
  });

  const [name, setName] = useState("");

  const [isRotate, setIsRotate] = useState(false);
  const logoutuser = () => {
    alert("Did you want to logout?");
    localStorage.clear();
    window.location.reload();
  };
  const onClickSearch = () => {
    if (name == "") {
      toast({
        title: "Name is empty!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      dispatch(getAlldata(name));
      setName("");
    }
  };
  console.log("data", data);
  useEffect(() => {
    dispatch({ type: REQUEST_OF_DATA });
    dispatch(getAlldata());
  }, [dispatch]);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  if (error) {
    // console.log(error.response.statusText)
    toast({
      title: `${error.response.statusText}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {" "}
      <Box>
        <Box
          // h={"80px"}
          bg="#F0E3FF"
        >
          <SimpleGrid columns={[1, 1, 2]} m="auto" w="70%">
            <Heading
              mt={5}
              textAlign={"center"}
              color={"#3E206D"}
              fontFamily="poppins"
              size={"xl"}
            >
        P
            </Heading>

            <Box mb={5} mt={5} w="100%">
              <Flex justifyContent={"center"}>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  style={{
                    width: "100%",
                    height: "45px",
                    border: "2px solid #3E206D",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                  variant={"outline"}
                  placeholder="name"
                />
                <Button
                  onClick={onClickSearch}
                  ml={1}
                  h="45px"
                  borderRadius={10}
                  bg="#3E206D"
                  _hover={{ bg: "white", color: "#3E206D" }}
                >
                  <Search2Icon
                    _hover={{ color: "#3E206D" }}
                    color={"white"}
                    boxSize={6}
                  />
                </Button>

               

                <Button
        onClick={togglePopup}
                  ml={1}
                  h="45px"
                  p={5}
                  borderRadius={10}
                  bg="#3E206D"
                  color={"white"}
                  _hover={{ bg: "white", color: "#3E206D" }}
                >
                  Add New
                </Button>


                <Button
                  onClick={logoutuser}
                  ml={1}
                  p={5}
                  h="45px"
                  borderRadius={10}
                  bg="#3E206D"
                  color={"white"}
                  _hover={{ bg: "white", color: "#3E206D" }}
                >
                  Logout
                </Button>
              </Flex>
            </Box>
          </SimpleGrid>
        </Box>

        <SimpleGrid w="95%"  m="auto" mt={7} columns={[1, 2, 2, 3]} spacing={8}>
         
          {data?.data?.map((item) => {
            return (
              <Box
                maxHeight="300px"
             
                fontFamily="poppins"
                color={"#3E206D"}
                w="100%"
                className="box"
                borderRadius={25}
                boxShadow="dark-lg"
              >
                <Flex p="8px 8px" h="100%">
                  {" "}
                  <VStack
                    // p="15px"
                    // pl="50px"
                    spacing={5}
                    align={"center"}
                    w="50%"
                    bg={`${item?.color}`}
                    color="white"
                    fontFamily="poppins"
                    p={1}
                    borderRadius={25}
                    h="100%"
                  >
                  <Text>Tier: {item?.tier}</Text>
                    <Text>Rank: {item?.rank}</Text>
                    <Text>Change : {item?.change}</Text>
                   <Text>Btc. Price : {(Number(item?.btcPrice)?.toFixed(2))}</Text>

                    <Flex gap={2} mb={5}>
                 <Button leftIcon={<DeleteIcon />} colorScheme='linkedin' ></Button>
                  <Button leftIcon={<EditIcon />} colorScheme='linkedin' ></Button>
                 </Flex> 
                 </VStack>
                  <VStack
                    ml={10}
                    h="100%"
                    fontFamily="poppins"
                    w="40%"
                    maxHeight="100%"
                   
                    // p="15px"
                    // pl="50px"
                    fontWeight="bold"
                    spacing={5}
                  >
                  <Image borderRadius="full" width="144px" height="144px" maxHeight="100%" maxWidth="100%"  src={item.iconUrl}/>
                  <Text margin={"auto"}> {item?.name}</Text>
                  <Text margin={"auto"}> {(item?.price).toFixed(2) } {item?.symbol}</Text>
                
                  </VStack>
                </Flex>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
      <Popup isOpen={isOpen} onClose={togglePopup}>
        <h2>Hello, I'm a Popup!</h2>
        <p>This is some content inside the popup.</p>
      </Popup>
      <Text textAlign={"center"} color={"#3E206D"} fontWeight="bold" mb={2}>
        © Made by Krushana chavan
      </Text>
    </>
  );
};
