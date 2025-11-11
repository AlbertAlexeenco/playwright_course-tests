import { obligatoryFieldsSchema, obligatoryRequredFields } from "../core.schema";
import { createProductSchema } from "./create.schema";
import { productSchema } from "./product.schema";

export const allProductsSchema = {
  type: "object",
  properties: {
    products: {
      type: "array",
      items: productSchema
    }
  },
  required: [...obligatoryRequredFields],
};