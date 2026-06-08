import { TopBar } from './components/TopBar.js';
import { CatalogMenu } from './components/CatalogMenu.js';
import { HomePage } from './pages/HomePage.js';
import { SecondCategoryPage } from './pages/SecondCategoryPage.js';
import { ProductListPage } from './pages/ProductListPage.js';
import { ProductDetailPage } from './pages/ProductDetailPage.js';

export function App(root, brand, rawCatalog) {
  const catalog = normalizeCatalog(rawCatalog);
  let menuOpen = false;

  function start() {
    window.addEventListener('hashchange', render);
    render();
  }

  function navigate(hash) {
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function back() {
    const route = getRoute();
    if (route.page === 'detail') navigate(`#/series/${route.params.seriesId}`);
    else if (route.page === 'products') navigate(`#/category/${getCategoryBySeries(route.params.seriesId)?.id || 'gate'}`);
    else if (route.page === 'category') navigate('#/');
    else navigate('#/');
  }

  function toggleMenu(next) {
    menuOpen = typeof next === 'boolean' ? next : !menuOpen;
    render();
  }

  function getCategoryBySeries(seriesId) {
    return catalog.categories.find((category) => category.series.some((series) => series.id === seriesId));
  }

  function render() {
    const route = getRoute();
    const chrome = TopBar({
      title: getTitle(route, catalog),
      showBack: route.page !== 'home',
      onBack: back,
      onMenu: () => toggleMenu(true)
    });

    let page = '';
    if (route.page === 'category') {
      const category = catalog.categories.find((item) => item.id === route.params.categoryId) || catalog.categories[0];
      page = SecondCategoryPage({ category, navigate });
    } else if (route.page === 'products') {
      const category = getCategoryBySeries(route.params.seriesId) || catalog.categories[0];
      const series = category.series.find((item) => item.id === route.params.seriesId) || category.series[0];
      const products = catalog.products.filter((product) => product.seriesId === series.id);
      page = ProductListPage({ category, series, products, navigate });
    } else if (route.page === 'detail') {
      const product = catalog.products.find((item) => item.id === route.params.productId) || catalog.products[0];
      const category = getCategoryBySeries(product.seriesId) || catalog.categories[0];
      page = ProductDetailPage({ product, category });
    } else {
      page = HomePage({ brand, categories: catalog.categories, navigate });
    }

    root.innerHTML = `
      ${chrome}
      <main class="app-shell">${page}</main>
      ${CatalogMenu({ brand, categories: catalog.categories, open: menuOpen })}
    `;

    bindActions();
  }

  function bindActions() {
    root.querySelectorAll('[data-nav]').forEach((element) => {
      element.addEventListener('click', () => navigate(element.dataset.nav));
    });
    root.querySelectorAll('[data-back]').forEach((element) => {
      element.addEventListener('click', back);
    });
    root.querySelectorAll('[data-menu-open]').forEach((element) => {
      element.addEventListener('click', () => toggleMenu(true));
    });
    root.querySelectorAll('[data-menu-close]').forEach((element) => {
      element.addEventListener('click', () => toggleMenu(false));
    });
  }

  return { start };
}

function getRoute() {
  const hash = window.location.hash || '#/';
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);

  if (parts[0] === 'category' && parts[1]) return { page: 'category', params: { categoryId: parts[1] } };
  if (parts[0] === 'series' && parts[1]) return { page: 'products', params: { seriesId: parts[1] } };
  if (parts[0] === 'product' && parts[1]) return { page: 'detail', params: { productId: parts[1] } };
  return { page: 'home', params: {} };
}

function getTitle(route, catalog) {
  if (route.page === 'category') return catalog.categories.find((item) => item.id === route.params.categoryId)?.title || '';
  if (route.page === 'products') {
    return catalog.categories.flatMap((category) => category.series).find((series) => series.id === route.params.seriesId)?.title || '';
  }
  if (route.page === 'detail') return '';
  return '';
}

function normalizeCatalog(catalog) {
  const products = [...catalog.products];
  const existingSeries = new Set(products.map((product) => product.seriesId));
  const fallbackCodes = ['A', 'B', 'C', 'D'];

  catalog.categories.forEach((category) => {
    category.series.forEach((series) => {
      if (existingSeries.has(series.id)) return;
      fallbackCodes.forEach((suffix, index) => {
        products.push(createProduct(category, series, suffix, index + 1));
      });
    });
  });

  return { ...catalog, products };
}

function createProduct(category, series, suffix, number) {
  const prefix = category.id.slice(0, 2).toUpperCase();
  return {
    id: `${series.id}-${suffix.toLowerCase()}`,
    seriesId: series.id,
    code: `${prefix}-${String(number).padStart(2, '0')}`,
    name: `${series.title}${category.title}`,
    short: `${series.subtitle}`,
    tags: ['全部', '统一机位', '横向比较'],
    mainImage: './src/assets/placeholders/product-main.jpg',
    caseImages: [
      './src/assets/placeholders/case-01.jpg',
      './src/assets/placeholders/case-02.jpg',
      './src/assets/placeholders/case-03.jpg',
      './src/assets/placeholders/case-04.jpg'
    ],
    structureImage: './src/assets/placeholders/structure.jpg',
    material: '铝合金',
    color: '多种颜色可定制',
    craft: '氟碳喷涂',
    opening: category.id === 'gazebo' ? '模块组合' : '按场景定制',
    custom: '支持尺寸 / 颜色 / 款式定制'
  };
}
