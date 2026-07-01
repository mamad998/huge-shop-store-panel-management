import HeroSection from "../components/HeroSection";
import LatestProducts from "../components/LatestProducts";

export default async function Home({searchParams}) {
  const params = await searchParams;
  return (
    <>
    <HeroSection/>
    <LatestProducts searchParams={params}/>
    </>
  );
}
