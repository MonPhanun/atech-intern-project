import { CUSTOM_ELEMENTS_SCHEMA, forwardRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyTest } from './page/page1/MyTest.component';
import { Mypage2 } from './page/page2/Mypage2.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import {FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule}from '@angular/forms';
import { Product } from './page/Product/Product.component';
import { Dialog } from './page/Product/Dialog/Dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { Wares } from './page/Wares/Wares.component';
import { WareDialog } from './page/Wares/WareDialog/WareDialog.component';
import { WaresDetail } from './page/Wares/WaresDetail/WaresDetail.component';
import { GuidService } from './guid.service';
import { Autorization } from './Auth.service';
import { PipeFilter } from './page/Product/filter.pipe';
import { FormDatas } from './page/Form/FormData.component';
import { MatIconModule } from '@angular/material/icon';
import { StockDialog } from './page/page2/Dialog/StockDialog.component';
import { MatSelectModule } from '@angular/material/select';
import { DetailStock } from './page/page2/Detail_dialog/Detail_dialog.component';
import { RigisterProduct } from './page/Product/Rigister_Product/Rigister_Product.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Search } from './page/Search/Search.component';
import { TranSfer } from './page/page2/TranSfer/TranSfer.component';



@NgModule({
  declarations: [
    AppComponent,
    MyTest,
    Mypage2,
    NavComponent,
    FooterComponent,
    Product,
    Dialog,
    Wares,
    WareDialog,
    WaresDetail,
    PipeFilter,
    FormDatas,
    StockDialog,
    DetailStock,
    RigisterProduct,
    Search,
    TranSfer
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule
    
  ],
  providers: [
    GuidService,
    Autorization
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
