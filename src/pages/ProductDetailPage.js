import { InfoTable } from '../components/InfoTable.js';

const caseImageLabels = ['完工正面实景', '完工斜侧实景', '局部工艺细节', '庭院配套实景'];

export function ProductDetailPage({ product, category }) {
  return `
    <article class="product-detail">
      <section class="product-hero">
        <img src="${product.heroImage}" alt="${product.name}" />
      </section>

      <header class="product-title-block">
        <span>${product.code}</span>
        <h1>${product.name}</h1>
        <p>${product.subtitle}</p>
      </header>

      <section class="section-block">
        <h2><span></span>经典案例</h2>
        <div class="case-grid" aria-label="${category.title}经典案例">
          ${product.caseImages.map((image, index) => `
            <img src="${image}" alt="${product.name}${caseImageLabels[index] || '案例实景'}" loading="lazy" />
          `).join('')}
        </div>
      </section>

      <section class="section-block">
        <h2><span></span>产品结构图</h2>
        <div class="structure-frame">
          <img class="structure-image" src="${product.structureImage}" alt="${product.name}结构图" loading="lazy" />
        </div>
      </section>

      <section class="section-block product-info">
        <h2><span></span>产品信息</h2>
        ${InfoTable({ product })}
      </section>
    </article>
  `;
}
