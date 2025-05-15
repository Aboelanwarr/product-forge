import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import ProductCard from "./components/ProductCard";
import MyModal from "./components/ui/Modal";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import type { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import Input from "./components/ui/input";
import ErrorMessage from "./components/ui/ErrorMessage";
import CircleColor from "./components/ui/CircleColor";
import { Select } from "./components/ui/Select";
import type { ProductNameTypes } from "./types";

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
  /* -------------- STATE -------------- */
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
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
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  /* -------------- HANDLER -------------- */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const closeEditModal = () => setIsOpenEditModle(false);
  const openEditModal = () => setIsOpenEditModle(true);
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
    setProducts((prev) => [
      {
        ...product,
        id: crypto.randomUUID(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeModal();
  };
  /* -------------- RENDER -------------- */
  const renderProductList = products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openEditModal}
    />
  ));
  const renderFormInputList = formInputsList.map((input) => (
    <div className="flex flex-col gap-2" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-[2px] text-sm font-medium text-gray-700"
      >
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));
  const renderProductColors = colors.map((color) => (
    <>
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
    </>
  ));
  const renderProductEditWithErrorMsg = (id: string, label: string, name: ProductNameTypes,) => {
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

  useEffect(() => {
    if (tempColors.length > 0) {
      setErrors((prev) => ({ ...prev, colors: "" }));
    }
  }, [tempColors]);

  return (
    <main className="container-2xl mx-auto">
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal}>
        Build Product
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
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-gray-500 hover:bg-gray-800"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </MyModal>
      {/* Edit ProductModal */}
      <MyModal
        isOpen={isOpenEditModle}
        closeModal={closeEditModal}
        title="EDIT THIS PRODUCT"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg("title","Product Title","title")}
          {renderProductEditWithErrorMsg("description","Product Description","description")}
          {renderProductEditWithErrorMsg("imageURL","Product Image URL","imageURL")}
          {renderProductEditWithErrorMsg("price","Product Price","price")}
          <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
        </form>
      </MyModal>
    </main>
  );
}

export default App;
