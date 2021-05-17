import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { LoginregisterService } from '../../views/login/services/loginregister.service';
import { ToastrService } from 'ngx-toastr';
import { EventsService } from '../../views/events/services/events.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  connected: any;
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(
    private user: LoginregisterService,
    private toastr: ToastrService,
    private eventService: EventsService,
    @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((response) => {
      this.connected = response
    }, (error) => {
      console.log(error);
    })
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout() {
    this.user.logout().subscribe((response: any) => {
      this.toastr.success('Logged out successfully', 'Logged out!')
      localStorage.removeItem('token');
      window.location.reload()
    })
  }
}
