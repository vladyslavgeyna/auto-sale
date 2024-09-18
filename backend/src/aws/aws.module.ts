import { Module } from '@nestjs/common';

@Module({
  exports: [AwsModule],
})
export class AwsModule {}
