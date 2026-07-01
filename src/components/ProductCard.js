export function ProductCard({ product }) {
  return `
    <article class="product-card" data-nav="#/product/${product.id}">
      <div class="product-image">
        <img src="${product.cardImage}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='./assets/images/placeholders/product-placeholder.webp';" />
      </div>
      <div class="product-card-copy">
        <strong>${product.code}</strong>
        <h2>${product.name}</h2>
        <p>${product.subtitle}</p>
      </div>
      <span class="small-arrow"></span>
    </article>
  `;
}
