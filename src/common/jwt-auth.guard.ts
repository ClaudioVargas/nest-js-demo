// jwt-auth.guard.ts
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'https';

@Injectable()
// Extendemos de AuthGuard y le pasamos el nombre de la estrategia ('jwt')
export class JwtAuthGuard extends AuthGuard('jwt') {
  
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // Si hay un error o el usuario no existe (token inválido/expirado), lanzamos la excepción
    console.log("user", user)
    console.log("info", info)
    const request = context.switchToHttp().getRequest();
    console.log("Cabecera Authorization exacta:", request.headers['authorization'])
    if (err || !user) {
      throw err || new UnauthorizedException('No estás autorizado para acceder a este recurso');
    }
    
    // Si todo está bien, Passport inyecta automáticamente este objeto en req.user
    return user;
  }
}
