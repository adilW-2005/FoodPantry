    const QuantityInput = ({ value, max, onChange }) => (
    <input
        type="number"
        min="0"
        max={max}
        value={value || ''}
        onChange={e => onChange(parseInt(e.target.value))}
        className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-[#169fcb] focus:border-[#169fcb] transition-colors text-sm font-medium"
        placeholder="0"
    />
);

export default QuantityInput;