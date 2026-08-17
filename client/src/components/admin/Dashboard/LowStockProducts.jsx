import constants from "../../../common/constants";

const products = [
  { name: "Chocolate Cookie", remaining: 6 },
  { name: "Oreo Delight", remaining: 4 },
  { name: "Red Velvet", remaining: 8 },
  { name: "Choco Chips", remaining: 3 },
];

export default function LowStockProducts({ products }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Low Stock {constants.C_PRODUCTS}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {constants.C_PRODUCTS} that need restocking soon.
          </p>
        </div>
        <span className="rounded-full bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          Critical
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-3xl border border-slate-100 bg-slate-50/70 p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">
                  {product.cookieId.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Only {product.stock} left in stock
                </p>
              </div>
              <div className="w-full sm:w-1/2">
                <div className="h-2.5 rounded-full bg-slate-200">
                  <div
                    className="h-2.5 rounded-full bg-amber-500"
                    style={{
                      width: `${Math.max(0, product.stock * 10)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
