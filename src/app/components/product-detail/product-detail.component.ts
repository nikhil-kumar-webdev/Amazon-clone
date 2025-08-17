import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

import { ListService } from '../../services/list.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product: any = {};
    productId: string | null = null;
  constructor(private api: DataService, private route :ActivatedRoute) {}

  
    // this.getProductList();
      ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.getProductDetails(this.productId);
    
  }
  }
  getProductDetails(id:string) {
    this.api.getProductDetail(id).subscribe((res) => {
      this.product = res;
      console.log(this.product);
    });
  }
}
