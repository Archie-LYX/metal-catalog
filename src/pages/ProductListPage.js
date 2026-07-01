import { ProductCard } from '../components/ProductCard.js';

const gateTypes = ['全部', '大门', '小门', '推拉门'];

export function ProductListPage({ category, series, products, selectedGateType = '全部' }) {
  const showGateFilters = category.id === 'gates';
  const filterNav = (gateType) => {
    const basePath = `#/series/${category.id}/${series.id}`;
    return gateType === '全部' ? basePath : `${basePath}?gateType=${encodeURIComponent(gateType)}`;
  };

  return `
    <section class="list-heading">
      <h1>${series.title}</h1>
      <p>${category.title} · 共${products.length}款</p>
    </section>

    ${showGateFilters ? `
      <nav class="gate-filter" aria-label="庭院门类型筛选">
        ${gateTypes.map((gateType) => `
          <button
            class="gate-filter-button ${selectedGateType === gateType ? 'is-active' : ''}"
            type="button"
            data-nav="${filterNav(gateType)}"
            aria-pressed="${selectedGateType === gateType ? 'true' : 'false'}"
          >
            ${gateType}
          </button>
        `).join('')}
      </nav>
    ` : ''}

    <section class="product-grid" aria-label="产品列表">
      ${products.length
        ? products.map((product) => ProductCard({ product })).join('')
        : `<p class="empty-products">${showGateFilters ? '当前门型产品正在整理中' : '该系列产品正在整理中'}</p>`}
    </section>
  `;
}
