import type { IProduct } from "../interfaces";
import { numberWithCommas, txtSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";
import CircleColor from "./ui/CircleColor";

interface Iprops {
  product: IProduct;
  setProductToEdit: (prodcut: IProduct) => void;
  openEditModal: () => void;
  idx: number;
  setProductToEditIdx: (value: number) => void;
  openConfirmModal: () => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  idx,
  setProductToEditIdx,
  openConfirmModal,
}: Iprops) => {
  const { title, description, imageURL, price, category, colors } = product;

  /* -------------- RENDER -------------- */
  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));

  /* -------------- HANDLER -------------- */
  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
    setProductToEditIdx(idx);
  };
  const onRemove = () => {
    setProductToEdit(product);
    openConfirmModal();
  };

  return (
    <div className="border border-[#e1e1e1] bg-[#f8f8f8] rounded-md p-2 flex flex-col space-y-3">
      <Image
        imageUrl={imageURL}
        alt={"product name"}
        className="rounded-md h-52 w-full lg:object-cover"
      />
      <h3 className="text-lg text-card-foreground font-semibold mt-2 flex-1">
        {txtSlicer(title, 25)}
      </h3>
      <p className="text-sm text-card-foreground break-words">
        {txtSlicer(description)}
      </p>
      <div className="flex flex-wrap items-center space-x-1">
        {!colors.length ? (
          <p className="min-h-[20px] text-card-foreground font-semibold">
            Not available
          </p>
        ) : (
          renderProductColors
        )}
      </div>
      <div className="flex items-center justify-between py-2">
        <span className="text-lg text-[#611c69] font-semibold">{`$ ${numberWithCommas(
          price
        )}`}</span>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-card-foreground">
            {category.name}
          </span>
          <Image
            imageUrl={category.imageURL}
            alt={category.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Button
          className="bg-[#f4f0f7] hover:bg-indigo-800 text-[#4b154c]"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button className="bg-[#e0215b] hover:bg-red-800" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
