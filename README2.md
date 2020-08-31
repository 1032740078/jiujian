# byteGam_egg_api



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org


- Method	Path	Route Name	Controller.Action
- GET	/posts	posts	app.controllers.posts.index
- GET	/posts/new	new_post	app.controllers.posts.new
- GET	/posts/:id	post	app.controllers.posts.show
- GET	/posts/:id/edit	edit_post	app.controllers.posts.edit
- POST	/posts	posts	app.controllers.posts.create
- PUT	/posts/:id	post	app.controllers.posts.update
- DELETE	/posts/:id	post	app.controllers.posts.destroy



- 生成 api 文档
- chmod +x showdoc_api.sh
- ./showdoc_api.sh app /controller/

