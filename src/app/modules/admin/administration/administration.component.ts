import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationUtils } from '../../../shared-modules/utils/location.utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.less'
})
export class AdministrationComponent {
constructor(
    private route: ActivatedRoute
  ) { }

  previousPage(){
    LocationUtils.reloadPreviousLocation(this.route);
  }
}
