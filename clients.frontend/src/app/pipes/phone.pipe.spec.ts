import { PhonePipe } from './phone.pipe';

describe('Pipe: Phonee', () => {
  const pipe = new PhonePipe();

  it('Instancia de pipe', () => {
    let pipe = new PhonePipe();
    expect(pipe).toBeTruthy();
  });

  it('Prueba de numero 569 1234 5678', () => {
    expect(pipe.transform("56912345678")).toEqual('569 1234 5678');
  });
});
