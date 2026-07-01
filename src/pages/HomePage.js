import { CategoryCard } from '../components/CategoryCard.js';

export function HomePage({ brand, categories }) {
  return `
    <section class="home-hero">
      <div class="brand-lockup">
        <div class="logo-mark">
          <img src="${brand.logo}" alt="${brand.companyName}标识" />
        </div>
        <div>
          <h1>${brand.companyName}</h1>
          <p>${brand.englishName}</p>
        </div>
      </div>
      <div class="hero-copy">
        <h2>${brand.slogan.replace(' · ', '<br />')}</h2>
        <p>${brand.subSlogan}</p>
        <i></i>
      </div>
      <img class="hero-image" src="./assets/images/hero/home-hero.webp" alt="庭院金属产品画册主视觉" />
    </section>

    <section class="category-list" aria-label="一级目录">
      ${categories.map((category) => CategoryCard({ category })).join('')}
    </section>

    <footer class="catalog-footer">
      <span></span>
      <p>支持现代庭院金属定制</p>
      <span></span>
    </footer>
  `;
}
