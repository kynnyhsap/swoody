import * as Router from 'koa-router'
import { handleField } from './generator'
import { TEST_OBJECT } from './generator/sample'

const router = new Router()

router.get('/', async ctx => {
    ctx.body = handleField(TEST_OBJECT)
})

export default router
