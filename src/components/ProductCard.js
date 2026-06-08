export function ProductCard({ product }) {
  return `
    <article class="product-card" data-nav="#/product/${product.id}">
      <div class="product-image">
        <img src="${product.mainImage}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-card-copy">
        <strong>${product.code}</strong>
        <p>${product.short}</p>
      </div>
      <span class="small-arrow"></span>
    </article>
  `;
}
