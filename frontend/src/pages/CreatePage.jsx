import { useProductStore } from '../store/product.js';
import { Box, Container, VStack, useColorModeValue, Heading, Input, Button, useToast } from '@chakra-ui/react';
import { useState } from 'react';

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const { createProduct } = useProductStore();

    const toast = useToast();
    const handleAddProduct = async () => {
        setIsLoading(true);
        console.log("Creating product:", newProduct);
        setIsLoading(false);
        try {
            const { success, message } = await createProduct(newProduct);
            console.log("successssss:", success, "messageeeeee:", message);
            if (success) {
                setNewProduct({ name: "", price: "", image: "" });
                toast({
                    title: "Success",
                    description: message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }
            if(!success) {
                toast({
                    title: "Error",
                    description: message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Error creating product:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create New Product</Heading>
            </VStack>
            <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                <VStack spacing={4}>
                    <Input 
                        placeholder="Product Name"
                        name="name"
                        value={newProduct.name} 
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} 
                    />
                    <Input 
                        placeholder="Price" 
                        name="price"
                        type="number" 
                        value={newProduct.price} 
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
                    />
                    <Input 
                        placeholder="Image URL"
                        name="image"
                        value={newProduct.image} 
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} 
                    />
                    <Button 
                        colorScheme="blue" 
                        onClick={handleAddProduct} 
                        w="full"
                        isLoading={isLoading}
                        loadingText="Creating..."
                    >
                        Create Product
                    </Button>
                </VStack>
            </Box>
        </Container>
    )
}

export default CreatePage
