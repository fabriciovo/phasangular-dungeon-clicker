import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

class LocalService
{
  constructor() { }

  public saveData(key: string, value: any)
  {
    localStorage.setItem(key, value);
  }
  public getData(key: string): any
  {
    return localStorage.getItem(key)
  }
  public removeData(key: string)
  {
    localStorage.removeItem(key);
  }
  public clearData()
  {
    localStorage.clear();
  }
}

export default LocalService;