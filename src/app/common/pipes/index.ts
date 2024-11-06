import { NgModule } from '@angular/core';

import { TimePipe } from './time.pipe';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  declarations: [TruncatePipe, TimePipe],
  exports: [TruncatePipe, TimePipe],
})
export class PipesModule {}
