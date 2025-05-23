import { useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import MyModal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import type { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import Input from "./components/ui/Input";
import ErrorMessage from "./components/ui/ErrorMessage";
import CircleColor from "./components/ui/CircleColor";
import { Select } from "./components/ui/Select";
import type { ProductNameTypes } from "./types";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  /* ------- STATE -------  */
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  });
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModle, setIsOpenEditModle] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  /* ------- HANDLER -------  */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const closeEditModal = () => setIsOpenEditModle(false);
  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = () => setIsOpenConfirmModal(true);
  const openEditModal = (product: IProduct, idx: number) => {
    setProductToEdit(product);
    setProductToEditIdx(idx);
    setTempColors(product.colors || []);
    setIsOpenEditModle(true);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const onCancel = () => {
    setProduct(defaultProductObj);
    closeModal();
  };

  const removeProductHandler = () => {
    const filtered = products.filter(
      (product) => product.id !== productToEdit.id
    );
    setProducts(filtered);
    closeConfirmModal();
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    const { title, description, price, imageURL } = product;
    event.preventDefault();
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
      colors: tempColors,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      {
        ...product,
        id: crypto.randomUUID(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempColors([]);
    closeModal();
    toast("Product has been added successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    const { title, description, price, imageURL } = productToEdit;
    event.preventDefault();
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
      colors: tempColors,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColors,
    };
    setProducts(updatedProducts);
    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeEditModal();
    toast("Product has been added successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };
  /* ------- RENDER -------  */
  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={() => openEditModal(product, idx)}
      idx={idx}
      setProductToEditIdx={setProductToEditIdx}
      openConfirmModal={openConfirmModal}
    />
  ));

  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col gap-2" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-accent-foreground"
      >
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
        placeholder={input.label}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
    />
  ));

  const renderProductEditWithErrorMsg = (
    id: string,
    label: string,
    name: ProductNameTypes
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={id}
          className="mb-[2px] text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  return (
    <main className="container mx-auto">
      <Button
        className="block my-10 px-10 mx-auto"
        onClick={openModal}
        width="w-fit"
      >
        Build a Product
      </Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md">
        {renderProductList}
      </div>

      {/* Add Product Modal */}

      <MyModal
        isOpen={isOpen}
        closeModal={closeModal}
        title="ADD A NEW PRODUCT"
      >
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex flex-wrap items-center space-x-1">
            {tempColors.map((color) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
                className="text-white p-1 rounded-md m-1"
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center space-x-1">
            {renderProductColors}
            <ErrorMessage msg={errors["colors"]} />
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-secondary hover:bg-secondary/70 text-secondary-foreground">
              Submit
            </Button>
            <Button
              className="bg-destructive hover:bg-destructive/75"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </MyModal>

      {/* Edit Product Modal */}
      <MyModal
        isOpen={isOpenEditModle}
        closeModal={closeEditModal}
        title="EDIT THIS PRODUCT"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg(
            "description",
            "Product Description",
            "description"
          )}
          {renderProductEditWithErrorMsg(
            "imageURL",
            "Product Image URL",
            "imageURL"
          )}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}
          <Select
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />
          <div className="flex flex-wrap items-center space-x-1">
            {tempColors.map((color) => (
              <span
                key={color}
                style={{ backgroundColor: color }}
                className="text-white p-1 rounded-md m-1"
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center space-x-1">
            {renderProductColors}
            <ErrorMessage msg={errors["colors"]} />
          </div>
          <Button className="">Submit</Button>
        </form>
      </MyModal>
      {/* DELETE PRODUCT CONFIRM MODAL */}
      <MyModal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button
            className="!bg-destructive hover:!bg-destructive/80"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>
          <Button
            type="button"
            className="bg-secondary hover:bg-secondary/70 text-secondary-foreground"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </MyModal>
      <Toaster />
    </main>
  );
}

export default App;
