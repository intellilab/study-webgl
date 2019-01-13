import h from '@gera2ld/jsx-dom';
import './style.css';

const requireCase = require.context('./cases', true, /\/index\.js$/);
const names = requireCase.keys().map(path => path.slice(2, -9));

const container = <div id="root" />;
document.body.append(<h1>three.js</h1>, container);
window.addEventListener('hashchange', loadCase, false);
loadCase();

async function loadCase() {
  const key = window.location.hash.slice(1);
  container.innerHTML = '';
  if (key) {
    const { default: init } = await requireCase(`./${key}/index.js`);
    container.append(<div><a href="#">&larr; Back</a></div>);
    init(container);
  } else {
    container.append(
      <ul>
        {names.map(name => <li><a href={`#${name}`}>{name}</a></li>)}
      </ul>,
    );
  }
}
