// jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. Extrae el token del header 'Authorization: Bearer <TOKEN>'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 2. No ignores la expiración del token
      ignoreExpiration: false,
      // 3. Tu clave secreta real (reemplázala por tu variable de entorno en producción)
      secretOrKey: 'MI_PALABRA_SECRETA_SUPER_SEGURA', 
    });
  }

  // Este método se ejecuta automáticamente si la firma del JWT es válida
  async validate(payload: any) {
    // El payload contiene los datos que guardaste al firmar el token (ej: id, email, rol)
    // Lo que retornes aquí se guardará exactamente en req.user
    console.log("payload", payload)
    return { 
      id: payload.sub, 
      email: payload.email, 
      rol: payload.rol 
    };
  }
}
