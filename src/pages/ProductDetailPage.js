import { InfoTable } from '../components/InfoTable.js';

export function ProductDetailPage({ product, category }) {
  return `
    <section class="detail-hero">
      <div class="detail-copy">
        <span>${product.code}</span>
        <h1>${product.name}</h1>
        <p>${product.short}</p>
        <ul>
          <li>支持尺寸定制</li>
          <li>支持颜色定制</li>
          <li>支持款式定制</li>
        </ul>
      </div>
      <img src="${product.mainImage}" alt="${product.name}" />
    </section>

    <section class="case-grid" aria-label="经典案例">
      ${product.caseImages.map((image, index) => `
        <img src="${image}" alt="${category.title}案例图${index + 1}" loading="lazy" />
      `).join('')}
    </section>

    <section class="section-block">
      <h2><span></span>产品结构图</h2>
      <img class="structure-image" src="${product.structureImage}" alt="${product.name}结构图" loading="lazy" />
    </section>

    <section class="section-block product-info">
      <h2><span></span>产品信息</h2>
      ${InfoTable({ product })}
    </section>
  `;
}
