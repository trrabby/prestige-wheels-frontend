import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  useCartItems,
} from "@/redux/features/admin/productManagement/productsManagementSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
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
import { HiDocumentCurrencyBangladeshi } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import CustomModal from "./checkOutModal";
import CustomEmpty from "../Empty";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

interface CartPageProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CartPage({ open, setOpen }: CartPageProps) {
  const [cartArray, setCartArray] = useState<ICars[]>([]); // State to store the products
  const cartArrayIds = useAppSelector(useCartItems); // Cart item IDs with quantity info
  const token = useAppSelector(useCurrentToken); // Authentication token
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modalOopen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(!modalOopen);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch product details for each ID in cartArrayIds
        const responses = await Promise.all(
          cartArrayIds.map(async ({ id }) => {
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
        const quantityMap = cartArrayIds.reduce((map, { id, quantity }) => {
          map.set(id, quantity); // Maintain the quantity for each product
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
    fetchProducts();
  }, [cartArrayIds, token]); // Re-fetch when cartArrayIds or token changes

  const totalPrice = cartArray
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);

  const checkOutData = { orderedProduct: cartArray, totalPrice };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const handleNavigatingToProductPage = (id: string) => {
    navigate(`products/cars/${id}`);
    setOpen(false);
  };

  const handleCheckout = () => {
    handleModalOpen();
  };

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

              {cartArray.length > 0 ? (
                <div className="flex flex-col justify-between h-full">
                  <div className="flex-1 overflow-y-auto mt-4">
                    <ul>
                      {cartArray.map((product) => (
                        <li
                          key={product._id}
                          className="flex items-center gap-4 py-4 border-b"
                        >
                          <img
                            onClick={() =>
                              handleNavigatingToProductPage(product._id)
                            }
                            src={product.imgUrl[0]}
                            alt={"Product Image"}
                            className="w-16 h-16 rounded-md border cursor-pointer hover:shadow-sm hover:shadow-accent"
                          />
                          <div className="flex-1">
                            <p
                              onClick={() =>
                                handleNavigatingToProductPage(product._id)
                              }
                              className="font-medium hover:underline cursor-pointer"
                            >
                              {product.model}
                            </p>
                            <p className="text-sm text-gray-500">
                              {product.brand}
                            </p>
                            <p className="font-semibold flex gap-2 items-center justify-start">
                              <HiDocumentCurrencyBangladeshi />
                              {product.price}
                            </p>
                            <p className="text-sm text-gray-400">
                              Quantity: {product.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleDecreaseQuantity(product._id)
                              }
                              className="text-base text-gray-500 border p-1 rounded-full hover:bg-primary hover:duration-500 hover:text-third"
                            >
                              <FiMinus />
                            </button>
                            <p>{product.quantity}</p>
                            <button
                              onClick={() =>
                                handleIncreaseQuantity(product._id)
                              }
                              className=" text-gray-500 border p-1 rounded-full hover:bg-accent hover:duration-500 hover:text-third text-base"
                            >
                              <FaPlus />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(product._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <p>Subtotal</p>
                      <p>${totalPrice}</p>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
                    >
                      Checkout
                    </button>
                    <CustomModal
                      checkOutData={checkOutData}
                      open={modalOopen}
                      setOpen={setModalOpen}
                      setCartPageOpen={setOpen}
                    />
                    <button
                      onClick={() => setOpen(false)}
                      className="mt-2 w-full text-indigo-600 hover:underline"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              ) : (
                <CustomEmpty setOpen={setOpen} />
              )}
            </DialogPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
