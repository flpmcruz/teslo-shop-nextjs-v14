export const revalidate = 60;

import { notFound, redirect } from 'next/navigation';
import { Pagination, ProductGrid, Title } from '@/components';
import { getPaginatedProductWithImages } from '@/actions';
import { Gender } from '@prisma/client';

interface Props {
  searchParams: {
    page?: number;
  };
  params: {
    gender: string;
  }
}

export default async function ({ params, searchParams }: Props) {

  const { gender } = params;

  const page = searchParams.page ? parseInt(String(searchParams.page)) : 1;

  const { products, totalPages } = await getPaginatedProductWithImages({ page, gender: gender as Gender });

  if (products.length === 0 && page > 1) redirect('/')

  const labels: Record<string, string> = {
    'kid': 'Niños',
    'men': 'Hombres',
    'women': 'Mujeres',
    'unisex': 'Unisex'
  }

  if (!labels[gender]) notFound();
  if (products.length === 0) redirect(`/gender/${gender}`);

  return (
    <>
      <Title
        title={`Artículos para ${(labels)[gender]}`}
        subtitle="Encuentra los mejores productos para ti"
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />

      <Pagination
        totalPages={totalPages}
      />

    </>
  );
}