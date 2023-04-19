import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GameService } from 'src/app/services/game.service';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator'

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit{

  constructor(
    private gameService:GameService,
    ){}

    displayedColumns: string[] = ['id', 'userName', 'totalWins', 'totalGames','totalTries','successRate'];

    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit(): void {
      this.getAllProducts();
   }

   getAllProducts(){
    return this.gameService.getUserRating()
      .subscribe({
        next:(res) =>{
          this.dataSource = new MatTableDataSource(res)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        },
        error:()=>{
          alert("Something went wrong ")
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
