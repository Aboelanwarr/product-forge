import type { IProduct } from "../interfaces";
import { txtSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";
import CircleColor from "./ui/CircleColor";

interface Iprops {
  product: IProduct;
  setProductToEdit: (prodcut: IProduct) => void;
  openEditModal: () => void;
}

const ProductCard = ({ product,setProductToEdit,openEditModal }: Iprops) => {
  const { title, description, imageURL, price, category, colors } = product;

  /* -------------- RENDER -------------- */
  const renderProductColors = colors.map((color) => (<CircleColor key={color} color={color} />));


  /* -------------- HANDLER -------------- */
  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
  }

  return (
    <div className="max-w-sm mx-auto lg:max-w-lg md:mx-0 border border-gray-300 rounded-md p-2 flex flex-col">
      <Image
        imageUrl={imageURL}
        alt={"product name"}
        className="rounded-md w-full lg:object-cover"
      />
      <h3 className="text-lg font-semibold mt-2 flex-1">
        {txtSlicer(title, 25)}
      </h3>
      <p className="text-sm text-gray-500 break-words">
        {txtSlicer(description)}
      </p>
      <div className="flex flex-wrap items-center space-x-1">
        {renderProductColors}
      </div>
      <div className="flex items-center justify-between py-2">
        <span className="text-lg text-indigo-600 font-semibold">{`$ ${price}`}</span>
        <Image
          imageUrl={category.imageURL}
          alt={category.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Button className="bg-indigo-700" onClick={onEdit}>
          EDIT
        </Button>
        <Button className="bg-red-700">
          DELETE
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
