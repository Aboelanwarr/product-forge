import type { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";

interface Iprops {
  product: IProduct;
}

const ProductCard = ({ product }: Iprops) => {
  const { title, description, imageURL,price,category} = product;


  return (
    <div className="max-w-sm mx-auto lg:max-w-lg md:mx-0 border border-gray-300 rounded-md p-2 flex flex-col">
      <Image imageUrl={imageURL} alt={"product name"} className="rounded-md flex-1 w-full lg:object-cover" />
      <h3 className="text-lg font-semibold">{txtSlicer(title,25)}</h3>
      <p className="text-sm text-gray-500 break-words">{txtSlicer(description)}</p>
      <div className="flex items-center my-4 space-x-2">
        <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg text-indigo-600 font-semibold">{`$ ${price}`}</span>
        <Image
          imageUrl={category.imageURL}
          alt={category.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Button className="bg-indigo-700">EDIT</Button>
        <Button className="bg-red-700">DELETE</Button>
      </div>
    </div>
  );
};

export default ProductCard;
