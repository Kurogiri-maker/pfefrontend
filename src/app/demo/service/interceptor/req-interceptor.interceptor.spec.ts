import { TestBed } from '@angular/core/testing';

import { ReqInterceptor } from './req-interceptor.interceptor';

describe('ReqInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ReqInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: ReqInterceptor = TestBed.inject(ReqInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
