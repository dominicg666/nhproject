import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContcatSearchPipe }  from './contcat-search.pipe';

@NgModule({
  declarations: [ContcatSearchPipe],
  imports: [
    CommonModule
  ],
  exports: [
    ContcatSearchPipe  
  ]
})
export class PipeModuleModule { }
