import { FaTrash, FaPlus } from "react-icons/fa";

export default function MultiSocial({ counts, setCounts }) {
  const handleAddFields = () => {
    setCounts([...counts, { title: "", number: "" }]);
  };

  const handleInputChange = (index, event) => {
    const values = [...counts];
    if (event.target.name === "title") {
      values[index].title = event.target.value;
    } else {
      values[index].number = event.target.value;
    }
    setCounts(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...counts];
    values.splice(index, 1);
    setCounts(values);
  };

  const isFormValid = () => {
    return counts.every((entry) => entry.title !== "" && entry.number !== "");
  };

  return (
    <div className="mt-3 flex flex-col gap-3 rounded border p-3">
      {counts?.map((input, index) => (
        <div key={index} className="flex gap-2 text-sm">
          <input
            type="text"
            name="title"
            placeholder="title"
            value={input.title}
            onChange={(event) => handleInputChange(index, event)}
          />
          <input
            type="number"
            name="number"
            placeholder="100"
            value={input.number}
            onChange={(event) => handleInputChange(index, event)}
          />
          <button
            type="button"
            onClick={() => handleRemoveFields(index)}
            className="flex w-20 items-center justify-center rounded-md bg-red-500 text-white"
          >
            <FaTrash />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddFields}
        disabled={counts?.length > 0 && !isFormValid()}
        className="flex w-max items-center gap-2 rounded bg-gray-500 px-4 py-2 text-sm text-base-100"
      >
        <FaPlus className="text-xs" /> Add Counting
      </button>
    </div>
  );
}
