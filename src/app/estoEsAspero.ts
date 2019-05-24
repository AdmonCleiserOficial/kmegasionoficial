import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width:'100%',height:'100%' })
      , { optional: true }),
    /* 2 */ group([  // block executes in parallel

      /* style({ transform: 'translateX(100%)', 'rotate3d(0)' }), */
      /* animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' })) */
      /* style({ transform: 'translateX(0%)' }) */
      /* animate('0.5s ease-in-out', style({transform:'translateX(-100%)'})) */

      query(':enter', [
        style({ transform: 'translateX(100%)'  }),
        animate('0.5s cubic-bezier(.16,.6,.72,.12)', style({ transform: 'translateX(0%)',left:0 }))
      ], { optional: true }),

      query(':leave',
       [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s cubic-bezier(.16,.6,.72,.12)', style({transform:'translateX(-100%)'}))
      ], { optional: true }),
    ])
  ])
])