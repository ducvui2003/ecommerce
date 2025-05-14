import { currency } from '@/lib/utils';

export default function ProductPriceAndReview() {
  return (
    <div className="mt-4 lg:row-span-3 lg:mt-0">
      <h2 className="sr-only">Product information</h2>
      <div className="mt-2 flex items-baseline gap-x-3">
        <span className="text-2xl font-semibold text-red-600">
          {currency(250000)}
        </span>
        <span className="text-sm text-gray-400 line-through">
          {currency(300000)}
        </span>
        <span className="ml-2 text-sm font-medium text-green-600">
          -{Math.round(((300000 - 250000) / 300000) * 100)}%
        </span>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Reviews</h3>
        <div className="flex items-center">
          <div className="flex items-center">
            {[...Array(4)].map((_, idx) => (
              <Star key={idx} filled />
            ))}
            <Star filled={false} />
          </div>
          <a
            href="#"
            className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            117 reviews
          </a>
        </div>
      </div>
    </div>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`size-5 shrink-0 ${filled ? 'text-yellow-400' : 'text-gray-200'}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
      />
    </svg>
  );
}
