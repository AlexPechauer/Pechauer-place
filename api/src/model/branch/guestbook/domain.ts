import * as Joi from 'joi'

export interface Value {
  id: string
  branchId: string
  createdBy: string
  createdAt: Date
  updatedBy: string
  updatedAt: Date
}

export const schema = Joi.object<Value>({
  id: Joi.string().max(33),
  branchId: Joi.string().max(33).required(),
  createdBy: Joi.string(),
  createdAt: Joi.date(),
  updatedBy: Joi.string(),
  updatedAt: Joi.date()
})
