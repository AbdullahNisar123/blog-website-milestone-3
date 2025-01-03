"use client";
import { useCart } from "@/context/CartContext";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/types/Product";
import { useWishlist } from "@/context/WishlistContext";

export default function ShopBody() {
  const { addToCart, cart, setCurrentProduct } = useCart();
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res =
          await client.fetch(`*[_type == "product"] | order(_createdAt asc) {
          id,
          title,
          subtitle,
          currentprice,
          price,
          image,
          discount,
          new,
          stock,
          "slug": slug.current
        }`);
        // const repeatedProducts = Array(4).fill(res).flat();
        setData(res);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  //calculate available stock
  const getAvailableStock = (productId: string, initialStock: number) => {
    const cartItem = cart.find((item) => item.id === productId);
    return initialStock - (cartItem?.quantity || 0);
  };

  const handleProductClick = (product: Product) => {
    setCurrentProduct(product);
  };

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  return (
    <div>
      {/* Header */}
      <div className="md:py-[22px] md:px-[100px] py-[22px] px-[30px] bg-[#F9F1E7] flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0">
        <div className="flex items-center gap-[13px] md:gap-[30px]">
          <div className="text-[20px] text-black font-normal flex items-center gap-[14px]">
            <Icon icon="system-uicons:filtering" className="text-[18px]" />
            <p>Filter</p>
          </div>
          <div className="w-[28px] h-[28px]">
            <Icon icon="ci:grid-big-round" className="text-[24px]" />
          </div>
          <div className="w-[24px] h-[24px]">
            <Icon icon="bi:view-list" className="text-[22px]" />
          </div>
          <div className="border-l border-l-[#9F9F9F] py-[7px] md:px-[34px] px-[12px]">
            <p className="text-[13px] md:text-[20px]">
              Showing 1–{data.length} of {data.length} results
            </p>
          </div>
        </div>
        <div className="flex gap-7">
          <div className="flex gap-[17px] items-center">
            <p className="md:text-[20px] text-[13px] font-normal text-black">
              Show
            </p>
            <div className="py-[13px] px-[18px] md:text-[20px] text-[13px] font-normal text-[#9F9F9F] bg-white">
              <p>16</p>
            </div>
          </div>
          <div className="flex gap-[17px] items-center">
            <p className="md:text-[20px] text-[13px] font-normal text-black">
              Short by
            </p>
            <div className="py-[13px] px-[18px] md:text-[20px] text-[13px] font-normal text-[#9F9F9F] bg-white">
              <p>Default</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="py-[63px] px-[15px] flex flex-col items-center">
        <div className="flex gap-[15px] overflow-x-auto no-scrollbar flex-wrap justify-center w-full">
          {data.map((product, index) => {
            const availableStock = getAvailableStock(
              product.id,
              product.stock
            );

            return (
              <div
                className="bg-white group relative overflow-hidden w-[285px] md:w-[285px] lg:w-[285px]"
                key={`${product.id}-${index}`}
              >
                <div className="w-full h-[301px]">
                  {/* Product Image */}
                  <div
                    className="flex h-full w-full bg-no-repeat bg-center relative group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage: `url(${
                        product.image
                          ? urlFor(product.image).url()
                          : "/images/image1.png"
                      })`,
                    }}
                  >
                    {/* NEW Badge */}
                    {product.new && (
                      <div className="h-[48px] w-[48px] bg-GreenAccents rounded-full flex items-center justify-center absolute top-6 right-6">
                        <p className="text-[16px] font-medium text-white capitalize">
                          {product.new}
                        </p>
                      </div>
                    )}
                    {/* Discount Badge */}
                    {product.discount && (
                      <div className="h-[48px] w-[48px] bg-RedAccents rounded-full flex items-center justify-center absolute top-6 right-6">
                        <p className="text-[16px] font-medium text-white ">
                          {product.discount}%
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <div className="h-full absolute bottom-0 w-full flex flex-col gap-[24px] items-center justify-center bg-opacity-0 opacity-0 group-hover:bg-opacity-70 group-hover:opacity-100 bg-Gray1 transition-opacity duration-300 z-10">
                    {availableStock > 0 ? (
                      <button
                        className="text-[16px] font-semibold text-primary bg-white px-[52px] py-[12px]"
                        onClick={() => {
                          addToCart({
                            id: product.id,
                            title: product.title,
                            currentprice: product.currentprice,
                            image: product.image,
                            quantity: 1,
                            stock: product.stock,
                          });
                        }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <p className="mt-4 px-4 py-2 text-red-500 font-semibold">
                        Out of Stock
                      </p>
                    )}
                    <div className="flex gap-4 text-white text-sm mt-2 z-10">
                      <button className="flex items-center gap-1 text-[16px] font-semibold">
                        <Icon icon="gridicons:share" className="" /> Share
                      </button>
                      <button className="flex items-center gap-1 text-[16px] font-semibold">
                        <Icon
                          icon="fluent:arrow-swap-28-regular"
                          className=""
                        />
                        Compare
                      </button>
                      <button
                        className={`flex items-center gap-1 text-[16px] font-semibold text-white`}
                        onClick={() => {
                          if (isInWishlist(product.id)) {
                            removeFromWishlist(product.id);
                          } else {
                            addToWishlist({
                              id: product.id,
                              title: product.title,
                              subtitle: product.subtitle,
                              currentprice: product.currentprice,
                              image: product.image,
                              quantity: 1,
                              stock: product.stock,
                              price: product.price,
                              new: product.new,
                            });
                          }
                        }}
                      >
                        <Icon
                          icon={
                            isInWishlist(product.id)
                              ? "solar:heart-bold"
                              : "solar:heart-linear"
                          }
                          className={
                            isInWishlist(product.id)
                              ? "text-red-500 text-[20px]"
                              : "text-white text-[20px]"
                          }
                        />
                        Like
                      </button>
                    </div>
                  </div>
                </div>
                {/* Product Details */}
                <div className="pt-[16px] pb-[30px] pr-[20px] pl-[16px] bg-[#F4F5F7]">
                  <Link
                    href={`/Shop/${product.slug}`}
                    onClick={() => handleProductClick(product)}
                  >
                    <h2 className="text-[24px] font-semibold text-Gray1 z-20 relative">
                      {product.title}
                    </h2>
                  </Link>
                  <h4 className="text-[16px] font-medium text-Gray2">
                    {product.subtitle}
                  </h4>
                  <div className="w-fit flex gap-[16px] items-center">
                    <p className="text-[20px] font-semibold text-Gray1">
                      Rs {(product.currentprice).toFixed(3)}
                    </p>
                    {product.price && (
                      <p className="text-[16px] font-normal text-Gray4 line-through">
                        Rs {(product.price).toFixed(3)}
                      </p>
                    )}
                  </div>
                  <p className="text-[16px] font-normal text-Gray4">
                    Stock: {availableStock}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
