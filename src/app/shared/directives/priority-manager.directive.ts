import { Directive, ElementRef, Renderer2, Input } from '@angular/core';
import { TaskDto } from 'src/app/_models/task-dto';

@Directive({
  selector: '[appPriorityManager]'
})
export class PriorityManagerDirective {
  @Input('appPriorityManager') tasks: TaskDto;
  public element: ElementRef;
  public render: Renderer2
  constructor(element: ElementRef, render: Renderer2) { 
    this.element=element;
    this.render=render;
    
  }
  ngOnInit() {
      if((this.tasks.priority=="Low") && (this.tasks.state==0)){
        this.render.setStyle(this.element.nativeElement,'background-color', '#ECFFED');
      }

     if((this.tasks.priority=="Medium") && (this.tasks.state==0)){
        
          this.render.setStyle(this.element.nativeElement,'background-color', '#FFEAD1');
        
      }
      if((this.tasks.priority=="High") && (this.tasks.state==0)){
        this.render.setStyle(this.element.nativeElement,'background-color', '#FFD1D1');
      }
      
    
  }

}