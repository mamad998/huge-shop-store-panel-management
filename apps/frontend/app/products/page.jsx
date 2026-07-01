import LatestProducts from "../../components/LatestProducts";

export default async function Products({searchParams}){
    const params = await searchParams;
    return(
        <LatestProducts searchParams={params}/>
    )
}