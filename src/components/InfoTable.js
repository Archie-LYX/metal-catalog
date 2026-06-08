export function InfoTable({ product }) {
  const rows = [
    ['产品型号', product.code, '开启方式', product.opening],
    ['产品材质', product.material, '可选颜色', product.color],
    ['表面工艺', product.craft, '定制说明', product.custom]
  ];

  return `
    <table class="info-table">
      <tbody>
        ${rows.map((row) => `
          <tr>
            <th>${row[0]}</th>
            <td>${row[1]}</td>
            <th>${row[2]}</th>
            <td>${row[3]}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}
