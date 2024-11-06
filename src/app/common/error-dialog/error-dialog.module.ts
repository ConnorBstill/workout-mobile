import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { ErrorDialog } from './error.dialog';

@NgModule({
  declarations: [ErrorDialog],
  imports: [MatDialogModule, MatButtonModule],
  entryComponents: [ErrorDialog],
})
export class ErrorDialogModule {}
