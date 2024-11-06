import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';

import { UiKitButtonDirective } from './button/button';
import { UiKitAnchorDirective } from './anchor/anchor';
import { UiKitFileUploaderComponent } from './file-uploader/file-uploader.component';
import { UiKitInputComponent } from './input/input';

@NgModule({
  declarations: [UiKitButtonDirective, UiKitAnchorDirective, UiKitFileUploaderComponent, UiKitInputComponent],
  imports: [CommonModule, FormsModule, MatIconModule],
  exports: [UiKitButtonDirective, UiKitAnchorDirective, UiKitFileUploaderComponent, UiKitInputComponent],
})
export class UiKitModule {}
