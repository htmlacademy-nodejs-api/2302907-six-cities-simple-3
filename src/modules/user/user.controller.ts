import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import CreateUserDto from './dto/create-user.dto.js';
import {UserServiceInterface} from './user-service.interface.js';
import {ConfigInterface} from '../../common/config/config.interface.js';
import HttpError from '../../common/error/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {createJWT, fillDTO} from '../../utils/common.js';
import UserResponse from './response/user.response.js';
import LoginUserDto from './dto/login-user.dto.js';
import {ValidateDtoMiddleware} from '../../common/middleware/validate-dto.middleware.js';
import {ValidateObjectIdMiddleware} from '../../common/middleware/validate-objectid.middleware.js';
import {UploadFileMiddleware} from '../../common/middleware/upload-file.middleware.js';
import {JWT_ALGORITM} from './user.constant.js';
import LoggedUserResponse from './response/logged-user.response.js';
import {PrivateRouteMiddleware} from '../../common/middleware/private-route.middleware.js';
import UploadAvatarResponse from './response/upload-avatar.response.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
  ) {
    super(logger, configService);
    this.logger.info('Register routes for UserController...');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middleware: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middleware: [new ValidateDtoMiddleware(LoginUserDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuth
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middleware: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar')
      ]
    });
  }

  public async create(
    req: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response,
  ): Promise<void> {
    const {user} = req;

    if (user) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Пользователи не могут создавать новых пользователей',
        'UserController'
      );
    }

    const {body} = req;

    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.send(res, StatusCodes.CREATED, fillDTO(UserResponse, result));
  }

  public async login(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    res: Response,
  ): Promise<void> {
    const user = await this.userService.verifyUser(body, this.configService.get('SALT'));

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email «${body.email}» is unauthorized.`,
        'UserController'
      );
    }

    const token = await createJWT(
      JWT_ALGORITM,
      this.configService.get('JWT_SECRET'),
      {email: user.email, id: user.id}
    );
    this.ok(res, {...fillDTO(LoggedUserResponse, user), token});
  }

  public async checkAuth(req: Request, res: Response): Promise<void> {
    if (!req.user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    const user = await this.userService.findByEmail(req.user.email);
    this.ok(res, fillDTO(LoggedUserResponse, user));
  }

  public async uploadAvatar(req: Request, res: Response) {
    const {userId} = req.params;

    if (!req.body.user && userId !== req.body.user.id) {
      throw new HttpError(
        StatusCodes.LOCKED,
        'Вы не можете добавлять аватар для другого пользователя',
        'OfferControllerDelete');
    }

    const uploadFile = {avatarURL: req.file?.filename};
    await this.userService.updateById(userId, uploadFile);
    this.ok(res, fillDTO(UploadAvatarResponse, uploadFile));
  }
}
