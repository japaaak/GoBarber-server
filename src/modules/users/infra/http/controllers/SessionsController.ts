// src\modules\users\infra\http\controllers\SessionsController.ts
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUSer = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUSer.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
