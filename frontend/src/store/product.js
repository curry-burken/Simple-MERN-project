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
    }
}));

