export const revalidate = 604080;
import { Metadata, ResolvingMetadata } from "next";

import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { ProductMobileSlideshow, ProductSlideshow, StockLabel } from "@/components";
import { getProductBySlug } from "@/actions/";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  }
}

// This function is called at build time and generates the metadata for the page
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title,
    description: product?.description ?? '',
    openGraph: {
      images: [`/products/${product?.images[1]}`],
    },
  }
}

export default async function ({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug)

  if (!product) return notFound();

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      <div className="col-span-1 md:col-span-2">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />

        {/* Desktop Slideshow */}
        <ProductSlideshow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        <StockLabel
          slug={product.slug}
        />
        <h1
          className={`${titleFont.className} antialiased font-bold text-xl`}
        >
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product} />

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>

      </div>
    </div>
  );
}