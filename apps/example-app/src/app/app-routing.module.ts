import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { DesignStudioComponent } from './design-studio/design-studio.component';
import { HomePageComponent } from './home/home.page';
import { ShopPageComponent } from './shop/shop.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomePageComponent,
    },
    {
        path: 'shop',
        component: ShopPageComponent,
    },
    {
        path: 'design-studio',
        component: DesignStudioComponent,
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
