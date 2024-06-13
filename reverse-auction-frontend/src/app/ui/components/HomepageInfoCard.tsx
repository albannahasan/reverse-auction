
const HomepageInfoCard = () => {
    return (
        <div className=" p-4 flex flex-row rounded-lg shadow-lg w-full space-x-8 justify-center">
            <div className="flex flex-col max-w-[60%]  gap-5 justify-center">
                <h3 className="text-small font-semibold leading-none text-default-900">Item Name</h3>
                <h5 className="text-small tracking-tight text-default-400">Name PlaceHolder</h5>
                <h3 className="text-small font-semibold leading-none text-default-900">Item Description</h3>
                <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ipsam perferendis consequatur numquam quisquam, nobis reiciendis incidunt dolores odio accusantium quia expedita adipisci porro laborum saepe blanditiis mollitia. Ipsa, harum.</p>
            </div>
            <div className="flex flex-col gap-5 p-4 justify-center">
                <h3 className="text-2xl font-bold leading-none text-center">Time Remaining:</h3>
                <h3 className="text-2xl font-bold leading-none text-center">5:00</h3>
            </div>
        </div>
      );
}

export default HomepageInfoCard;