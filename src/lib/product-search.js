import { CATEGORY_NAMES } from '@/lib/constants';

export function normalizeSearchText(value) {
  if (value === null || value === undefined) return '';

  return String(value)
    .toLowerCase()
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeSearchValue(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeSearchValue).filter(Boolean).join(' ');
  }

  if (typeof value === 'boolean') {
    return value ? 'بله موجود ویژه true' : 'خیر ناموجود false';
  }

  return normalizeSearchText(value);
}

export function getProductSearchText(product) {
  const values = [
    product?.name,
    product?.category,
    CATEGORY_NAMES[product?.category],
    product?.color,
    product?.finish_types,
    product?.available_sizes,
    product?.applications,
    product?.processing,
    product?.origin,
    product?.price_range,
    product?.in_stock,
    product?.featured,
  ];

  return values.map(normalizeSearchValue).filter(Boolean).join(' ');
}

export function searchProducts(products, query, filters = {}) {
  const normalizedQuery = normalizeSearchText(query);

  return products.filter((product) => {
    const matchesQuery = !normalizedQuery || getProductSearchText(product).includes(normalizedQuery);
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesColor = !filters.color || product.color === filters.color;
    const matchesFinish = !filters.finish || product.finish_types?.includes(filters.finish);

    return matchesQuery && matchesCategory && matchesColor && matchesFinish;
  });
}
