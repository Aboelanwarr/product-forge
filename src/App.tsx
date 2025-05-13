import { useState } from "react";
import ProductCard from "./components/ProductCard";
import MyModal from "./components/ui/Modal";
import { productList } from "./data";
import Button from "./components/ui/Button";

function App() {
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  /* -------------- STATE -------------- */
  const [isOpen, setIsOpen] = useState(false);

  /* -------------- HANDLER -------------- */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <main className="container-2xl mx-auto">
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal}>ADD</Button>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md">
        {renderProductList}
      </div>
      <MyModal
        isOpen={isOpen}
        closeModal={closeModal}
        title="ADD A NEW PRODUCT"
      >
        <div className="flex items-center space-x-3">
          <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
          <Button className="bg-gray-500 hover:bg-gray-800">Cancel</Button>
        </div>
      </MyModal>
    </main>
  );
}

export default App;
