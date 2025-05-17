import React from "react";

const ratingData = [
  { stars: 5, percent: 80 },
  { stars: 4, percent: 65 },
  { stars: 3, percent: 50 },
  { stars: 2, percent: 25 },
  { stars: 1, percent: 15 },
];

export default function RatingSummary() {
  return (
    <div className="max-w-md p-4 bg-white rounded-md">
      <h2 className="text-lg font-semibold mb-1">ĐÁNH GIÁ VÀ BÌNH LUẬN</h2>
      <div className="text-3xl font-bold text-yellow-500">4.8<span className="text-sm text-gray-600"> /5</span></div>
      <div className="flex items-center mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09L5.5 12.18 1 7.91l6.06-.88L10 2l2.94 5.03L19 7.91l-4.5 4.27 1.378 5.91z" />
          </svg>
        ))}
      </div>

      <div className="space-y-2">
        {ratingData.map(({ stars, percent }) => (
          <div key={stars} className="flex items-center space-x-2">
            <span className="w-4 text-sm text-gray-600">{stars}</span>
            <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09L5.5 12.18 1 7.91l6.06-.88L10 2l2.94 5.03L19 7.91l-4.5 4.27 1.378 5.91z" />
            </svg>
            <div className="flex-1 bg-gray-200 h-2 rounded">
              <div className="bg-[#FFAB66D1] h-2 rounded" style={{ width: `${percent}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-2 mt-4">
        <button className="px-3 py-1 bg-orange-100 text-orange-600 font-medium rounded">Mới nhất</button>
        <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded">Cao đến thấp</button>
        <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded">Có hình ảnh</button>
      </div>
    </div>
  );
}
