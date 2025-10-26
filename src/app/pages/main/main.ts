import { Component } from '@angular/core';
import { ButtonCarousel } from "../../components/button-carousel/button-carousel";
import { ButtonAppStore } from "../../components/button-app-store/button-app-store";

@Component({
  selector: 'app-main',
  imports: [ButtonCarousel, ButtonAppStore],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
