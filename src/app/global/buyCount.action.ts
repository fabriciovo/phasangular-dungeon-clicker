import { createAction } from '@ngrx/store';

export const increment = createAction('[BuyCount Component] Increment');
export const decrement = createAction('[BuyCount Component] Decrement');
export const reset = createAction('[BuyCount Component] Reset');