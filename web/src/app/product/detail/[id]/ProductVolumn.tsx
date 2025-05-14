export default function ProductVolumeSelector() {
  return (
    <form>
      <div>
        <h3 className="text-sm font-medium text-gray-900">Dung tích</h3>
        <fieldset className="mt-4">
          <div className="flex items-center gap-x-3">
            {["10ml", "30ml", "50ml"].map((volume, idx) => (
              <label
                key={idx}
                className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:border-black"
              >
                <input type="radio" name="volume-choice" className="sr-only" />
                {volume}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </form>
  );
}
