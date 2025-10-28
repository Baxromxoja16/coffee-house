import { Component } from '@angular/core';
import { TabButton } from "../../components/tab-button/tab-button";

@Component({
  selector: 'app-menu',
  imports: [TabButton],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  loading: boolean = false;
}
