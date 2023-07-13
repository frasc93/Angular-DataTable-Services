import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  tableData = [
    { id: 1, firstName: 'Mark', lastName: 'Otto' },
    { id: 2, firstName: 'Jessica', lastName: 'Thornton' },
    { id: 3, firstName: 'Larry', lastName: 'Black' },
    { id: 4, firstName: 'John', lastName: 'Smith' },
    { id: 5, firstName: 'Mary', lastName: 'White' }
    
  ];
  
    // eliminare una riga per id 
    deleteData(personId: number) {
      
      //uso funzione confirm di javascript per confermare l'eliminazione
      const confirmed = confirm('Are you sure you want to delete this person?')
      if (confirmed){
      const index = this.tableData.findIndex(item => item.id === personId)
      if (index !== -1) this.tableData.splice(index, 1);
    }
  }

  // modifica
  isModalVisible: boolean = false; 
  editingItem: any = {}; //oggetto vuoto per memorizzare il dato modificato
  
  editForm!: FormGroup; //creo un oggetto di tipo FormGroup
  constructor(private formBuilder: FormBuilder) {} //inizializzo il formBuilder
 
  //metodo group del formBuilder che accetta un oggetto che definisce i controlli del form e i validators
  ngOnInit() {
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  // metodo per aprire la modal al click 
  openModal(item: any) {
    this.editingItem = { ...item };
    //il metodo patchValue ccetta un oggetto e consente di assegnare i valori dell'elemento selezionato nel formGroup
    this.editForm.patchValue({
      firstName: item.firstName,
      lastName: item.lastName
    });
    this.isModalVisible = true; // mostra la modal
  }

  //funzione per salvare al click
  saveChanges() {
    if (this.editForm.valid) {
      const editedItem = { ...this.editingItem, ...this.editForm.value }; //crea un nuovo oggetto e aggiorna le proprietà dell'elemento originale con le modifiche del form
      const index = this.tableData.findIndex(item => item.id === editedItem.id); //cerco l'elemento in base all'ID
      if (index !== -1) {
        this.tableData.splice(index, 1, editedItem); //rimuove l'elemento originale e mette quello modificato nella stessa posizione
        this.isModalVisible = false;
      }
    }
  }   

  //creo una variabile per aggiungere nuova riga
  newRow: any = {};

  //aggiungo una nuova riga se compilo tutti i campi
  addRow() {
    if (this.newRow.firstName && this.newRow.lastName){
      this.tableData.push(this.newRow);
      this.newRow = {}; //resetta i campi di input

    } else {
      confirm("Please, fill out all the fields")
    }
  }
  
}
