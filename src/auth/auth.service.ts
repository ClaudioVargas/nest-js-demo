import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    // Simulación de usuarios en memoria (en producción usar DB)
    private users = [
        { id: 1, email: 'claudio@mail.com', password: '$2b$10$xj6LkWAYADQiT6dW44aWb.Zv3.pbN38Hq3cIeq19E3CH4CcCD/yT2', name: 'Claudio Vargas' } // password hasheado con bcrypt
    ];

    /**
     * Valida credenciales de usuario
     */
    async validateUser(email: string, password: string): Promise<any> {
        const user = this.users.find(u => u.email === email);
        if (!user) throw new UnauthorizedException('Usuario no encontrado');

        const isPasswordValid = await this.comparePassword(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Credenciales inválidas');

        // Retorna datos sin el password
        console.log("validateUser => user", user)
        const { password: _, ...result } = user;
        return result;
    }

    /**
     * Genera JWT para el usuario autenticado
     */
    async generateJWT(user: any): Promise<{ access_token: string }> {
        const payload = { sub: user.id, email: user.email, name: user.name };
        console.log("generateJWT => payload", payload)
        return {
            access_token: await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET || 'MI_PALABRA_SECRETA_SUPER_SEGURA',
                expiresIn: '1h',
            }),
        };
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10; // número de rondas de sal, ajusta según seguridad/performance
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        console.log("***** comparePassword *****");
        console.log("password", password);
        console.log("hashedPassword", hashedPassword);
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }


}
