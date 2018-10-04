import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

 // api
  router.resources('user', '/api/user', controller.user);
  router.get('getGender', '/api/getGender', controller.novel.getGender);
  router.get('getRanking', '/api/getRanking/:id', controller.novel.getRanking);
  router.get('getBookById', '/api/getBookById/:id', controller.novel.getBookById);
  router.get('getBookReview', '/api/getBookReview', controller.novel.getBookReview);
  // pages
  router.get('/ui', controller.routes.ui);
  router.get('/ranking/:id', controller.novel.ranking);
  router.get('/book/:id', controller.novel.book);
  router.get('routes', '/*', app.controller.routes.index);

};
