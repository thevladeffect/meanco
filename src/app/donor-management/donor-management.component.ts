import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DonorService } from '../donor.service';

@Component({
  selector: 'app-donor-management',
  templateUrl: './donor-management.component.html',
  styleUrls: ['./donor-management.component.css']
})
export class DonorManagementComponent implements OnInit {

  private id: Number;
  private donor: Array<any>;
  private donorString: String;

  constructor(
    private route: ActivatedRoute,
    private donorService: DonorService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.donorService.getDonorById(this.id)
      .subscribe(donor => {
        this.donor = donor.json();
        this.donorString = JSON.stringify(this.donor);
      });
  }

}
