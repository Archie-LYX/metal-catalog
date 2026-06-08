export function CategoryCard({ category }) {
  return `
    <article class="category-card" data-nav="#/category/${category.id}">
      <div class="category-copy">
        <span class="gold-number">${category.number}</span>
        <h2>${category.title}</h2>
        <p>${category.enTitle}</p>
        <i></i>
      </div>
      <img src="${category.image}" alt="${category.title}" loading="lazy" />
      <span class="round-arrow"></span>
    </article>
  `;
}
