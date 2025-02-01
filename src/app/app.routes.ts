import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ProfileComponent } from './modules/common/profile/profile.component';
import { AdministrationComponent } from './modules/admin/administration/administration.component';
import { WarehousePanelComponent } from './modules/admin/warehouse-management/warehouse-panel/warehouse-panel.component';
import { IngredientsPanelComponent } from './modules/admin/warehouse-management/ingredients-panel/ingredients-panel.component';
import { DrinksPanelComponent } from './modules/admin/warehouse-management/drinks-panel/drinks-panel.component';
import { NonFoodProductsComponent } from './modules/admin/warehouse-management/non-food-products/non-food-products.component';
import { ProductDetailComponent } from './modules/admin/warehouse-management/product-detail/product-detail.component';
import { UsersPanelComponent } from './modules/admin/user-management/users-panel/users-panel.component';
import { UserDetailComponent } from './modules/admin/user-management/user-detail/user-detail.component';
import { RestaurantPanelComponent } from './modules/admin/restaurant-manager/restaurant-panel/restaurant-panel.component';
import { TablesPanelComponent } from './modules/admin/restaurant-manager/tables-panel/tables-panel.component';
import { DishesPanelComponent } from './modules/common/restaurant/dishes-panel/dishes-panel.component';
import { RestaurantReservationsPanelComponent } from './modules/common/restaurant/restaurant-reservations-panel/restaurant-reservations-panel.component';
import { TableDetailComponent } from './modules/admin/restaurant-manager/table-detail/table-detail.component';
import { DishDetailComponent } from './modules/common/restaurant/dish-detail/dish-detail.component';
import { RestaurantReservationDetailComponent } from './modules/common/restaurant/restaurant-reservation-detail/restaurant-reservation-detail.component';
import { LoginComponent } from './shared-modules/auth/components/login/login.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'profile', component: ProfileComponent
    },
    {
        path: 'admin', component: AdministrationComponent
    },
    {
        path: 'admin/users', component: UsersPanelComponent
    },
    {
        path: 'admin/users/userDetail', component: UserDetailComponent
    },
    {
        path: 'admin/warehouse', component: WarehousePanelComponent
    },
    {
        path: 'admin/warehouse/ingredients', component: IngredientsPanelComponent
    },
    {
        path: 'restaurant/drinks', component: DrinksPanelComponent
    },
    {
        path: 'admin/warehouse/nonFoodProducts', component: NonFoodProductsComponent
    },
    {
        path: 'admin/warehouse/productDetail', component: ProductDetailComponent
    },
    {
        path: 'restaurant/drinks/productDetail', component: ProductDetailComponent
    },
    {
        path: 'admin/restaurant', component: RestaurantPanelComponent
    },
    {
        path: 'admin/restaurant/tables', component: TablesPanelComponent
    },
    {
        path: 'admin/restaurant/tables/tableDetail', component: TableDetailComponent
    },
    {
        path: 'restaurant/dishes', component: DishesPanelComponent
    },
    {
        path: 'restaurant/dishes/dishDetail', component: DishDetailComponent
    },
    {
        path: 'restaurant/restaurantReservations', component: RestaurantReservationsPanelComponent
    },
    {
        path: 'restaurant/restaurantReservations/restaurantReservationDetail', component: RestaurantReservationDetailComponent
    },
];
