import { Box } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'
import { Image, Heading, Text, IconButton, HStack, useToast } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import React from 'react'
import { useProductStore } from '../store/product.js'

const ProductCard = ({product}) => {

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const toast = useToast();

    const { deleteProduct } = useProductStore();
    const handleDeleteProduct = async (pid) => {
        const{success,message} = await deleteProduct(pid);
        console.log("success:", success, "message:", message);
        if(success) {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box shadow='lg' rounded='lg' overflow='hidden' transition='all 0.3s' _hover={{ transform: "translateY(-5px)", shadow: "xl" }} bg={bg}>
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            <Box p={4}> 
                <Heading as='h3' size='md' mb={2}>{product.name}</Heading>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>${product.price}</Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={() => {}} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} onClick={() => {handleDeleteProduct(product._id)}} colorScheme='red'/>
                </HStack>
            </Box>
        </Box>
    )
}

export default ProductCard
