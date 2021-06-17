import { getTestBed, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ShoppingService } from './shopping.service';

describe('ShoppingService', () => {
  let testBed: TestBed;
  let service: ShoppingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShoppingService],
    });

    testBed = getTestBed();
    service = TestBed.inject(ShoppingService);
    httpMock = testBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    service = TestBed.inject(ShoppingService);
    expect(service).toBeTruthy();
  });

  it('shoud return shopping items', () => {
    const dummyData = [
      {
        id: '358e0fa0-01d8-4996-865b-0ebdde81062e',
        name: 'Pasta',
      },
      {
        id: 'a383e796-896b-44df-9d9e-dc339d15fa56',
        name: 'Coke',
      },
    ];

    service.getShoppingItems().subscribe((items) => {
      expect(items.length).toBe(2);
      expect(items).toEqual(dummyData);
    });

    const req = httpMock.expectOne(service.SHOPPING_URL);
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should add shopping Item', () => {
    const item = {
      id: 'a383e796-896b-44df-9d9e-dc339d15fa56',
      name: 'Coke',
    };
    service.addShoppingItem(item).subscribe(res => {});
    const req = httpMock.expectOne(service.SHOPPING_URL);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(item);
  });

  it('should delete shopping Items', () => {
  const dummyId = 'a383e796-896b-44df-9d9e-dc339d15fa56';
  service.deleteShoppingItem(dummyId).subscribe(res => {});
  const req = httpMock.expectOne(`${service.SHOPPING_URL}/${dummyId}`);
  expect(req.request.method).toBe('DELETE');
  });
});
