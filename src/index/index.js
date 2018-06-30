import h from '@gera2ld/jsx-dom';
import './style.css';

const requireCase = require.context('./cases', false, /\.js$/);
const names = requireCase.keys().map(path => path.slice(2));

const container = <div id="root"></div>;
document.body.append(container);
window.addEventListener('hashchange', loadCase, false);
loadCase();

async function loadCase() {
  const key = window.location.hash.slice(1);
  if (key) {
    const { default: init } = await requireCase(`./${key}`);
    container.innerHTML = '';
    container.append(<div><a href="#">&larr; Back</a></div>);
    init(container);
  } else {
    container.innerHTML = '';
    container.append(<ul>
      {names.map(name => <li><a href={`#${name}`}>{name}</a></li>)}
    </ul>);
  }
}
