import React from '@gera2ld/jsx-dom';
import '#/common/style.css';

const requireCase = require.context('.', true, /\/cases\/[^/]+\/index\.js$/);
const contents = requireCase.keys()
.reduce((map, item) => {
  const [, groupName, key] = item.match(/^\.\/([^/]+)\/cases\/([^/]+)\/index\.js$/);
  let list = map[groupName];
  if (!list) {
    list = [];
    map[groupName] = list;
  }
  list.push(key);
  return map;
}, {});
const groupNames = Object.keys(contents).sort();
const aside = (
  <aside>
    <h1><a href="#">{document.title}</a></h1>
    {groupNames.map(groupName => (
      <section>
        <h2>{groupName}</h2>
        <ul>
          {contents[groupName].map(name => <li><a href={`#${groupName}/${name}`}>{name}</a></li>)}
        </ul>
      </section>
    ))}
  </aside>
);
const container = <main />;
document.body.append(aside, container);
window.addEventListener('hashchange', loadCase, false);
loadCase();

async function loadCase() {
  const [groupName, name] = window.location.hash.slice(1).split('/');
  container.innerHTML = '';
  if (groupName && name) {
    const { default: init } = await requireCase(`./${groupName}/cases/${name}/index.js`);
    init(container);
  } else {
    container.append(<h1>Hello, WebGL!</h1>);
  }
}
