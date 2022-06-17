import { Module } from '@nestjs/common';
import { JwtModule as JWTModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JWTModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwtSecretKey'),
        signOptions: { expiresIn: config.get('jwtExpiresTime') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtService, JwtStrategy],
  exports: [JwtService],
})
export class JwtModule {}
