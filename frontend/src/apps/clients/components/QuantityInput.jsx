    const QuantityInput = ({ value, max, onChange }) => (
    <input
        type="number"
        min="0"
        max={max}
        value={value || ''}
        onChange={e => onChange(parseInt(e.target.value))}
        className="border px-2 py-1 rounded w-20"
        placeholder="Qty"
    />
    );

export default QuantityInput;