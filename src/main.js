import { App } from './App.js';

const root = document.querySelector('#app');

async function boot() {
  const [brand, catalog] = await Promise.all([
    fetch('./src/data/brand.json').then((response) => response.json()),
    fetch('./src/data/catalog.json').then((response) => response.json())
  ]);

  const app = App(root, brand, catalog);
  app.start();
}

boot().catch((error) => {
  root.innerHTML = `
    <main class="app-shell">
      <section class="empty-state">
        <h1>画册加载失败</h1>
        <p>请通过本地预览服务或线上链接打开画册。</p>
      </section>
    </main>
  `;
  console.error(error);
});
