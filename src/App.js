import { TopBar } from './components/TopBar.js';
import { CatalogMenu } from './components/CatalogMenu.js';
import { HomePage } from './pages/HomePage.js';
import { SecondCategoryPage } from './pages/SecondCategoryPage.js';
import { ProductListPage } from './pages/ProductListPage.js';
import { ProductDetailPage } from './pages/ProductDetailPage.js';

export function App(root, brand, rawCatalog) {
  const catalog = normalizeCatalog(rawCatalog);

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
    if (route.page === 'detail') {
      const product = findProduct(catalog, route.params.productId);
      navigate(product ? `#/series/${product.category}/${product.style}` : '#/');
    } else if (route.page === 'products') {
      navigate(`#/category/${route.params.categoryId}`);
    } else {
      navigate('#/');
    }
  }

  function render() {
    const route = getRoute();
    const pageTitle = getTitle(route, catalog);
    const chrome = TopBar({
      title: pageTitle,
      showBack: route.page !== 'home'
    });

    let page = '';
    if (route.page === 'category') {
      const category = findCategory(catalog, route.params.categoryId) || catalog.categories[0];
      page = SecondCategoryPage({ category });
    } else if (route.page === 'products') {
      const category = findCategory(catalog, route.params.categoryId) || catalog.categories[0];
      const series = category.series.find((item) => item.id === route.params.styleId) || category.series[0];
      const seriesProducts = catalog.products.filter(
        (product) => product.category === category.id && product.style === series.id
      );
      const selectedGateType = category.id === 'gates' ? route.params.gateType : '全部';
      const products = selectedGateType === '全部'
        ? seriesProducts
        : seriesProducts.filter((product) => product.gateType === selectedGateType);
      page = ProductListPage({ category, series, products, selectedGateType });
    } else if (route.page === 'detail') {
      const product = findProduct(catalog, route.params.productId) || catalog.products[0];
      const category = findCategory(catalog, product.category) || catalog.categories[0];
      page = ProductDetailPage({ product, category });
    } else {
      page = HomePage({ brand, categories: catalog.categories });
    }

    root.innerHTML = `
      ${chrome}
      <main class="app-shell ${route.page === 'detail' ? 'detail-shell' : ''}">${page}</main>
      ${CatalogMenu({ brand, categories: catalog.categories })}
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
      element.addEventListener('click', () => toggleLayer('.menu-layer', true));
    });
    root.querySelectorAll('[data-menu-close]').forEach((element) => {
      element.addEventListener('click', () => toggleLayer('.menu-layer', false));
    });
  }

  function toggleLayer(selector, open) {
    const layer = root.querySelector(selector);
    if (!layer) return;
    layer.classList.toggle('is-open', open);
    layer.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  return { start };
}

function getRoute() {
  const hash = window.location.hash || '#/';
  const [path, query = ''] = hash.split('?');
  const queryParams = new URLSearchParams(query);
  const parts = path.replace(/^#\/?/, '').split('/').filter(Boolean);

  if (parts[0] === 'category' && parts[1]) {
    return { page: 'category', params: { categoryId: parts[1] } };
  }
  if (parts[0] === 'series' && parts[1] && parts[2]) {
    return {
      page: 'products',
      params: {
        categoryId: parts[1],
        styleId: parts[2],
        gateType: queryParams.get('gateType') || '全部'
      }
    };
  }
  if (parts[0] === 'product' && parts[1]) {
    return { page: 'detail', params: { productId: parts[1] } };
  }
  return { page: 'home', params: {} };
}

function getTitle(route, catalog) {
  if (route.page === 'category') {
    return findCategory(catalog, route.params.categoryId)?.title || '';
  }
  if (route.page === 'products') {
    const category = findCategory(catalog, route.params.categoryId);
    return category?.series.find((series) => series.id === route.params.styleId)?.title || '';
  }
  if (route.page === 'detail') return '产品详情';
  return '';
}

function normalizeCatalog(catalog) {
  const productPlaceholder = './assets/images/placeholders/product-placeholder.webp';

  const products = catalog.products.map((product) => {
    const id = product.id.toUpperCase();
    const baseAssetRoot = `./assets/images/products/${product.category}/${product.style}`;
    const assetRoot = product.category === 'gates'
      ? `${baseAssetRoot}/${getGateTypeFolder(product.gateType)}/${id}`
      : `${baseAssetRoot}/${id}`;
    return {
      ...product,
      id,
      code: id,
      heroImage: `${assetRoot}/hero.webp`,
      cardImage: product.cardImage || `${assetRoot}/card.webp`,
      caseImages: [1, 2, 3, 4].map((number) => `${assetRoot}/case-0${number}.webp`),
      structureImage: `${assetRoot}/structure.webp`
    };
  });

  const categories = catalog.categories.map((category) => {
    const series = category.series.map((item) => ({
      ...item,
      image: item.image || productPlaceholder
    }));

    return {
      ...category,
      image: category.image || productPlaceholder,
      series
    };
  });

  return { categories, products };
}

function findCategory(catalog, categoryId) {
  return catalog.categories.find((category) => category.id === categoryId);
}

function findProduct(catalog, productId) {
  return catalog.products.find((product) => product.id.toLowerCase() === productId.toLowerCase());
}

function getGateTypeFolder(gateType) {
  const gateTypeFolders = {
    大门: 'main-gate',
    小门: 'small-gate',
    推拉门: 'sliding-gate'
  };

  return gateTypeFolders[gateType] || 'main-gate';
}
