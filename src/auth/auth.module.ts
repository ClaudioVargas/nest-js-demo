import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/jwt.strategy';

@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'MI_PALABRA_SECRETA_SUPER_SEGURA',
      signOptions: { expiresIn: '1h' }, // Configuración para cuando creas tokens
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService, 
    JwtStrategy
  ],
  exports: [
    PassportModule,
    JwtModule
  ]
})
export class AuthModule {}
