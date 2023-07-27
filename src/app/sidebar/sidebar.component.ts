
import { Component } from '@angular/core';

interface NavItem {
  title: string;
  link: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { title: 'Home', link: '/' },
    { title: 'Dashboard', link: '/connections' },
    { title: 'Page', link: '/' },
    { title: 'Chart Analysis', link: '/charts' },
    // { title: 'Services', link: '/services' },
    // Add more navigation items as needed
  ];
}


