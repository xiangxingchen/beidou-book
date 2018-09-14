import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

 // api
  router.resources('user', '/api/user', controller.user);

  // pages
  router.get('/ui', controller.routes.ui);
  router.get('routes', '/*', app.controller.routes.index);

};
