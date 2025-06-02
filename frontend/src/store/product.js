import { create } from "zustand";

const FETCHED_API_URL = import.meta.env.VITE_API_URL_1 || import.meta.env.VITE_API_URL_2;

export const useProductStore = create((set) => ({
    products:[],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message: "All fields are required"};
        }
        try {
            const response = await fetch(FETCHED_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                return { success: false, message: errorData.message || "Failed to create product" };
            }

            const data = await response.json();
            set((state) => ({
                products: [...state.products, data.data]
            }));
            return { success: true, message: "Product created successfully" };
        } catch (error) {
            console.error("Error creating product:", error);
            return { success: false, message: "Failed to connect to server" };
        }
    },
    fetchProducts: async () => {
        try {
            console.log("Fetching products from:", FETCHED_API_URL);
            const response = await fetch(FETCHED_API_URL,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log("Fetched products:", data.message);
            set({ products: data.message });
            // if (!response.ok) {
            //     throw new Error("Failed to fetch products");
            // }
        }
        catch (error) {
            console.error("Error fetching products:", error);
        }
    },
    deleteProduct: async (pid) => {
        try {
            const response = await fetch(`${FETCHED_API_URL}/${pid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete product");
            }
            const data = await response.json();
            if (!data.success) {
                return { success: false, message: data.message };
            }

            // Update the UI immediately after deletion without refetching manually
            set((state) => ({
                products: state.products.filter(product => product._id !== pid)
            }));
            return { success: true, message: "Product deleted successfully" };
        }
        catch(error) {
            console.error("Error deleting product:", error);
        }
    },
    updateProduct: async (pid, updatedProduct) => {
        try {
            const response = await fetch(`${FETCHED_API_URL}/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedProduct)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update product");
            }
            const data = await response.json();
            set((state) => ({
                products: state.products.map(product => 
                    product._id === pid ? data.data : product
                )
            }));
            return { success: true, message: "Product updated successfully" };
        } catch (error) {
            console.error("Error updating product:", error);
            return { success: false, message: "Failed to update product" };
        }
    }
}));

