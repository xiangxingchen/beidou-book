import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

 // api
  router.resources('user', '/api/user', controller.user);
  router.resources('getGender', '/api/getGender', controller.novel.getGender);


  // pages
  router.get('/ui', controller.routes.ui);
  router.get('routes', '/*', app.controller.routes.index);

};
