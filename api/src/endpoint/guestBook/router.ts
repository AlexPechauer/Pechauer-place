import { Router, Express } from 'express'
import * as Model from '../../model'
import { Base } from '../base'
import * as bodyParser from 'body-parser'

export class Route extends Base {

  entries: Model.Guestbook.Collection

  constructor(app: Express) {
    super(app)

    this.entries = new Model.Guestbook.Collection()
  }

  build = (): Router => {

    const router = Router()
    router.use(
      this.acceptJson(),
      bodyParser.json()
    )

    router.post('/',
      this.bodyInput(),
      this.validate(Model.Guestbook.schema),
      this.add(this.entries),
      this.renderJson({ statusCode: 201 })
    )

    router.get('/',
    )

    router.put('/',
    )

    router.delete('/:entry',
    )

    return router
  }
}