import { plainToInstance } from 'class-transformer'
import { ValidationError, type ValidatorOptions, validate } from 'class-validator'
import type { Request, RequestHandler } from 'express'
import { StatusCode } from '@utils'

export const validateRequest = <T = any>(
  type: any,
  value: 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req: Request, res, next) => {
    const dtoObj = plainToInstance<T, any>(type, req[value])

    validate(
      dtoObj as unknown as object,
      {
        skipMissingProperties,
        whitelist,
        forbidNonWhitelisted,
      } as ValidatorOptions,
    ).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const dtoErrors = errors.reduce(
          (response: Record<string, any>, { property, constraints }: ValidationError) => {
            response[property] = Object.values(constraints as { [type: string]: string })
            return response
          },
          {},
        )

        return res
          .status(StatusCode.UNPROCESSABLE)
          .json({ errors: dtoErrors, success: false, message: 'Invalid data provided' })
      } else {
        req[value] = dtoObj
        next()
      }
    })
  }
}
