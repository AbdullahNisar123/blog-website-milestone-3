import { useCart } from "@/context/CartContext";
import { urlFor } from "@/sanity/lib/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";

type ShoppingCartProps = {
  closeCart: () => void;
};

export default function ShoppingCart({ closeCart }: ShoppingCartProps) {
  const { cart, removeFromCart, calculateSubtotal } = useCart();
  // console.log("detail in wishlist",cart);


  return (
    <div className="pt-[28px]  absolute bg-white top-16 md:top-0 right-0 w-fit z-20">
      <div className="flex md:gap-[42px] md:pl-[27px] md:pr-[40px] px-5 gap-4 items-center ">
        <div className="md:pb-[26px] pb-3 w-[287px] border-b border-b-[#D9D9D9] items-center flex ">
          <p className="text-[24px] font-semibold">Shopping Cart</p>
        </div>
        <div
          onClick={closeCart}
          className="w-fit h-fit cursor-pointer self-start"
        >
          <Icon icon="bi:bag-x" className="text-[#9F9F9F] text-[20px]" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-5 md:pt-[42px] md:pl-[27px] md:pr-[40px] p-[30px]">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div className="flex gap-[26px] md:gap-[60px] items-center" key={item.id}>
                <div className="flex gap-[32px] items-center">
                  <div className="w-[105px] h-[105px] bg-[#B88E2F] bg-opacity-25 rounded-[10px] flex items-center">
                    <Image
                      src={
                        item.image
                          ? urlFor(item.image).url()
                          : "/images/placeholder.png"
                      }
                      alt={item.title}
                      width={100}
                      height={100}
                      unoptimized
                    ></Image>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-[16px] font-normal">{item.title}</h2>
                    <div className="flex gap-[15px] items-center">
                      <p className="text-[16px] font-light">{item.quantity}</p>
                      <p className="text-[12px] font-light">x</p>
                      <p className="text-[12px] font-medium text-[#B88E2F]">
                        Rs. {item.currentprice * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
                <Icon
                  icon="flowbite:close-circle-solid"
                  className="text-[17px] md:text-[25px] text-[#9F9F9F]"
                  onClick={() => removeFromCart(item.id)}
                />
              </div>
            ))
          )}
        </div>

        <div className="flex flex-col gap-[23px] px-[27px] md:pl-[27px] md:pr-[40px]">
          <div className="w-[286px] flex justify-between ">
            <p className="text-[16px] font-normal">Subtotal</p>
            <p className="text-[16px] font-semibold text-[#B88E2F]">
              Rs. {calculateSubtotal().toFixed(3)}
            </p>
          </div>
          <div className="border-t border-t-[#D9D9D9] py-[26px] flex gap-[10px] md:gap-[14px]  ">
            <Link
              href="/Cart"
              onClick={closeCart}
              className="text-[12px] font-normal border border-black rounded-[50px] py-[6px] px-[20px] md:px-[30px]"
            >
              Cart
            </Link>
            <Link
              href="/CheckOut"
              onClick={closeCart}
              className="text-[12px] font-normal border border-black rounded-[50px] py-[6px] px-[30px]"
            >
              Checkout
            </Link>
            <Link
              href="/Comparison"
              onClick={closeCart}
              className="text-[12px] font-normal border border-black rounded-[50px] py-[6px] px-[30px]"
            >
              Comparison
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
