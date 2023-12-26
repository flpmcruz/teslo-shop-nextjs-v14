import { ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';

const seedData = initialData.products;

interface Props {
  params: {
    id: Category;
  }
}

export default function ({ params }: Props) {

  const { id } = params;
  const products = seedData.filter(product => product.gender === id);

  const labels: Record<Category, string> = {
    'kid': 'Niños',
    'men': 'Hombres',
    'women': 'Mujeres',
    'unisex': 'Unisex'
  }

  if (!labels[id]) {
    notFound();
  }

  return (
    <>
      <Title
        title={`Artículos para ${(labels)[id]}`}
        subtitle="Encuentra los mejores productos para ti"
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />
    </>
  );
}