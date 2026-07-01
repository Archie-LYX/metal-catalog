export function SecondCategoryPage({ category }) {
  const cards = category.series.map((series) => `
    <article class="series-card" data-nav="#/series/${category.id}/${series.id}">
      <img src="${series.image}" alt="${series.title}" loading="lazy" onerror="this.onerror=null;this.src='./assets/images/placeholders/product-placeholder.webp';" />
      <div class="series-shade"></div>
      <div class="series-copy">
        <span>${series.number}</span>
        <h2>${series.title}</h2>
        <p>${series.subtitle}</p>
        <i></i>
      </div>
      <span class="round-arrow"></span>
    </article>
  `).join('');

  return `
    <section class="sub-hero">
      <img src="${category.image}" alt="${category.title}" onerror="this.onerror=null;this.src='./assets/images/placeholders/product-placeholder.webp';" />
      <div>
        <h1>${category.title}</h1>
        <p>${category.enTitle}</p>
        <i></i>
        <strong>${category.description}</strong>
      </div>
    </section>

    <section class="series-list" aria-label="${category.title}二级目录">
      ${cards}
    </section>
  `;
}
