import { Module } from '@nestjs/common';
import { FarmerProfilesService } from './farmer-profiles.service';
import { FarmerProfilesController } from './farmer-profiles.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [FarmerProfilesController],
  providers: [FarmerProfilesService],
  exports: [FarmerProfilesService],
})
export class FarmerProfilesModule {}
