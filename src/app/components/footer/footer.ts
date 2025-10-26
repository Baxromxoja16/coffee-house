import { Component } from '@angular/core';
import { ButtonSocial } from "../button-social/button-social";
import { ContactLink } from "../contact-link/contact-link";

@Component({
  selector: 'app-footer',
  imports: [ButtonSocial, ContactLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

}
