import { Box, Modal, ModalBody, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalFooter, useDisclosure, Input, Button } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'
import { Image, Heading, Text, IconButton, HStack, useToast, VStack } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { useProductStore } from '../store/product.js'

const ProductCard = ({product}) => {

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [ newPdtDetails, setNewPdtDetails ] = useState(product);

    const toast = useToast();

    const { deleteProduct, updateProduct } = useProductStore();
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

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const{ success,message }=await updateProduct(pid, updatedProduct);
        if(success){
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        }
        else{
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        onClose();
    };

    return (
        <Box shadow='lg' rounded='lg' overflow='hidden' transition='all 0.3s' _hover={{ transform: "translateY(-5px)", shadow: "xl" }} bg={bg}>
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>{product.name}</Heading>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>${product.price}</Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} onClick={() => {handleDeleteProduct(product._id)}} colorScheme='red'/>
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input placeholder="Product Name" name="name" value={newPdtDetails.name} onChange={(event)=>setNewPdtDetails({...newPdtDetails,name:event.target.value})}/>
                            <Input placeholder="Price" name="price" type="number" value={newPdtDetails.price} onChange={(event)=>setNewPdtDetails({...newPdtDetails,price:event.target.value})}/>
                            <Input placeholder="Image URL" name="image" value={newPdtDetails.image} onChange={(event)=>setNewPdtDetails({...newPdtDetails,image:event.target.value})}/>
                        </VStack>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={() => { handleUpdateProduct(product._id, newPdtDetails) }}>Update</Button>
						    <Button variant='ghost' onClick={onClose}>Cancel</Button>
					    </ModalFooter>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ProductCard
