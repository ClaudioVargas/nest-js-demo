import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    // 1. Verificar si existe el header Authorization y si es de tipo Bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado o formato inválido');
    }

    const token = authHeader.split(' ')[1];

    try {
      // 2. Validar el token (Ejemplo simulado, aquí usarías jwt.verify)
      const usuarioDecodificado = this.validarTokenSimulado(token);

      // 3. Inyectar el usuario en la request para usarlo en los controladores
      req['user'] = usuarioDecodificado;
        console.log("usuarioDecodificado", usuarioDecodificado )
      // 4. Continuar al siguiente paso
      next();
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  private validarTokenSimulado(token: string) {
    if (token === 'MI_PALABRA_SECRETA_SUPER_SEGURA') {
      return { id: 1, email: 'usuario@correo.com', rol: 'admin' };
    }
    throw new Error();
  }
}
