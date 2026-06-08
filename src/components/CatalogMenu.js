export function CatalogMenu({ brand, categories, open }) {
  const items = categories.map((category) => `
    <button class="menu-item" type="button" data-nav="#/category/${category.id}" data-menu-close>
      <span>${category.number}</span>
      <strong>${category.title}</strong>
    </button>
  `).join('');

  return `
    <div class="menu-layer ${open ? 'is-open' : ''}" aria-hidden="${open ? 'false' : 'true'}">
      <button class="menu-backdrop" type="button" data-menu-close aria-label="关闭目录"></button>
      <section class="menu-panel">
        <div class="menu-heading">
          <div>
            <p>${brand.logoText}</p>
            <h2>画册目录</h2>
          </div>
          <button class="text-button" type="button" data-menu-close>关闭</button>
        </div>
        <button class="menu-home" type="button" data-nav="#/" data-menu-close>首页</button>
        <div class="menu-grid">${items}</div>
      </section>
    </div>
  `;
}
