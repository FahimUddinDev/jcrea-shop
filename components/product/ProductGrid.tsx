import ProductCard from "./ProductCard";

function ProductGrid() {
  return (
    <div className=" grid grid-cols-6 gap-5 py-10">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}

export default ProductGrid;
