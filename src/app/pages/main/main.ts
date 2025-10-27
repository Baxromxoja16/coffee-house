import { Component, OnInit } from '@angular/core';
import { ButtonCarousel } from "../../components/button-carousel/button-carousel";
import { ButtonAppStore } from "../../components/button-app-store/button-app-store";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  imports: [ButtonCarousel, ButtonAppStore],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main implements OnInit {

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get('http://coffee-shop-be.eu-central-1.elasticbeanstalk.com/products/favorites').subscribe((data) => {
      console.log(data);
    })
  }

}
