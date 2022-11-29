import todo from './todo';
import user from './user';
import auth from './auth';

const routes = [...todo, ...user, ...auth];

export { routes };
