import Banner from "@/components/Banner";
import Products from "@/components/Products";
import { ProductProps } from "../../type";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAllProducts } from "@/store/nextSlice";

interface Props {
  productData: ProductProps[];
}

export default function Home({ productData }: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAllProducts({ allProducts: productData }));
  }, [productData, dispatch]);

  return (
    <main>
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <div className="relative md:-mt020 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
          <Products productData={productData} />
        </div>
      </div>
    </main>
  );
}

// SSR for data fetching
export const getServerSideProps = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  const productData = data.products.map((product: any) => ({
    brand: product.brand || "Unknown Brand",
    category: product.category || "Unknown Category",
    description: product.description || "No description available",
    image: product.thumbnail || "/default-thumbnail.jpg",
    isNew: false,
    oldPrice: product.price ? product.price * 1.2 : 0,
    price: product.price || 0,
    title: product.title || "No title",
    _id: product.id || 0,
  }));

  return { props: { productData } };
};
