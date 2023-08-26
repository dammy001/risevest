import type { Response } from 'express'
import { type ClassConstructor, plainToInstance } from 'class-transformer'
import { StatusCode } from '@/utils'

export type IResponse<T = any> = {
  data: T
  message: string
  statusCode?: keyof typeof StatusCode
}

export abstract class Controller {
  static success<T = any>(res: Response, data: T, message: string = 'Successful') {
    return res.status(StatusCode.OK).json({ success: true, data, message })
  }

  static error<T extends object = any>(
    res: Response,
    message: string,
    data?: T,
    statusCode: StatusCode = StatusCode.BAD_REQUEST,
  ) {
    return res.status(statusCode).json({ success: false, ...(data && { data }), message })
  }

  static mapEntity<TData>(
    entity: ClassConstructor<any>,
    data: TData,
  ): TData extends null ? null : any {
    return plainToInstance(entity, JSON.parse(JSON.stringify(data))) as any
  }
}
