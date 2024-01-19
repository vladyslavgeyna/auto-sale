import { Request } from 'express'

export type RequestWithBody<T> = Request<{}, {}, T>
export type RequestWithQuery<T> = Request<{}, {}, {}, T>
export type RequestWithParams<T> = Request<T>
export type RequestWithParamsAndQuery<T, K> = Request<T, {}, {}, K>
export type RequestWithParamsAndBody<T, K> = Request<T, {}, K>
