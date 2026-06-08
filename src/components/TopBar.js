export function TopBar({ title = '', showBack = false }) {
  return `
    <header class="top-bar">
      <button class="icon-button" type="button" aria-label="返回" ${showBack ? 'data-back' : 'data-nav="#/"'}>
        ${showBack ? '<span class="icon-chevron-left"></span>' : '<span class="brand-dot"></span>'}
      </button>
      <div class="top-title">${title}</div>
      <button class="icon-button" type="button" aria-label="目录" data-menu-open>
        <span class="icon-menu"></span>
      </button>
    </header>
  `;
}
