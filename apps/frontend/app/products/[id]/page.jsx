import DetailClientSide from "./detailClientSide";

export default async function ProductDetail({params}){

const {id} = await params;
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
const mainProduct = await response.json();


return(
    <div className="product-detail">
        <DetailClientSide mainProduct={mainProduct}/>
    </div>
)
}
