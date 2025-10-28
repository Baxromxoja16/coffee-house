import { Component } from '@angular/core';
import { TabButton } from "../../components/tab-button/tab-button";
import { MenuCard } from "../../components/menu-card/menu-card";

@Component({
  selector: 'app-menu',
  imports: [TabButton, MenuCard],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  loading: boolean = false;
}
