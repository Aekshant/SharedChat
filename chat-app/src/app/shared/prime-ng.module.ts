import { NgModule } from '@angular/core';

/* Form Inputs */
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
// import { TextareaModule } from 'primeng/textarea';

/* Buttons */
import { ButtonModule } from 'primeng/button';

/* Layout + Containers */
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToolbarModule } from 'primeng/toolbar';
// import { SidebarModule } from 'primeng/sidebar';

/* Data Display */
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ListboxModule } from 'primeng/listbox';
import { TagModule } from 'primeng/tag';

/* Panels */
import { PanelModule } from 'primeng/panel';

/* Dropdown */
// import { DropdownModule } from 'primeng/dropdown';

/* Icons */
import { RippleModule } from 'primeng/ripple';

/* Menus */
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

/* Messages */
import { ToastModule } from 'primeng/toast';
// import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
  exports: [
    /* Inputs */
    InputTextModule,
    PasswordModule,
    // TextareaModule,

    /* Buttons */
    ButtonModule,

    /* Layout */
    CardModule,
    DividerModule,
    ScrollPanelModule,
    ToolbarModule,
    // SidebarModule,

    /* Data Display */
    AvatarModule,
    BadgeModule,
    ListboxModule,
    TagModule,

    /* Panels */
    PanelModule,

    /* Selectors */
    // DropdownModule,

    /* Icons */
    RippleModule,

    /* Menus */
    MenuModule,
    MenubarModule,

    /* Messages */
    ToastModule,
    // MessagesModule,
    MessageModule
  ]
})
export class PrimeNgModule {}
