import * as Entry from './entry'
import { Router, Express } from 'express'
import * as Model from '../../model'
import { Base } from '../base'
import * as bodyParser from 'body-parser'

export class Routes extends Base {

  app: Express

  blogs: Model.Blog.Collection

  constructor(app: Express) {
    super(app)
    this.app = app

    this.blogs = new Model.Blog.Collection()
  }

  build = (): Router[] => {
    const router = Router()
    router.use(
      this.acceptJson(),
      bodyParser.json()
    )

    router.post('',
      // this.authorize.can(),
      this.bodyInput(),
      this.validate(Model.Blog.schema),
      async (req: any, res: any, next: any) => {
        req.input.blogTypeId = Model.Blog.Type.Type[req.input.blogTypeId]
        await next()
      },
      this.add(this.blogs),
      this.renderJson({ statusCode: 201 })
    )

    router.get('/:blogId',
      this.paramsInput(),
      this.getOne(this.blogs, 'blogId'),
      this.renderJson()
    )

    router.put('/:blogId',
    )

    router.delete('/:blogId',
      this.paramsInput(),
      this.getOne(this.blogs, 'blogId'),
      this.delete(this.blogs, 'blogId'),
      this.renderJson()
    )

    return [
      ...new Entry.Routes(this.app).build(),
      router
    ]
  }
}