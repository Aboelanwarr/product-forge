/**
 * Validates a product object and returns an object with error messages for invalid fields.
 *
 * @param {Object} product - The product data to validate.
 * @param {string} product.title - The product title. Must be 10–80 characters.
 * @param {string} product.description - The product description. Must be 10–900 characters.
 * @param {string} product.imageURL - The product image URL. Must be a valid URL.
 * @param {string} product.price - The product price. Must be a numeric string.
 * @param {Array} product.colors - The selected colors. Must have at least one color.
 * @returns {{ title: string; description: string; imageURL: string; price: string; colors: string }}
 *          An object containing error messages for each field, or empty strings if valid.
 */
export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
}) => {
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
    colors: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  };

  const validUrl = /^(ftp|http|https):\/\/[^"]+$/.test(product.imageURL);

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Product title must be between 10 and 80 characters";
  }

  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description = "Description must be between 10 and 900 characters";
  }

  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = "Valid image URL is required";
  }

  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Valid price is required";
  }

  if (!Array.isArray(product.colors) || product.colors.length === 0) {
    errors.colors = "Please select at least one color.";
  }

  return errors;
};
