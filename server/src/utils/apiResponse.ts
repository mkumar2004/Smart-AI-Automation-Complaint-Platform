import { Response } from 'express'

export const sendSuccess = (
  res: Response,
  data: object | null = null,
  message = 'Success',
  statusCode = 200
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    ...( data && { data }),
  })
}

export const sendError = (
  res: Response,
  message = 'Something went wrong',
  statusCode = 500,
  errors?: object
): void => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
  })
}