import ProductCard from "./ProductCard";

const ProductCardGrid = ({
  cookies = [],
  onEdit,
  onDelete,
  onViewDetails,
  onQuickStock,
  onToggleStatus,
  onToggleFeatured,
  onUpdateVariantStock,
  isUpdatingStock,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-2 lg:grid-cols-3">
      {cookies.map((cookie) => (
        <ProductCard
          key={cookie._id}
          cookie={cookie}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewDetails={onViewDetails}
          onQuickStock={onQuickStock}
          onToggleStatus={onToggleStatus}
          onToggleFeatured={onToggleFeatured}
          onUpdateVariantStock={onUpdateVariantStock}
          isUpdatingStock={isUpdatingStock}
        />
      ))}
    </div>
  );
};

export default ProductCardGrid;
