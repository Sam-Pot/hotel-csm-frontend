import { Component } from '@angular/core';
import { ApiService } from '../../../../shared-modules/api-http/api.service';
import { ActivatedRoute } from '@angular/router';
import { TableApi } from '../../../../shared-modules/auth/api/table.api';
import { Helpers } from '../../../../shared-modules/utils/helpers';

@Component({
  selector: 'app-tables-panel',
  standalone: true,
  imports: [],
  templateUrl: './tables-panel.component.html',
  styleUrl: './tables-panel.component.less'
})
export class TablesPanelComponent {

  tables: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.apiService.get(TableApi.FIND_URL).subscribe({
      next: (data) => {
        if (data) {
          this.tables = JSON.parse(JSON.stringify(data)).data;
        } else {
          console.log("Errore durante la ricerca dei tavoli");
        }
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }

  previousPage() {
    Helpers.reloadPreviousLocation(this.route);
  }

  delete(id: string) {
    if (id) {
      this.apiService.delete(TableApi.DELETE_URL + "/" + id).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Tavolo eliminato!");
              let filteredList = this.tables.filter((i: any) => i.id != id);
              this.tables = filteredList;
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
  }
}
