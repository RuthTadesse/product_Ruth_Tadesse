import React from "react";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "@/store/nextSlice";
import FormattedPrice from "./FormattedPrice";
import { IoMdClose } from "react-icons/io";

interface Item {
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: number;
  price: number;
  title: string;
  _id: number;
  quantity: number;
}

interface CartProductProps {
  item: Item;
}

const CartProduct: React.FC<CartProductProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(
      increaseQuantity({
        ...item,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrease = () => {
    dispatch(
      decreaseQuantity({
        ...item,
        quantity: item.quantity - 1,
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteProduct(item._id));
  };

  return (
    <div className="bg-gray-100 rounded-lg flex items-center gap-4 p-4">
      <div className="flex-shrink-0 w-32 h-32">
        <img
          className="object-cover w-full h-full"
          src={item.image}
          alt="Product"
        />
      </div>
      <div className="flex flex-col flex-grow ml-4">
        <p className="text-lg font-semibold text-gray-800">{item.title}</p>
        <p className="text-sm text-gray-600">{item.description}</p>
        <p className="text-sm text-gray-600">
          Unit Price:{" "}
          <span className="font-semibold text-amazon_blue">
            <FormattedPrice amount={item.price} />
          </span>
        </p>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrease}
              disabled={item.quantity === 1}
              className="px-2 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-lg">{item.quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-2 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
            >
              +
            </button>
          </div>
          <div
            onClick={handleDelete}
            className="flex items-center text-sm text-gray-500 cursor-pointer"
          >
            <IoMdClose className="mr-1" />
            Remove
          </div>
        </div>
        <p className="text-lg font-semibold text-amazon_blue mt-2">
          Total Price: <FormattedPrice amount={item.price * item.quantity} />
        </p>
      </div>
    </div>
  );
};

export default CartProduct;
