import Navigation from "@/components/Navigation";
import ScrollReveal from "@/components/ScrollReveal";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import Gallery from "@/components/Gallery";
import System from "@/components/System";
import Access from "@/components/Access";
import Footer from "@/components/Footer";
import { getGallery } from "@/lib/microcms";

export const revalidate = 60;

export default async function Home() {
  let gallery: Awaited<ReturnType<typeof getGallery>> = [];

  try {
    gallery = await getGallery();
  } catch {
    // microCMS未接続時
  }

  return (
    <>
      <Navigation />
      <ScrollReveal />
      <Hero />
      <Concept />
      <Gallery images={gallery} />
      <System />
      <Access />
      <Footer />
    </>
  );
}
