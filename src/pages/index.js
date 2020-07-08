import React from '@gera2ld/jsx-dom';
import '#/common/style.css';

const requireCase = require.context('.', true, /\/[^/]+\/index\.js$/);
const contents = requireCase.keys()
.reduce((map, item) => {
  const [, groupName, key] = item.match(/^\.\/([^/]+)\/([^/]+)\/index\.js$/);
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
  <aside className="w-64 p-2">
    <h1 className="text-xl"><a className="font-bold text-gray-600 hover:text-gray-700" href="#">{document.title}</a></h1>
    {groupNames.map(groupName => (
      <section>
        <h2>{groupName}</h2>
        <ul>
          {contents[groupName].map(name => <li><a id={`${groupName}/${name}`} href={`#${groupName}/${name}`}>{name}</a></li>)}
        </ul>
      </section>
    ))}
  </aside>
);
const container = <main className="flex-1 p-2" />;
document.body.append(<div className="flex">{aside}{container}</div>);
window.addEventListener('hashchange', loadCase, false);
loadCase();

async function loadCase() {
  const [groupName, name] = window.location.hash.slice(1).split('/');
  container.innerHTML = '';
  if (groupName && name) {
    const { default: init } = await requireCase(`./${groupName}/${name}/index.js`);
    init(container);
  } else {
    container.append(<h1>Hello, WebGL!</h1>);
  }
}
