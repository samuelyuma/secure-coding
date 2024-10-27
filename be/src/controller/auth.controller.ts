import { type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomResponse, CustomError } from '../middleware';
import { type LoginRequest, type RegisterRequest } from '../model';
import { AuthService } from '../service';
import { tokenDecode } from '../utils/jwt.utils';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthController = {
  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const token = await AuthService.login(request.body as LoginRequest);
      const result = new CustomResponse(StatusCodes.OK, 'login success', token);

      return response.status(result.code).json(result.toJSON());
    } catch (error: any) {
      return next(error);
    }
  },

  async register(request: Request, response: Response, next: NextFunction) {
    try {
      const account = await AuthService.register(
        request.body as RegisterRequest,
      );

      if (!account) {
        throw new CustomError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          'failed to create account',
        );
      }

      const result = new CustomResponse(
        StatusCodes.CREATED,
        'register success',
        {},
      );

      return response.status(result.code).json(result.toJSON());
    } catch (error: any) {
      return next(error);
    }
  },

  async me(request: Request, response: Response, next: NextFunction) {
    try {
      const token = request.headers['authorization']?.replace('Bearer ', '');

      if (!token)
        throw new CustomError(StatusCodes.UNAUTHORIZED, 'token required');
      const tokenDecoded = tokenDecode(token);
      const user = await AuthService.getMe(tokenDecoded.user_id);

      const result = new CustomResponse(StatusCodes.OK, 'get me', user);

      return response.status(result.code).json(result.toJSON());
    } catch (error: any) {
      return next(error);
    }
  },
};
