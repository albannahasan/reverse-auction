import Navbar from "../components/global/navbar";
import ProductCard from "../ui/components/ProductCard";

export default function ProductList(){
    return(
        <>  
            <Navbar/>
            <div className="m-4 p-4  flex flex-col rounded-lg shadow-lg w-full space-x-8 justify-center">
                <h1>
                    Product List
                </h1>
                <div className="space-y-10 p-10">
                    <ProductCard itemName='Test' itemPrice={7.90} itemTime='22:00' value='22' bid={[]}/>
                    <ProductCard itemName='Test' itemPrice={3.21} itemTime='22:00' value='22' bid={[]}/>
                    <ProductCard itemName='Test' itemPrice={5.78} itemTime='22:00' value='22' bid={[]}/>

                </div>
            </div>
           

        </>
    )
}