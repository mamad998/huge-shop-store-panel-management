import DetailClientSide from "./detailClientSide";

export default async function ProductDetail({params}){

const {id} = await params;
const response = await fetch(`http://localhost:3000/api/products/${id}`);
const mainProduct = await response.json();


return(
    <div className="product-detail">
        <DetailClientSide mainProduct={mainProduct}/>
    </div>
)
}