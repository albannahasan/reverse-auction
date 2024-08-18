import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { useEffect, useState } from "react";

export default function FilterTable({
  handleColumnChange,
  sortValue,
  selectedCondition,
  handleConditionChange,
  handlePriceChange,
  minPrice: initialMinPrice,
  maxPrice: initialMaxPrice,
}) {
  const [dropdownValue, setDropdownValue] = useState(".....");
  const [minPrice, setMinPrice] = useState(initialMinPrice || "");
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice || "");

  useEffect(() => {
    switch (sortValue) {
      case "name":
        setDropdownValue("Name");
        break;
      case "created_date":
        setDropdownValue("Date Created");
        break;

      case "price":
        setDropdownValue("Price");
        break;

      default:
        setDropdownValue("Date Created");
        break;
    }
  }, [sortValue]);

  const handleSubmit = (event) => {
    console.log("BRUUUUUH", minPrice, maxPrice);

    event.preventDefault();
    // Call the parent callback with the current values

    handlePriceChange(minPrice, maxPrice);
  };

  return (
    <div className="p-2 m-5">
      <div className="flex flex-col p-2 ">
        <div className="font-semibold mb-2 text-slate-800">Price</div>
        <form onSubmit={handleSubmit} className="text-slate-800 grid grid-cols-3 gap-4">
          <div className="mb-1">
            <label
              htmlFor="minPrice"
              className="block text-sm font-medium text-gray-700"
            >
              From:
            </label>
            <input
              id="minPrice"
              name="minPrice"
              type="number"
              step="1.00"
              min="0"
              placeholder="min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="relative w-full text-black p-1 border-black"
            />
          </div>

          <div className="border-black">
            <label
              htmlFor="maxPrice"
              className="block text-sm font-medium text-gray-700"
            >
              To:
            </label>
            <input
              id="maxPrice"
              name="maxPrice"
              type="number"
              step="1.00"
              min="0"
              value={maxPrice}
              placeholder="max"
              onChange={(e) => setMaxPrice(e.target.value)}
              className="relative w-full text-black p-1 border-slate-950"
            />
          </div>
          <button
              type="submit"
              className="px-4 mt-4 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600"
            >
              S
            </button>
        </form>
        {/* <div className="grid grid-cols-2">
          <div className="mb-1">
            <span>From: </span>
            <input className="relative w-6/12" type="text" />
          </div>

          <div>
            <span>To: </span>
            <input className="relative w-6/12" type="text" />
          </div>
        </div> */}
      </div>
      <div className="flex flex-col p-2">
        <div className="mb-2 font-semibold text-slate-800">Condition:</div>
        <CheckboxGroup
          className="text-white"
          color="warning"
          value={selectedCondition}
          onChange={(key) => handleConditionChange(key)}
          defaultValue={selectedCondition}
        >
          <Checkbox className="text-white" value="VERY_GOOD">Very Good</Checkbox>
          <Checkbox value="GOOD">Good</Checkbox>
          <Checkbox value="FAIR">Fair</Checkbox>
          <Checkbox value="POOR">Poor</Checkbox>
        </CheckboxGroup>
      </div>
      <div className="p-2 my-3 font-semibold text-slate-800">Sort By:</div>

      <Dropdown className="bg-black mx-auto">
        <DropdownTrigger className="border-black mx-auto">
          <Button variant="bordered">{dropdownValue}</Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action event example"
          onAction={(key) => handleColumnChange(key)}
          color="secondary"
        >
          <DropdownItem key="date_created">Created Date</DropdownItem>
          <DropdownItem key="name">Name</DropdownItem>
          <DropdownItem key="price">Price</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
