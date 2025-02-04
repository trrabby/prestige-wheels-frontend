import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
];

interface CartPageProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CartPage({ open, setOpen }: CartPageProps) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0   transition-opacity" />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 right-0 max-w-md w-full bg-transparent backdrop-blur-lg shadow-xl rounded-l-2xl overflow-hidden"
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
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center gap-4 py-4 border-b"
                >
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-16 h-16 rounded-md border"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.color}</p>
                    <p className="font-semibold">{product.price}</p>
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
              <p>$262.00</p>
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
    </Dialog>
  );
}
