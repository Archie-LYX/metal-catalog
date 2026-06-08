import { ProductCard } from '../components/ProductCard.js';

export function ProductListPage({ series, products }) {
  const tagNames = Array.from(new Set(products.flatMap((product) => product.tags || [])));
  const tags = (tagNames.length ? tagNames : ['全部', '统一机位', '横向比较']).map((tag, index) => `
    <span class="filter-pill ${index === 0 ? 'is-active' : ''}">${tag}</span>
  `).join('');

  return `
    <section class="list-heading">
      <h1>${series.title}</h1>
      <p>共${products.length}款</p>
    </section>

    <section class="filter-row" aria-label="产品筛选">
      ${tags}
    </section>

    <section class="product-grid" aria-label="产品列表">
      ${products.map((product) => ProductCard({ product })).join('')}
    </section>
  `;
}
