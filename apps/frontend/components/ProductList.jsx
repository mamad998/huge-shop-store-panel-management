import ProductBox from "./ProductBox";

export default function ProductList({showProducts}){
    return(
       <div className="products-grid">
        {
            showProducts.length > 0 &&
            showProducts.map(
                (product)=><ProductBox product={product} key={product._id}/>
            )
        }
       </div>
    )
}