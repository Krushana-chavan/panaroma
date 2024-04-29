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
  const [isEdit, setIsEdit] = useState(false);
  const [id,setId] = useState();
  const [formData, setFormData] = useState({
    symbol: "",
    name: "",
    color: "",
    iconUrl: "",
    price: "",
    tier: "",
    change: "",
    rank: "",
    btcPrice: "",
  });

  const dispatch = useDispatch();
  const handleEditAndUpate = async(id) => {
  
    setId(id);
    if (id) {
    
      const response = await axios.get(`http://localhost:3001/v1/currency/getCurrencyById/${id}`)
     
      if(response.status === 200){
        setIsOpen(true)
        setIsEdit(true)
       
        setFormData(response?.data?.data)
      }else{
        alert(response?.data?.data)
      }

    } else {
      setIsEdit(false)
    }
  }
  const {
    isLoading,
    error,
    data,
  } = useSelector((state) => {
    return {
      isLoading: state.isLoading,
      data: state.data,
      error: state.error,
    };
  });

  const [name, setName] = useState("");

  const onSubmit = async (formData) => {
  
   
    try {
      let response = await axios.post("http://localhost:3001/v1/currency/addCurrency", formData);
    if(response.status === 201 || 200){
      dispatch(getAlldata());
      setFormData()
    }
     

      return response.data;
    } catch (error) {
      
      console.error("Error occurred:", error);
    
      throw error;
    }
  };

  const onDelete = async (id) => {

    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        let response = await axios.put(`http://localhost:3001/v1/currency/deleteCurrency/${id}`);
        
        if (response.status === 200) {
          dispatch(getAlldata());
          alert(response.data?.data)
         
        }
      } catch (error) {
        console.error("Error deleting currency:", error);
       
      }
    }
  }
  
  const onEdit = async () => {
 try{
  let response = await axios.put(`http://localhost:3001/v1/currency/updateCurrency/${id}`,formData)
 
    if (response.status === 200) {
      alert("Currency updated successfully")
      dispatch(getAlldata());
      setFormData()
      setIsOpen(false)
      return response.data
    }
 }catch (e) {
  console.error(e.message)
 }
    
  }
  const [isRotate, setIsRotate] = useState(false);
  const logoutuser = () => {
    alert("Did you want to logout?");
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    dispatch({ type: REQUEST_OF_DATA });
    dispatch(getAlldata());
  }, [dispatch]);
  const togglePopup = () => {
    setIsEdit(false);
    setIsOpen(!isOpen);
  };
  if (error) {
    console.log(error)
  
    toast({
      title: `${error.response?.data}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
  if (isLoading) {
    return <Loading />;
  }else{
  return (
    <>
      {" "}
      <Box>
        <Box
          
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
              PANOROMA
            </Heading>

            <Box mb={5} mt={5} w="100%">
              <Flex justifyContent={"center"}>
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

        <SimpleGrid w="95%" m="auto" mt={7} columns={[1, 2, 2, 3]} spacing={8}>

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
                      <Button onClick={()=>{
                        onDelete(item?._id || item?.id)
                      }} leftIcon={<DeleteIcon />} colorScheme='linkedin' ></Button>
                      <Button onClick={()=>handleEditAndUpate(item?._id || item?.id)} leftIcon={<EditIcon />} colorScheme='linkedin' ></Button>
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
                    <Image borderRadius="full" width="144px" height="144px" maxHeight="100%" maxWidth="100%" src={item.iconUrl} />
                    <Text margin={"auto"}> {item?.name}</Text>
                    <Text margin={"auto"}> {(item?.price)?.toFixed(2)} {item?.symbol}</Text>

                  </VStack>
                </Flex>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
   {isOpen? <Popup isOpen={isOpen} formData={formData} setFormData={setFormData} onClose={togglePopup} onEdit={onEdit} onSubmit={onSubmit} handleEditAndUpate={handleEditAndUpate} isEdit={isEdit}>

</Popup>:""}  
      <Text textAlign={"center"} color={"#3E206D"} fontWeight="bold" mb={2}>
        © Made by Krushana chavan
      </Text>
    </>
  );
};}
