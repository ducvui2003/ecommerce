export default function ProductInfo() {
  return (
    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Tinh dầu tràm trà nguyên chất
      </h1>
      <div className="mt-2 text-sm text-gray-600">
        <p>Nhà cung cấp: <span className="font-medium text-gray-800">Tinh Dầu Thiên Nhiên An Nhiên</span></p>
        <p>Loại sản phẩm: <span className="font-medium text-gray-800">Tinh dầu tràm</span></p>
      </div>
      <div className="mt-6 text-base text-gray-700 leading-relaxed">
        <p>
          Tinh dầu tràm trà nguyên chất được chiết xuất từ lá tràm gió, có công dụng kháng khuẩn, kháng viêm...
        </p>
        <p className="mt-4">
          Sản phẩm 100% thiên nhiên, không chất bảo quản, an toàn cho trẻ nhỏ và phụ nữ mang thai...
        </p>
      </div>
    </div>
  );
}
