import { Checkbox } from "@nextui-org/react";

export default function FilterTable() {
  return (
    <div className="p-2 m-5">
      <div className="flex flex-col p-2 ">
        <div className="font-semibold mb-2">
        Price
        </div>
        <div className="grid grid-cols-2">
          <div className="mb-1">
            <span>From: </span>
            <input className="relative w-6/12" type="text" />
          </div>

          <div>
            <span>To: </span>
            <input className="relative w-6/12" type="text" />
          </div>
        </div>
      </div>
      <div className="flex flex-col p-2">
        <div className="mb-2 font-semibold text-white">Condition:</div>
        <Checkbox className="mb-1 text-white" defaultSelected radius="full">
          Very Good
        </Checkbox>
        <Checkbox className="mb-1 text-white" defaultSelected radius="full">
          Good
        </Checkbox>
        <Checkbox className="mb-1 text-white" defaultSelected radius="full">
          Fair
        </Checkbox>
        <Checkbox className="mb-1 text-white" defaultSelected radius="full">
          Poor
        </Checkbox>
      </div>
      <div className="flex flex-col p-2">
        <div className="mb-2 font-semibold text-white">Sort By:</div>
        <Checkbox className="mb-1 text-white" defaultSelected radius="full">
          Name
        </Checkbox>
        <Checkbox className="mb-1 text-white" defaultSelected radius="full">
          Price
        </Checkbox>
      </div>
    </div>
  );
}
