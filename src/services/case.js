import React from '@gera2ld/jsx-dom';
import '#/common/style.css';

export function initCase(requireCase) {
  const names = requireCase.keys().map(path => path.slice(2, -9));
  const aside = (
    <aside>
      <h1>{document.title}</h1>
      <ul>
        {names.map(name => <li><a href={`#${name}`}>{name}</a></li>)}
      </ul>
    </aside>
  );
  const container = <main>hello, world</main>;
  document.body.append(aside, container);
  window.addEventListener('hashchange', loadCase, false);
  loadCase();

  async function loadCase() {
    const key = window.location.hash.slice(1);
    if (key) {
      const { default: init } = await requireCase(`./${key}/index.js`);
      container.innerHTML = '';
      init(container);
    }
  }
}
