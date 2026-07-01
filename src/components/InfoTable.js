export function InfoTable({ product }) {
  const specs = product.specs || {};
  const rows = [
    ['产品型号', product.code],
    product.gateType ? ['产品类型', product.gateType] : null,
    ['开启方式', specs.opening],
    ['产品材质', specs.material],
    ['表面工艺', specs.finish],
    ['定制说明', specs.custom]
  ].filter(Boolean);

  return `
    <dl class="info-list">
      ${rows.map(([label, value]) => `
        <div class="info-row">
          <dt>${label}</dt>
          <dd>${value || '按项目需求定制'}</dd>
        </div>
      `).join('')}
    </dl>
  `;
}
