import { initCase } from '#/services/case';

initCase(require.context('./cases', true, /\/index\.js$/));
