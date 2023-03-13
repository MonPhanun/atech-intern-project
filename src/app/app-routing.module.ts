import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GuidService } from './guid.service';
import { FormDatas } from './page/Form/FormData.component';
import { MyTest } from './page/page1/MyTest.component';
import { Mypage2 } from './page/page2/Mypage2.component';
import { Product } from './page/Product/Product.component';
import { Search } from './page/Search/Search.component';
import { Wares } from './page/Wares/Wares.component';
import { WaresDetail } from './page/Wares/WaresDetail/WaresDetail.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'form',
    pathMatch:'full'
  },
  {
    path:'page2',
    component:Mypage2,
    canActivate:[GuidService]
  },
  {
    path:'Search',
    component:Search,
    canActivate:[GuidService]
  },
  // {
  //   path:'contact',
  //   component:MyTest,
  //   canActivate:[GuidService]
  // },
  {
    path:'product',
    component:Product,
    canActivate:[GuidService]
  },
  {
    path:'wares',
    component:Wares,
    canActivate:[GuidService]
  },
  {
    path:'form',
    component:FormDatas,
  },
  {
    path:'wares/WaresDetail/:id',canActivateChild:[GuidService],
    component:WaresDetail
  },
  {
    path:'data',children:[
      {
        path:'product',
        component:Product
      },
      {
        path:'wares',
        component:Wares
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
