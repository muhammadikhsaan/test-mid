import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { MetaResponse } from '../dto/meta.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.getResponse()['message'];

    response.status(status).json(
      new MetaResponse({
        status: 'failed',
        message: Array.isArray(message) ? message[0] : message,
      }),
    );
  }
}
