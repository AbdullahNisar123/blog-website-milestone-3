"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/types/Product";

export default function ProductBody() {
  const { cart, addToCart, currentProduct } = useCart();
  const router = useRouter();
  const [data, setData] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res =
          await client.fetch(`*[_type == "product"] | order(_createdAt asc) [0...4]{
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
        setData(res);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const getAvailableStock = (productId: string, initialStock: number) => {
    const cartItem = cart.find((item) => item.id === productId);
    return initialStock - (cartItem?.quantity || 0);
  };

  if (!currentProduct) {
    router.push("/Shop");
    return null;
  }

  // incrementing quantity
  const incrementQuantity = () => {
    if (currentProduct.stock && quantity < currentProduct.stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  //decrementing quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // adding the product with the selected quantity to the cart
  const handleAddToCart = () => {
    addToCart({
      ...currentProduct,
      quantity,
    });
  };
  const availableStock = getAvailableStock(
    currentProduct.id,
    currentProduct.stock
  );

  return (
    <div>
      {/* header start */}
      <div className="md:px-[100px] md:py-[32px] bg-[#F9F1E7] flex gap-6 py-5 px-[10px]">
        <div className="text-[16px] font-normal  text-black flex gap-[14px] items-center">
          <Link href="/" className="text-[#9F9F9F] ">Home</Link>
          <Icon
            icon="material-symbols:keyboard-arrow-right"
            className="w-5 h-5 font-bold"
          />
        </div>
        <div className="text-[16px] font-normal  text-black flex gap-[14px] items-center">
          <Link href="/Shop"  className="text-[#9F9F9F] ">Shop</Link>
          <Icon
            icon="material-symbols:keyboard-arrow-right"
            className="w-5 h-5 font-bold"
          />
        </div>
        <div className="pl-[34px] py-[6px] border-l-[2px] border-l-[#9F9F9F]">
          <Link  href="#" >{currentProduct.title}</Link>
        </div>
      </div>
      {/* header end */}
      
      {/* body start */}
      <div className="">
        
        <div className="flex flex-col md:flex-row md:py-[35px] md:px-[100px] border-b border-b-[#D9D9D9] py-[22px] px-5 ">
          <div className="flex md:flex-row flex-col gap-[22px] md:gap-0">
            <div className="flex md:flex-col gap-[32px] order-2 md:order-none">
              <div className="bg-[#F9F1E7] rounded-[10px] w-[76px] h-[80px] flex items-center">
                <Image
                  width={83}
                  height={55}
                  src="/images/Asgaard-sofa.png"
                  alt="Asgaard Sofa"
                ></Image>
              </div>
              <div className="bg-[#F9F1E7] rounded-[10px] w-[76px] h-[80px] flex items-center">
                <Image
                  width={83}
                  height={55}
                  src="/images/Asgaard-sofa.png"
                  alt="Asgaard Sofa"
                ></Image>
              </div>
              <div className="bg-[#F9F1E7] rounded-[10px] w-[76px] h-[80px] flex items-center">
                <Image
                  width={83}
                  height={55}
                  src="/images/Asgaard-sofa.png"
                  alt="Asgaard Sofa"
                ></Image>
              </div>
              <div className="bg-[#F9F1E7] rounded-[10px] w-[76px] h-[80px] flex items-center">
                <Image
                  width={83}
                  height={55}
                  src="/images/Asgaard-sofa.png"
                  alt="Asgaard Sofa"
                ></Image>
              </div>
            </div>
            <div className="md:px-[35px]">
              <div className="bg-[#F9F1E7] rounded-[10px] w-full md:w-[423px] md:h-[500px] flex items-center">
                <Image
                  width={481}
                  height={391}
                  src={urlFor(currentProduct.image).url()}
                  alt="Asgaard Sofa"
                ></Image>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[22px]">
            <div className="flex flex-col gap-[15px]">
              <div>
                <h3 className="text-[42px]">{currentProduct.title}</h3>
                <p className="text-[24px] text-[#9F9F9F] font-medium">
                  Rs {currentProduct.currentprice.toFixed(3)}
                </p>
              </div>
              <div className="flex gap-[18px] items-center">
                <div className="text-[#FFC700] flex">
                  <Icon icon="dashicons:star-filled" />
                  <Icon icon="dashicons:star-filled" />
                  <Icon icon="dashicons:star-filled" />
                  <Icon icon="dashicons:star-filled" />
                  <Icon icon="carbon:star-half" />
                </div>
                <p className="pl-[22px] py-[5px] text-[#9F9F9F] border-l border-l-[#9F9F9F] text-[13px]">
                  5 Customer Review
                </p>
              </div>
              <p className="text-[13px]">
                Setting the bar as one of the loudest speakers in its class, the
                Kilburn is a compact, stout-hearted hero with a well-balanced
                audio which boasts a clear midrange and extended highs for a
                sound.
              </p>
            </div>
            <div className="flex flex-col gap-[32px]">
              <div className="flex flex-col gap-[18px]">
                <div className="flex flex-col gap-3">
                  <p className="text-[14px] text-[#9F9F9F]">Size</p>
                  <div className="flex gap-4">
                    <button className="rounded-[5px] bg-[#B88E2F] text-[13px] text-white px-[12px] py-[5px]">
                      L
                    </button>
                    <button className="rounded-[5px] bg-[#F9F1E7] text-[13px] px-[12px] py-[5px]">
                      XL
                    </button>
                    <button className="rounded-[5px] bg-[#F9F1E7] text-[13px]  px-[12px] py-[5px]">
                      XS
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-[14px] text-[#9F9F9F]">Color</p>
                  <div className="flex gap-4">
                    <button className="rounded-full w-[30px] h-[30px] bg-[#816DFA] "></button>
                    <button className="rounded-full w-[30px] h-[30px] bg-black "></button>
                    <button className="rounded-full w-[30px] h-[30px] bg-[#B88E2F] "></button>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 md:gap-[15px] flex-wrap pb-5 md:pb-[50px] border-b border-b-[#D9D9D9] justify-center">
                <div className="border border-[#9F9F9F] text-black md:px-[12px] px-3 h-fit py-3 md:py-[15px] flex w-fit items-center rounded-[10px] gap-3 md:gap-[30px]">
                  <p onClick={decrementQuantity} className="cursor-pointer">
                    -
                  </p>
                  <p>{quantity}</p>
                  <p onClick={incrementQuantity} className="cursor-pointer">
                    +
                  </p>
                </div>
                {availableStock > 0 ? (
                  <button
                    onClick={handleAddToCart}
                    className="border border-black text-black md:px-[25px] md:py-[15px] px-3 py-3 h-fit flex  rounded-[15px] text-[18px] font-normal"
                  >
                    Add To Cart
                  </button>
                ) : (
                  <p className="mt-4 px-4 py-2 text-red-500 font-semibold ">
                    Out of Stock
                  </p>
                )}
                <div className="border border-black text-black md:px-[25px] md:py-[15px] px-3 py-3 h-fit flex w-fit rounded-[15px] gap-1 text-[18px] font-normal">
                  <p>+</p>
                  <p>Compare</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 ">
              <div className="flex text-[16px] text-[#9F9F9F] gap-3 items-center">
                <div className="flex gap-[52px] items-center">
                  <p>SKU</p>
                  <p>:</p>
                </div>
                <p>SS001</p>
              </div>
              <div className="flex text-[16px] text-[#9F9F9F] gap-3 items-center">
                <div className="flex gap-[20px] items-center">
                  <p>Category</p>
                  <p>:</p>
                </div>
                <p>Sofas</p>
              </div>
              <div className="flex text-[16px] text-[#9F9F9F] gap-3 items-center">
                <div className="flex gap-[52px] items-center">
                  <p>Tags</p>
                  <p>:</p>
                </div>
                <p>Sofa, Chair, Home, Shop</p>
              </div>
              <div className="flex text-[16px] text-[#9F9F9F] gap-3 items-center">
                <div className="flex gap-[44px] items-center">
                  <p>Share</p>
                  <p>:</p>
                </div>
                <div className="flex text-black gap-[25px] items-center">
                  <Icon icon="akar-icons:facebook-fill" />
                  <Icon icon="akar-icons:linkedin-box-fill" />
                  <Icon icon="ant-design:twitter-circle-filled" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:px-[100px] md:py-[32px] border-b border-b-[#D9D9D9] flex flex-col gap-[36px] py-[22px] px-5">
          <div className="flex flex-col items-center gap-5 md:gap-[37px]">
            <div className="flex gap-4 md:gap-[53px] text-[#9F9F9F] md:text-[24px] text-[21px] font-bold md:font-normal">
              <p className="text-black">Description</p>
              <p>Additional Information</p>
              <p>Reviews 5</p>
            </div>
            <div className="flex flex-col gap-[30px]  text-[#9F9F9F] text-[16px]">
              <p>
                Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
                portable active stereo speaker takes the unmistakable look and
                sound of Marshall, unplugs the chords, and takes the show on the
                road.
              </p>
              <p>
                Weighing in under 7 pounds, the Kilburn is a lightweight piece
                of vintage styled engineering. Setting the bar as one of the
                loudest speakers in its class, the Kilburn is a compact,
                stout-hearted hero with a well-balanced audio which boasts a
                clear midrange and extended highs for a sound that is both
                articulate and pronounced. The analogue knobs allow you to fine
                tune the controls to your personal preferences while the
                guitar-influenced leather strap enables easy and stylish travel.
              </p>
            </div>
          </div>
          <div className="flex gap-5 md:gap-[30px] flex-col md:flex-row">
            <div className="w-full md:w-[605px] md:h-[348px] rounded-[10px] bg-[#F9F1E7] flex items-center">
              <Image
                src="/images/Cloud sofa three seater + ottoman_2 1.png"
                alt="Asgaard Sofa"
                width={600}
                height={100}
              ></Image>
            </div>
            <div className="w-full md:w-[605px] md:h-[348px] rounded-[10px] bg-[#F9F1E7] flex items-center">
              <Image
                src="/images/Cloud sofa three seater + ottoman_1 1.png"
                alt="Asgaard Sofa"
                width={600}
                height={100}
              ></Image>
            </div>
          </div>
        </div>
        <div className="w-full px-[10px] pt-[32px] pb-[60px] md:pb-[100px] flex flex-col justify-center border-b border-b-[#D9D9D9]">
          <div className="flex flex-col gap-[22px] w-fit mx-auto">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-[40px] font-bold text-Gray1">
                Related Products
              </h1>
            </div>

            {/* Cards */}
            <div className="flex gap-[15px] overflow-x-auto no-scrollbar flex-wrap justify-center w-full">
              {/* Cards for Products */}
              {data.map((product) => {
                const availableStock = getAvailableStock(
                  product.id,
                  product.stock
                );
                return (
                  <div
                    className="bg-[#F4F5F7] group relative overflow-hidden w-[285px] md:w-[285px] lg:w-[285px]"
                    key={product.id}
                  >
                    {/* Image Container */}
                    <div className="w-full h-[301px]">
                      <div
                        className="flex h-full w-full bg-no-repeat bg-center relative group-hover:scale-105 transition-transform duration-300"
                        style={{
                          backgroundImage: `url(${
                            product.image
                              ? urlFor(product.image).url()
                              : "/images/image1.png" // Use a fallback image
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
                            <p className="text-[16px] font-medium text-white">
                              {product.discount}%
                            </p>
                          </div>
                        )}
                      </div>
                      {/* Add to Cart Button */}
                      <div className="h-full absolute bottom-0 w-full flex flex-col gap-[24px] items-center justify-center bg-opacity-0 opacity-0 group-hover:bg-opacity-70 group-hover:opacity-100 bg-Gray1 transition-opacity duration-300">
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
                        <div className="flex gap-4 text-white text-sm mt-2">
                          <button className="flex items-center gap-1 text-[16px] font-semibold">
                            <Icon icon="gridicons:share" className="" /> Share
                          </button>
                          <button className="flex items-center gap-1 text-[16px] font-semibold">
                            <Icon
                              icon="fluent:arrow-swap-28-regular"
                              className=""
                            />{" "}
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
                                  currentprice: product.currentprice,
                                  image: product.image,
                                  quantity: 1,
                                  stock: product.stock,
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
                    <div className="w-fit pt-[16px] pb-[30px] pr-[20px] pl-[16px]">
                      <Link href={`/Shop/${product.slug}`} passHref>
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

            {/* Show More Button */}
            <div className="w-full text-center mt-5">
              <Link
                href="/Shop"
                className="text-[16px] font-semibold bg-white py-[12px] px-[72px] text-primary border border-primary"
              >
                Show More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
