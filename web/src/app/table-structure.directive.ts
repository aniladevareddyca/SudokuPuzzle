import { TemplateRef, Directive, Input, ViewContainerRef,  } from '@angular/core';

@Directive({
   selector: '[repeatTag]'
})
export class TableStructure {
   constructor(
       private _template: TemplateRef<any>,
       private _viewContainer: ViewContainerRef
   ) { }

   @Input('repeatTag')
   set times(times: number) {
       for (let i = 0; i < times; ++i)
           this._viewContainer.createEmbeddedView(this._template);
   }
}