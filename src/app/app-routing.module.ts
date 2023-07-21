import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from 'src/components/table/table.component';
import { DetailsComponent } from 'src/components/details/details.component';

const routes: Routes = [
  { path: '', component: TableComponent},
  { path: 'details/:id', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
