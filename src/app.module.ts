import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from './database/knex.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { FarmerProfilesModule } from './farmer-profiles/farmer-profiles.module';
import { DistributorProfilesModule } from './distributor-profiles/distributor-profiles.module';

@Module({
  imports: [
    KnexModule,
    RolesModule,
    UsersModule,
    FarmerProfilesModule,
    DistributorProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
