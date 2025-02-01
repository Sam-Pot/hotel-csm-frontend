import { Component } from '@angular/core';
import { TableDto } from '../../../../shared-modules/dtos/restaurant-manager/table.dto';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../shared-modules/api-http/api.service';
import { ActivatedRoute } from '@angular/router';
import { TableApi } from '../../../../shared-modules/auth/api/table.api';
import { Helpers } from '../../../../shared-modules/utils/helpers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-detail',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './table-detail.component.html',
  styleUrl: './table-detail.component.less'
})
export class TableDetailComponent {

  table: TableDto = {};
  id: string | null = null;

  tableForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    numberOfSeats: new FormControl<number>(0, [Validators.min(0), Validators.required]),
    isAvailable: new FormControl<boolean>(false, [Validators.required]),
  });

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get("tableId");
    if (this.id) {
      this.apiService.get(TableApi.FIND_ONE_URL + "/" + this.id).subscribe({
        next: (data) => {
          if (data) {
            this.table = data as TableDto;
          } else {
            console.log("Errore durante il caricamento");
          }
        },
        error: (error) => {
          alert("Errore durante il caricamento");
          console.log(error.message);
        }
      });
    }
  }

  discard() {
    Helpers.reloadPreviousLocation(this.route);
  }

  delete() {
    if (this.id) {
      this.apiService.delete(TableApi.DELETE_URL + "/" + this.id).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Tavolo eliminato!");
            } else {
              console.log("SOMETHING WENT WRONG DURING THE DELETE!");
            }
          },
          error: (error) => {
            console.log(error.message);
          }
        }
      );
    }
    this.discard();
  }

  update(tableForm: any) {
    if (tableForm) {
      let updateTableDto: TableDto = {
        name: tableForm.value.name ? tableForm.value.name : this.table.name,
        numberOfSeats: tableForm.value.numberOfSeats ? tableForm.value.numberOfSeats : this.table.numberOfSeats,
        isAvailable: tableForm.value.isAvailable ? tableForm.value.isAvailable : false,
      };
      this.apiService.put(TableApi.UPDATE_URL + "/" + (this.id ? this.id : ''), updateTableDto).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Tavolo Salvato!");
              this.discard();
            } else {
              console.log("SOMETHING WENT WRONG DURING THE UPDATE!");
            }
          },
          error: (error) => {
            console.log(error.message);
          }
        }
      );
    }
  }

  save(tableForm: any) {
    if (tableForm) {
      let updateTableDto: TableDto = {
        name: tableForm.value.name ? tableForm.value.name : this.table.name,
        numberOfSeats: tableForm.value.numberOfSeats ? tableForm.value.numberOfSeats : this.table.numberOfSeats,
        isAvailable: tableForm.value.isAvailable ? tableForm.value.isAvailable : false,
      };
      this.apiService.post(TableApi.SAVE_URL, updateTableDto).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Tavolo Salvato!");
              this.discard();
            } else {
              console.log("SOMETHING WENT WRONG DURING THE UPDATE!");
            }
          },
          error: (error) => {
            alert("Impossibile salvare!");
            console.log(error.message);
          }
        }
      );
    }
  }
}
