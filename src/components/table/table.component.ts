import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataProducts, Info } from 'src/modules/DataProducts';
import { DataService } from 'src/service/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {


  tableProducts: Info[] = [] //array vuoto per api
  

  constructor (private dataService: DataService, private formBuilder: FormBuilder ) {}
    
    ngOnInit() {
      this.editForm = this.formBuilder.group({ //metodo group del formBuilder che accetta un oggetto che definisce i controlli del form e i validators
        title: ['', Validators.required],
        brand: ['', Validators.required],
        price: [null, [Validators.required, Validators.pattern(/^[1-9]\d*(,\d+)?$/)]],

      });

      this.addForm = this.formBuilder.group({ // formgroup per l'aggiunta service
        title: ['', Validators.required],
        brand: ['', Validators.required],
        price: [null, [Validators.required, Validators.pattern(/^[1-9]\d*(,\d+)?$/)]],
        description: [null],
        discountPercentage: [null],
        rating: [null],
        stock: [null],
        category: [null],
        thumbnail:[null],
        images:[null]

      });
  
      this.fetchData() 
    }
 
    // get dati api
  fetchData() {
    this.dataService.getData().subscribe({
      next: (data: DataProducts) => {
        this.tableProducts = data.products
      },
      error: (err) => { 
        console.log(err);
    }
  })
  }

//elimina con service
deleteItem(productId: Info): void {
  productId.id && this.dataService.deleteData(productId.id).subscribe({
    next: () => {
      const index = this.tableProducts.findIndex(item => item.id === productId.id)
      if (index !== -1) this.tableProducts.splice(index, 1);
      
      console.log("Deleted Product:", productId);
    },
    error: (err) => {
      console.log(err);
    }

  });
}
 
  // modifica 
  editingItem: any = {}; //oggetto vuoto per memorizzare il dato modificato

  //Reactive Form
  editForm!: FormGroup; //creo un oggetto di tipo FormGroup
 
  // metodo per aprire la modal al click 
  openModal(item: Info) {
    this.editingItem = { ...item };
    //il metodo patchValue accetta un oggetto e consente di assegnare i valori dell'elemento selezionato nel formGroup
    this.editForm.patchValue({
      title: item.title,
      brand: item.brand,
      price: item.price,

    });
  }   

  //modifica con service
  updateItem(): void {
    this.dataService.putData({...this.editForm.value, id: this.editingItem.id}).subscribe({
      next: (data: Info) => {
        if (this.editForm.valid) {
          const editedItem = { ...this.editingItem, ...this.editForm.value }; //crea un nuovo oggetto e aggiorna le proprietà dell'elemento originale con le modifiche del form
          const index = this.tableProducts.findIndex(item => item.id === editedItem.id); //cerco l'elemento in base all'ID
          
          if (index !== -1) {
            this.tableProducts.splice(index, 1, editedItem); //rimuove l'elemento originale e mette quello modificato nella stessa posizione 
            
          }
        }    
        this.editingItem = {
          title: data.title,
          description: data.description,
          price: data.price,
          discountPercentage: data.discountPercentage,
          rating: data.rating,
          stock: data.stock,
          brand: data.brand,
          category: data.category,
          thumbnail: data.thumbnail,
          images: data.images
        }

        console.log("Updated Product:", this.editingItem)
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

  //aggiunta con service
  addForm!: FormGroup;

  addProduct(): void {  
    const newProduct: Info = this.addForm.value;
    //aggiungo il prodotto con il service
    this.dataService.addData(newProduct).subscribe({
      next: (data: Info) => {
        this.tableProducts.push(data);  //aggiungo il nuovo prodotto nella table
  
        // resetta il form
        this.addForm.reset();
        console.log("Added Product:", data)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  }


