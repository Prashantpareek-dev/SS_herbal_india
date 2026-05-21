import SkeletonLoader from './SkeletonLoader';

const ProductCardSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <SkeletonLoader type="product-card" count={count} />
    </div>
  );
};

export default ProductCardSkeleton;
