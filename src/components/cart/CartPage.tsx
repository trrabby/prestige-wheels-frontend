import { useCartItems } from "@/redux/features/admin/productsManagementSlice";
import { useAppSelector } from "@/redux/hook";
import { ICars } from "@/types/cars.type";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "@/config";
import { useCurrentToken } from "@/redux/features/auth/authSlice";

interface CartPageProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CartPage({ open, setOpen }: CartPageProps) {
  const [cartArray, setCartArray] = useState<ICars[]>([]); // State to store the products
  const cartArrayIds = useAppSelector(useCartItems); // Cart item IDs
  const token = useAppSelector(useCurrentToken); // Authentication token

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch product details for each ID in cartArrayIds
        const responses = await Promise.all(
          cartArrayIds.map(async (id) => {
            const res = await axios.get(`${config().URL}/cars/${id}`, {
              withCredentials: true,
              headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
              },
            });
            return res.data; // Return the product data
          })
        );

        // Count the quantity of each product using a Map
        const quantityMap = cartArrayIds.reduce((map, id) => {
          map.set(id, (map.get(id) || 0) + 1);
          return map;
        }, new Map());

        // Add quantity information to each product
        const cartItemsWithQuantity = responses.map((response) => {
          const product = response.data[0]; // Assuming product is in the first item
          const quantity = quantityMap.get(product._id) || 0; // Get quantity from Map
          return {
            ...product,
            quantity, // Add quantity to product data
          };
        });

        // Filter duplicates and update cartArray
        const uniqueCartItems = Array.from(
          new Map(
            cartItemsWithQuantity.map((item) => [item._id, item])
          ).values()
        );

        setCartArray(uniqueCartItems); // Set the state with the updated cart array
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (cartArrayIds.length > 0) {
      fetchProducts(); // Only fetch if there are cart items
    }
  }, [cartArrayIds, token]); // Re-fetch when cartArrayIds or token changes

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl rounded-l-2xl overflow-hidden"
          >
            <DialogPanel className="h-full flex flex-col p-6">
              <div className="flex justify-between items-center border-b pb-4">
                <DialogTitle className="text-lg font-semibold">
                  Shopping Cart
                </DialogTitle>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto mt-4">
                <ul>
                  {cartArray.map((product) => (
                    <li
                      key={product._id}
                      className="flex items-center gap-4 py-4 border-b"
                    >
                      <img
                        src={product.imgUrl[0]}
                        alt={"Product Image"}
                        className="w-16 h-16 rounded-md border"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{product.model}</p>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                        <p className="font-semibold">{product.price}</p>
                        {/* Display the Quantity of the product */}
                        <p className="text-sm text-gray-400">
                          Quantity: {product.quantity}
                        </p>
                      </div>
                      <button className="text-red-500 hover:text-red-700">
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto border-t pt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <p>Subtotal</p>
                  <p>
                    $
                    {cartArray
                      .reduce(
                        (total, product) =>
                          total + product.price * product.quantity,
                        0
                      )
                      .toFixed(2)}
                  </p>
                </div>
                <button className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
                  Checkout
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-2 w-full text-indigo-600 hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            </DialogPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
