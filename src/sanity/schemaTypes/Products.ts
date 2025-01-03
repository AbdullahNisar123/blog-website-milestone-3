
export const Product = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "subtitle",
      type: "string",
      title: "Subtitle",
    },
    {
      name: "currentprice",
      type: "number",
      title: "Current Price",
    },
    {
      name: "price",
      type: "number",
      title: "Price",
    },
    {
      name: "image",
      type: "image",
      title: "Image",
    },
    {
      name: "discount",
      type: "number",
      title: "Discount",
    },
    {
      name: "new",
      type: "string",
      title: "New",
      options: {
        list: [{ title: "New", value: "new" }],
      },
    },
    {
        name:"stock",
        type:"number",
        title:"Stock",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 200 },
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image' }], 
      options: {
        layout: 'grid',
      },
    },
    
  ]
}
