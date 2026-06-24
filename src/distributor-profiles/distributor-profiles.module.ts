import { Module } from '@nestjs/common';
import { DistributorProfilesService } from './distributor-profiles.service';
import { DistributorProfilesController } from './distributor-profiles.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [DistributorProfilesController],
  providers: [DistributorProfilesService],
  exports: [DistributorProfilesService],
})
export class DistributorProfilesModule {}
