import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; //gestisce le risposte asincrone 
import { DataProducts, Info } from 'src/modules/DataProducts';

const url = `https://dummyjson.com/products`;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  //restituisce i dati in un oggetto Observable<DataProducts>
  getData = (): Observable<DataProducts> => {
  //richiesta http get all'URL 
  return this.http.get<DataProducts>(url)
    
  
}

//modifica dati
putData = (updatedData: Info): Observable<Info> => {
  const id = updatedData.id;
  const body = updatedData;
  body.id = undefined;
  const url = `https://dummyjson.com/products/${id}`;

  return this.http.put<Info>(url, body)

}

//elimina dati
deleteData = (id: number): Observable<Info> => {
  return this.http.delete<Info>(`https://dummyjson.com/products/${id}`)

}

//aggiungi dati
addData = (product: {}): Observable<Info> => {
  return this.http.post<Info>('https://dummyjson.com/products/add', product)
}

// get prodotto singolo
getSingleProduct = (id: number): Observable<Info> => {
  return this.http.get<Info>(`https://dummyjson.com/products/${id}`)
}
}